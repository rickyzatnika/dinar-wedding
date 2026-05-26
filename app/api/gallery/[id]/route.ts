import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const updateData: Record<string, unknown> = {};
    if (body.src !== undefined) updateData.src = body.src;
    if (body.alt !== undefined) updateData.alt = body.alt;
    if (body.category !== undefined) updateData.category = body.category;

    const item = await Gallery.findByIdAndUpdate(id, updateData, { new: true });

    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}
