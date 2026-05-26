import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ChatHistory from "@/models/ChatHistory";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "phoneNumber is required" },
        { status: 400 }
      );
    }

    await connectDB();

    await ChatHistory.findOneAndUpdate(
      { phoneNumber },
      {
        $set: {
          messages: [],
          memorySummary: "",
          importantFacts: [],
        },
      }
    );

    return NextResponse.json({ message: "Chat history reset" });
  } catch {
    return NextResponse.json(
      { error: "Failed to reset chat history" },
      { status: 500 }
    );
  }
}
