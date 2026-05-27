import { SectionTitle } from "@/components/ui/SectionTitle";
import { packages } from "@/lib/data";
import { formatPrice, waUrl } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animation/FadeUp";

export function Pricing() {
  return (
    <section id="paket" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Paket"
          title="Pilih Paket Sesuai Kebutuhan"
          subtitle="Kami menawarkan berbagai paket rias pengantin yang bisa disesuaikan."
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <FadeUp key={pkg.id} delay={i * 0.12}>
              <Card highlight={pkg.isPopular} className="flex flex-col relative">
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D8B07A] text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Terpopuler
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#3B2A24] mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-bold text-[#C97B7B]">
                    {formatPrice(pkg.price)}
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {pkg.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-[#C97B7B] mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  as="a"
                  href={waUrl(`Halo, saya tertarik dengan paket ${pkg.name}`)}
                  variant={pkg.isPopular ? "primary" : "outline"}
                  className="w-full"
                >
                  Pilih Paket
                </Button>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
