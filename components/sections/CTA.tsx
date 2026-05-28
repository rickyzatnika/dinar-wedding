import { Button } from "@/components/ui/Button";
import { waUrl } from "@/lib/utils";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#3B2A24] to-[#4a352e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap Mewujudkan Pernikahan Impian Anda?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran
          spesial untuk hari pernikahan Anda.
        </p>
        <Button
          as="a"
          href={waUrl()}
          size="lg"
          className="bg-[#D8B07A] text-white hover:bg-[#c9a06c] border-none"
        >
          Booking Via WhatsApp
        </Button>
      </div>
    </section>
  );
}
