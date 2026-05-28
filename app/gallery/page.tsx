import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Galeri | Dinar Wedding",
  description: "Lihat hasil riasan & dekorasi pengantin terbaik dari Dinar Wedding.",
};

export default function GalleryPage() {
  return (
    <main className="pt-24">
      <div className="py-16 bg-gradient-to-br from-[#F3E7DD] to-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C97B7B] font-semibold text-sm tracking-widest uppercase">
            Galeri
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B2A24] mt-4">
            Galeri Kami
          </h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Kumpulan karya riasan & dekorasi pengantin terbaik dari tim Dinar Wedding.
          </p>
        </div>
      </div>
      <Gallery />
      <CTA />
    </main>
  );
}
