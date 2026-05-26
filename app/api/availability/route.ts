import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Availability from "@/models/Availability";
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

      const [availability, bookings] = await Promise.all([
        Availability.findOne({
          date: { $gte: start, $lte: end },
        }),
        Booking.countDocuments({
          tanggal: { $gte: start, $lte: end },
          status: { $ne: "cancelled" },
        }),
      ]);

      return NextResponse.json({
        date,
        isAvailable: bookings === 0 && (!availability || availability.isAvailable),
        currentBookings: bookings,
        maxBookings: availability?.maxBookings || 1,
      });
    }

    const allAvailability = await Availability.find().sort({ date: 1 });
    return NextResponse.json(allAvailability);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
