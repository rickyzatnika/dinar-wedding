import type { Metadata } from "next";
import { waUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Booking | Dinar Wedding",
  description: "Booking jasa makeup & dekorasi pengantin Dinar Wedding.",
};

export default function BookingPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-[#F3E7DD] to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-[#C97B7B] font-semibold text-sm tracking-widest uppercase">
            Booking
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A24] mt-4">
            Booking Sekarang
          </h1>
          <p className="text-gray-600 mt-4">
 Isi form di bawah untuk booking, atau hubungi kami langsung via WhatsApp.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form
            action={waUrl()}
            method="GET"
            target="_blank"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-[#3B2A24] mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C97B7B] focus:ring-2 focus:ring-[#C97B7B]/20 outline-none transition-all"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3B2A24] mb-2">
                Tanggal Pernikahan
              </label>
              <input
                type="date"
                name="tanggal"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C97B7B] focus:ring-2 focus:ring-[#C97B7B]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3B2A24] mb-2">
                Paket
              </label>
              <select
                name="paket"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C97B7B] focus:ring-2 focus:ring-[#C97B7B]/20 outline-none transition-all bg-white"
              >
                <option value="">Pilih paket</option>
                <option value="Basic">Basic - Rp 2.500.000</option>
                <option value="Premium">Premium - Rp 5.000.000</option>
                <option value="Exclusive">Exclusive - Rp 10.000.000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3B2A24] mb-2">
                Pesan Tambahan
              </label>
              <textarea
                name="pesan"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C97B7B] focus:ring-2 focus:ring-[#C97B7B]/20 outline-none transition-all resize-none"
                placeholder="Ceritakan kebutuhan Anda..."
              />
            </div>
            <Button type="submit" className="w-full">
              Kirim via WhatsApp
            </Button>
          </form>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          Atau hubungi langsung:{" "}
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C97B7B] font-semibold hover:underline"
          >
            {siteConfig.whatsappNumber}
          </a>
        </div>
      </div>
    </main>
  );
}
