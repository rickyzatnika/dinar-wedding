"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { galleryImages } from "@/lib/data";
import { FadeUp } from "@/components/animation/FadeUp";

const categories = [
  { value: "all", label: "Semua" },
  { value: "bridal", label: "Bridal" },
  { value: "sanggul", label: "Sanggul" },
  { value: "dekorasi", label: "Dekorasi" },
];

export function Gallery() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  return (
    <section id="galeri" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Galeri"
          title="Karya Terbaik Kami"
          subtitle="Lihat hasil riasan pengantin yang telah kami kerjakan."
        />
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                active === cat.value
                  ? "bg-[#C97B7B] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((img, i) => (
            <FadeUp key={img.id} delay={i * 0.08}>
              <div className="aspect-[4/5] bg-[#F3E7DD] rounded-xl overflow-hidden group cursor-pointer">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C97B7B]/20 to-[#D8B07A]/20 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-[#C97B7B]/40 text-sm font-medium px-4 text-center">
                    {img.alt}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
