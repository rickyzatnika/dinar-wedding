import { SectionTitle } from "@/components/ui/SectionTitle";
import { socials } from "@/constants/socials";

export function InstagramFeed() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Instagram"
          title="Ikuti Kami di Instagram"
          subtitle="Lihat karya terbaru kami di @dinnarwedding."
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <a
              key={i}
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-[#F3E7DD] rounded-xl overflow-hidden group"
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C97B7B]/20 to-[#D8B07A]/20 group-hover:scale-105 transition-transform duration-500">
                <span className="text-[#C97B7B]/40 text-xs font-medium">
                  IG {i + 1}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
