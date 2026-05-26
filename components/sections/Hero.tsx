import { Button } from "@/components/ui/Button";
import { waUrl } from "@/lib/utils";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-[#F3E7DD] to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="text-[#C97B7B] font-semibold tracking-widest text-sm uppercase">
              Dinnar Wedding
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3B2A24] leading-tight">
              Mewujudkan
              <br />
              <span className="text-[#C97B7B]">Rias Pengantin</span>
              <br />
              Elegan & Berkesan
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Jasa makeup pengantin profesional untuk hari spesial Anda. Kami
              menghadirkan riasan elegan yang membuat Anda percaya diri di
              momen terindah.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                as="a"
                href={waUrl()}
                size="lg"
              >
                Booking WhatsApp
              </Button>
              <Button
                as="a"
                href="#paket"
                variant="outline"
                size="lg"
              >
                Lihat Paket
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] bg-[#F3E7DD] rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C97B7B]/20 to-[#D8B07A]/20">
                <span className="text-[#C97B7B]/40 text-lg font-medium">
                  Foto Pengantin
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D8B07A]/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#C97B7B]/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
