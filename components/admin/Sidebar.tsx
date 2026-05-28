"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Booking", href: "/admin/booking", icon: "📅" },
  { label: "Paket", href: "/admin/packages", icon: "💎" },
  { label: "Galeri", href: "/admin/gallery", icon: "🖼️" },
  { label: "FAQ", href: "/admin/faq", icon: "❓" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-[#3B2A24] text-white min-h-screen flex flex-col transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="font-semibold text-sm">Dinar Wedding</h2>
            <p className="text-[10px] text-white/60">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/60 hover:text-white text-lg"
        >
          {collapsed ? "☰" : "✕"}
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[#C97B7B] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        {!collapsed && session?.user && (
          <p className="text-xs text-white/60 mb-2 truncate">
            {session.user.name}
          </p>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors w-full"
        >
          <span>🚪</span>
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}
