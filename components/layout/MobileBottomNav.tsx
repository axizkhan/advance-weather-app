"use client";

import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { Home, Clock, CalendarDays } from "lucide-react";

export function MobileBottomNav() {
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-white/10 bg-black/20 p-4 backdrop-blur-xl lg:hidden">
      {NAVIGATION_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
          {getIcon(item.href)}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
