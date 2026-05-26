"use client";

import { useState } from "react";
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
        className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 bg-white/90 backdrop-blur-md shadow-sm ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-2xl font-bold text-[#3B2A24]">
              {siteConfig.name}
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#3B2A24]/80 hover:text-[#C97B7B] font-medium transition-colors"
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
                className="bg-[#C97B7B] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#b86868] transition-colors text-sm"
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
