import { siteConfig } from "@/config/site";
import { navLinks } from "@/constants/navigation";
import { socials } from "@/constants/socials";
import { waUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[#3B2A24] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-white/70 leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#D8B07A]">Menu</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#D8B07A]">Kontak</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href={waUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${socials.email}`}
                  className="hover:text-white transition-colors"
                >
                  {socials.email}
                </a>
              </li>
              <li>
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#D8B07A]">Jam Operasional</h4>
            <ul className="space-y-3 text-white/70">
              <li>Senin - Sabtu: 09:00 - 20:00</li>
              <li>Minggu: 10:00 - 17:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
