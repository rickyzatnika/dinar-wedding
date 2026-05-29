"use client";

import Image from "next/image";
import { navLinks } from "@/constants/navigation";
import { waUrl } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="relative h-10 w-[90px]">
            <Image
              src="/logo-dinar-wedding.png"
              alt="Dinar Wedding"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <button
            onClick={onClose}
            className="text-[#3B2A24] hover:text-[#C97B7B] transition-colors"
            aria-label="Tutup menu"
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
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-8">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-lg font-medium text-[#3B2A24] hover:text-[#C97B7B] transition-colors"
                  onClick={onClose}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#C97B7B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b86868] transition-colors"
            >
              Booking Via WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
