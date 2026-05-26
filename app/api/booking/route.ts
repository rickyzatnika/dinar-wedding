import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    await connectDB();

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const bookings = await Booking.find({
        tanggal: { $gte: start, $lte: end },
      }).sort({ createdAt: -1 });

      return NextResponse.json(bookings);
    }

    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, phone, alamat, tanggal, waktu, paket, pesan } = body;

    if (!nama || !phone || !tanggal || !paket) {
      return NextResponse.json(
        { error: "nama, phone, tanggal, and paket are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.create({
      nama,
      phone,
      alamat: alamat || "",
      tanggal: new Date(tanggal),
      waktu: waktu || "",
      paket,
      pesan: pesan || "",
    });

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
