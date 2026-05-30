import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  return (
    <section id="tentang" className="py-24 bg-white relative">
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 opacity-10 pointer-events-none hidden md:block">
        <div className="relative w-full aspect-square">
          <Image
            src="/images/ornamen-small.webp"
            alt=""
            fill
            sizes="192px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Tentang Kami"
          title="Dedikasi untuk Hari Spesial Anda"
          subtitle="Dinar Wedding hadir untuk mewujudkan rias & dekorasi pengantin impian Anda dengan sentuhan profesional dan penuh kasih."
        />
        <div className="grid md:grid-cols-2 gap-16 items-center mt-8">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="/gallery/MakeUp/3.png"
              alt="Tentang Dinar Wedding"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-lg">
            Kami adalah tim profesional yang berdedikasi untuk memberikan rias &
            dekorasi pengantin terbaik. Dengan pengalaman bertahun-tahun,
            kami memahami bahwa setiap pasangan memiliki keunikan dan impian masing-masing.
            </p>
            <p className="text-gray-600 leading-relaxed">
            Kami menggunakan produk berkualitas tinggi dan teknik terkini untuk
            memastikan riasan tahan lama dan dekorasi yang memukau dari akad hingga resepsi.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-100">
              {[
                { number: "500+", label: "Pengantin Puas" },
                { number: "8+", label: "Tahun Pengalaman" },
                { number: "50+", label: "Tim Profesional" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-[#C97B7B]">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
