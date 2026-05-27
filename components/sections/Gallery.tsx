"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [selected, setSelected] = useState<string | null>(null);

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <FadeUp key={img.id} delay={i * 0.08}>
              <button
                onClick={() => setSelected(img.src)}
                className="aspect-[4/5] relative rounded-xl overflow-hidden group w-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            </FadeUp>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            aria-label="Tutup"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl aspect-[3/4]">
            <Image
              src={selected}
              alt="Preview"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
