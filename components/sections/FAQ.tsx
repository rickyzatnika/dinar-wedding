"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faqItems } from "@/lib/data";
import { FadeUp } from "@/components/animation/FadeUp";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 bg-[#F3E7DD]/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="FAQ"
          title="Pertanyaan Umum"
          subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan."
        />
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[#3B2A24] pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#C97B7B] shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === i ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="px-6 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
