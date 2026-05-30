"use client";

import { useState } from "react";
import Image from "next/image";
import { navLinks } from "@/constants/navigation";
import { useScroll } from "@/hooks/useScroll";
import { siteConfig } from "@/config/site";
import { waUrl } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrollingUp, scrollY } = useScroll();

  const hidden = scrollY > 80 && !isScrollingUp;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 bg-white/80 backdrop-blur-lg border-b border-white/20 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex-shrink-0 relative h-12 w-[108px]">
              <Image
                src="/logo-dinar-wedding.png"
                alt="Dinar Wedding"
                fill
                sizes="108px"
                className="object-contain object-left"
                priority
              />
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#3B2A24]/70 hover:text-[#C97B7B] font-medium transition-colors text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D8B07A] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#c9a06c] transition-colors text-sm shadow-md hover:shadow-lg"
              >
                Booking Via WhatsApp
              </a>
            </div>

            <button
              className="lg:hidden text-[#3B2A24]"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Buka menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
