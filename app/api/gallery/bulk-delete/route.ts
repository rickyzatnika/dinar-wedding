import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "ids array required" }, { status: 400 });
    }

    await connectDB();
    await Gallery.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ message: `Deleted ${ids.length} items` });
  } catch {
    return NextResponse.json(
      { error: "Failed to bulk delete" },
      { status: 500 }
    );
  }
}
