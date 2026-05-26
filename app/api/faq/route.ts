import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FAQ from "@/models/FAQ";

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const faq = await FAQ.create({
      question: body.question,
      answer: body.answer,
      order: body.order || 0,
      isActive: true,
    });

    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await connectDB();

    await FAQ.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
