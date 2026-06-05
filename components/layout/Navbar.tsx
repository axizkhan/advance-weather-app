"use client";

import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { useBreakpoint } from "@/hooks/ui/useBreakPoints";
import { useScrollPosition } from "@/hooks/ui/useScrollPosition";

export function Navbar() {
  const { isMobile } = useBreakpoint();
  const scrollY = useScrollPosition();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrollY > 30
          ? "border-[#13223f] bg-[#030914]/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1bf8c3]/10 text-[#1bf8c3]">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Weather<span className="text-[#1bf8c3]">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {!isMobile &&
            NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium text-[#7c8ba1] transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
