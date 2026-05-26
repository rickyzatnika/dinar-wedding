import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.features !== undefined) updateData.features = body.features;
    if (body.isPopular !== undefined) updateData.isPopular = body.isPopular;

    const pkg = await Package.findByIdAndUpdate(id, updateData, { new: true });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch {
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}
