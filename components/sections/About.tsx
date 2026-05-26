import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Tentang Kami"
          title="Dedikasi untuk Kecantikan Anda"
          subtitle="Dinnar Wedding hadir untuk mewujudkan rias pengantin impian Anda dengan sentuhan profesional dan penuh kasih."
        />
        <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
          <div className="aspect-square bg-[#F3E7DD] rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C97B7B]/20 to-[#D8B07A]/20">
              <span className="text-[#C97B7B]/40 text-lg font-medium">
                Tentang Kami
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Kami adalah tim makeup artist profesional yang berdedikasi untuk
              memberikan riasan pengantin terbaik. Dengan pengalaman bertahun-tahun,
              kami memahami bahwa setiap pengantin memiliki keunikan dan impian masing-masing.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Kami menggunakan produk berkualitas tinggi dan teknik terkini untuk
              memastikan riasan tahan lama dan tetap flawless dari akad hingga resepsi.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { number: "500+", label: "Pengantin" },
                { number: "8+", label: "Tahun Experience" },
                { number: "50+", label: "Tim MUA" },
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
