"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { Home, Clock, CalendarDays } from "lucide-react";
import { useBreakpoint } from "@/hooks/ui/useBreakPoints";

export function MobileBottomNav() {
  const { isMobile } = useBreakpoint();
  const pathname = usePathname();

  const getIcon = (href: string) => {
    switch (href) {
      case "/":
        return <Home size={20} strokeWidth={2.2} />;
      case "/hourly":
        return <Clock size={20} strokeWidth={2.2} />;
      case "/daily":
        return <CalendarDays size={20} strokeWidth={2.2} />;
      default:
        return <Home size={20} strokeWidth={2.2} />;
    }
  };

  if (!isMobile) return null;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-[#13223f] bg-[#030914]/90 px-2 py-3.5 backdrop-blur-md">
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1.5 transition-colors duration-200 select-none ${
              isActive ? "text-[#1bf8c3]" : "text-[#7c8ba1] active:text-white"
            }`}
          >
            {/* Icon Wrapper */}
            <div className="flex h-5 w-5 items-center justify-center">
              {getIcon(item.href)}
            </div>

            {/* Label String */}
            <span className="text-[11px] font-semibold tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
