import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FollowUp from "@/models/FollowUp";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const updateData: Record<string, unknown> = {};
    if (body.status) updateData.status = body.status;
    if (body.sentAt) updateData.sentAt = new Date(body.sentAt);
    if (body.respondedAt) updateData.respondedAt = new Date(body.respondedAt);

    const followUp = await FollowUp.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!followUp) {
      return NextResponse.json(
        { error: "Follow-up not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(followUp);
  } catch {
    return NextResponse.json(
      { error: "Failed to update follow-up" },
      { status: 500 }
    );
  }
}
