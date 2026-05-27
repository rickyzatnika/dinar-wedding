import { siteConfig } from "@/config/site";
import { navLinks } from "@/constants/navigation";
import { socials } from "@/constants/socials";
import { waUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[#3B2A24] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">{siteConfig.name}</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-[#D8B07A] text-sm tracking-widest uppercase">Menu</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-[#D8B07A] text-sm tracking-widest uppercase">Kontak</h4>
            <ul className="space-y-3 text-white/60 text-sm">
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
            <h4 className="font-semibold mb-5 text-[#D8B07A] text-sm tracking-widest uppercase">Jam Operasional</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>Senin - Sabtu: 09:00 - 20:00</li>
              <li>Minggu: 10:00 - 17:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
