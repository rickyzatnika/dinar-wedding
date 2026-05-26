import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await _request.json();
    const { status, nama, alamat, tanggal, waktu, paket, pesan } = body;

    await connectDB();

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (nama !== undefined) updateData.nama = nama;
    if (alamat !== undefined) updateData.alamat = alamat;
    if (tanggal !== undefined) updateData.tanggal = new Date(tanggal);
    if (waktu !== undefined) updateData.waktu = waktu;
    if (paket !== undefined) updateData.paket = paket;
    if (pesan !== undefined) updateData.pesan = pesan;
    updateData.updatedAt = new Date();

    const booking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Booking deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
