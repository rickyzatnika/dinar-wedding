import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, tanggal, paket, pesan } = body;

    const text = `Halo ${siteConfig.name}, saya ${nama} ingin booking.%0A%0ATanggal pernikahan: ${tanggal}%0APaket: ${paket}%0APesan: ${pesan || "-"}`;

    const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;

    return NextResponse.json({ url: waUrl });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 400 }
    );
  }
}
