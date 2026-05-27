import { Button } from "@/components/ui/Button";
import { waUrl } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="max-w-2xl">
          <span className="text-[#D8B07A] font-semibold tracking-[0.2em] text-sm uppercase">
            Dinar Wedding
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mt-6">
            Mewujudkan
            <br />
            <span className="text-[#D8B07A]">Rias Pengantin</span>
            <br />
            Elegan & Berkesan
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mt-6">
            Jasa makeup pengantin profesional untuk hari spesial Anda. Kami
            menghadirkan riasan elegan yang membuat Anda percaya diri di
            momen terindah.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button
              as="a"
              href={waUrl()}
              size="lg"
              className="bg-[#D8B07A] text-white hover:bg-[#c9a06c] border-none"
            >
              Booking WhatsApp
            </Button>
            <Button
              as="a"
              href="#paket"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-[#3B2A24]"
            >
              Lihat Paket
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
