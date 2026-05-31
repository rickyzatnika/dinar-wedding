import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FollowUp from "@/models/FollowUp";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const jid = searchParams.get("jid");

    await connectDB();

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (jid) filter.jid = jid;

    const followUps = await FollowUp.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(followUps);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch follow-ups" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jid, pushName, eventType, scheduledAt } = body;

    if (!jid || !eventType || !scheduledAt) {
      return NextResponse.json(
        { error: "jid, eventType, and scheduledAt are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const followUp = await FollowUp.create({
      jid,
      pushName: pushName || "",
      eventType,
      scheduledAt: new Date(scheduledAt),
      status: "pending",
    });

    return NextResponse.json(followUp, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create follow-up" },
      { status: 500 }
    );
  }
}
