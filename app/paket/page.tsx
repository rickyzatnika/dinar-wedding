import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Paket | Dinar Wedding",
  description: "Pilih paket rias pengantin sesuai kebutuhan Anda.",
};

export default function PaketPage() {
  return (
    <main className="pt-24">
      <div className="py-16 bg-gradient-to-br from-[#F3E7DD] to-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C97B7B] font-semibold text-sm tracking-widest uppercase">
            Paket
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A24] mt-4">
            Paket Layanan
          </h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Pilih paket rias yang sesuai dengan kebutuhan dan budget Anda.
          </p>
        </div>
      </div>
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
