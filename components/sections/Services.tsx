import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { FadeUp } from "@/components/animation/FadeUp";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function Services() {
  return (
    <section className="py-24 bg-[#F3E7DD]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Layanan"
          title="Layanan Profesional Kami"
          subtitle="Berbagai layanan rias untuk membuat hari spesial Anda sempurna."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <FadeUp key={service.title} delay={i * 0.1}>
              <Card className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#C97B7B]/10 flex items-center justify-center">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="text-xl font-semibold text-[#3B2A24] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
