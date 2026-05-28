import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ChatHistory from "@/models/ChatHistory";

export async function POST() {
  try {
    await connectDB();
    const result = await ChatHistory.deleteMany({});
    return NextResponse.json({
      message: "All chat history deleted",
      deletedCount: result.deletedCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to clear chat history" },
      { status: 500 }
    );
  }
}
