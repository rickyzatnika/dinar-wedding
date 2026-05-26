import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ChatHistory from "@/models/ChatHistory";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneNumber = searchParams.get("phoneNumber");

    await connectDB();

    if (phoneNumber) {
      let chat = await ChatHistory.findOne({ phoneNumber });

      if (!chat) {
        chat = await ChatHistory.create({ phoneNumber, messages: [] });
      }

      return NextResponse.json(chat);
    }

    const chats = await ChatHistory.find().sort({ lastMessageAt: -1 }).limit(50);
    return NextResponse.json(chats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch chat history" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, role, content } = body;

    if (!phoneNumber || !role || !content) {
      return NextResponse.json(
        { error: "phoneNumber, role, and content are required" },
        { status: 400 }
      );
    }

    await connectDB();

    let chat = await ChatHistory.findOne({ phoneNumber });

    if (!chat) {
      chat = new ChatHistory({ phoneNumber, messages: [] });
    }

    await chat.addMessage(role, content);

    return NextResponse.json(chat, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, memorySummary, importantFacts } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "phoneNumber is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const update: Record<string, unknown> = { updatedAt: new Date() };

    if (memorySummary !== undefined) {
      update.memorySummary = memorySummary;
    }

    if (importantFacts !== undefined) {
      update.importantFacts = importantFacts;
    }

    const chat = await ChatHistory.findOneAndUpdate(
      { phoneNumber },
      { $set: update },
      { new: true, upsert: true }
    );

    return NextResponse.json(chat);
  } catch {
    return NextResponse.json(
      { error: "Failed to update chat history" },
      { status: 500 }
    );
  }
}
