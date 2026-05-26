import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";

export async function GET() {
  try {
    await connectDB();
    const packages = await Package.find({ isActive: true }).sort({ price: 1 });
    return NextResponse.json(packages);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const pkg = await Package.create({
      id: body.id || `pkg-${Date.now()}`,
      name: body.name,
      price: body.price,
      description: body.description || "",
      features: body.features || body.description?.split("\n").filter(Boolean) || [],
      isPopular: body.isPopular || false,
      isActive: true,
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await connectDB();

    await Package.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
}
