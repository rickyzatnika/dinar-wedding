import { Button } from "@/components/ui/Button";
import { waUrl } from "@/lib/utils";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#C97B7B] to-[#b86868]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap Mewujudkan Rias Impian Anda?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
          Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran
          spesial untuk hari pernikahan Anda.
        </p>
        <Button
          as="a"
          href={waUrl()}
          size="lg"
          className="bg-white text-[#C97B7B] hover:bg-gray-100"
        >
          Booking Via WhatsApp
        </Button>
      </div>
    </section>
  );
}
