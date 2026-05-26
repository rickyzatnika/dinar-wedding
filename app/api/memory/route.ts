import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Memory from "@/models/Memory";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "phoneNumber is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const memories = await Memory.find({ phoneNumber });
    const memoryMap: Record<string, string> = {};

    for (const m of memories) {
      memoryMap[m.key] = m.value;
    }

    return NextResponse.json(memoryMap);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch memory" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, key, value } = body;

    if (!phoneNumber || !key || !value) {
      return NextResponse.json(
        { error: "phoneNumber, key, and value are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const memory = await Memory.findOneAndUpdate(
      { phoneNumber, key },
      { value, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json(memory, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save memory" },
      { status: 500 }
    );
  }
}
