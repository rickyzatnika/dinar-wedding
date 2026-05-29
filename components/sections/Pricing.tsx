import { SectionTitle } from "@/components/ui/SectionTitle";
import { packages } from "@/lib/data";
import { formatPrice, waUrl } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animation/FadeUp";
import type { PackageCategory } from "@/types/package";

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
          <svg
            className="w-4 h-4 text-[#C97B7B] mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

function CategoryGroup({ category }: { category: PackageCategory }) {
  return (
    <div>
      <h4 className="text-[#C97B7B] font-semibold text-[11px] tracking-[0.15em] uppercase mb-2">
        {category.name}
      </h4>
      <FeatureList items={category.items} />
    </div>
  );
}

function PackageCard({ pkg }: { pkg: (typeof packages)[number] }) {
  return (
    <Card highlight={pkg.isPopular} className="flex flex-col relative">
      {pkg.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D8B07A] text-white text-xs font-semibold px-4 py-1 rounded-full z-10">
          Terpopuler
        </span>
      )}
      <div className="text-center mb-5 pb-5 border-b border-gray-100">
        <h3 className="text-xl font-bold text-[#3B2A24]">
          {pkg.name}
        </h3>
        <div className="text-2xl font-bold text-[#C97B7B] mt-1">
          {formatPrice(pkg.price)}
        </div>
      </div>
      <div className="space-y-4 mb-6 flex-1">
        {pkg.categories ? (
          pkg.categories.map((cat) => (
            <CategoryGroup key={cat.name} category={cat} />
          ))
        ) : (
          <FeatureList items={pkg.features} />
        )}
      </div>
      <Button
        as="a"
        href={waUrl(`Halo, saya tertarik dengan paket ${pkg.name}`)}
        variant={pkg.isPopular ? "primary" : "outline"}
        className="w-full"
      >
        Pilih Paket
      </Button>
    </Card>
  );
}

export function Pricing() {
  return (
    <section id="paket" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Paket"
          title="Pilih Paket Sesuai Kebutuhan"
          subtitle="Kami menawarkan berbagai paket rias & dekorasi yang bisa disesuaikan."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <FadeUp key={pkg.id} delay={i * 0.08}>
              <PackageCard pkg={pkg} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
