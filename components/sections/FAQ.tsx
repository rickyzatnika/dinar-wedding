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
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="FAQ"
          title="Pertanyaan Umum"
          subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan."
        />
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="bg-[#F3E7DD]/20 rounded-xl overflow-hidden border border-gray-100">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F3E7DD]/40 transition-colors"
                >
                  <span className="font-semibold text-[#3B2A24] pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#C97B7B] shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === i ? "max-h-96 pb-6 px-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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
