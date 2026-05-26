import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Conversation from "@/models/Conversation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneNumber = searchParams.get("phoneNumber");

    await connectDB();

    if (phoneNumber) {
      const conversations = await Conversation.find({ phoneNumber })
        .sort({ updatedAt: -1 })
        .limit(20);
      return NextResponse.json(conversations);
    }

    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 })
      .limit(50);
    return NextResponse.json(conversations);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, messages, title } = body;

    if (!phoneNumber || !messages) {
      return NextResponse.json(
        { error: "phoneNumber and messages are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const conversation = await Conversation.create({
      phoneNumber,
      messages,
      title: title || `Conversation with ${phoneNumber}`,
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 }
    );
  }
}
