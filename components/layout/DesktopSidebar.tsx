"use client";

import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { Home, Clock, CalendarDays } from "lucide-react";

export function DesktopSidebar() {
  const getIcon = (href: string) => {
    switch (href) {
      case "/":
        return <Home size={20} />;
      case "/hourly":
        return <Clock size={20} />;
      case "/daily":
        return <CalendarDays size={20} />;
      default:
        return <Home size={20} />;
    }
  };

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-black/20 p-6 backdrop-blur-xl lg:block">
      <nav className="space-y-3">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/10"
          >
            {getIcon(item.href)}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
