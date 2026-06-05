"use client";

import { SearchInput } from "@/components/ui/SearchInput";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-xl">
      <h1 className="text-xl font-bold">Weather</h1>
      <div className="w-72">
        <SearchInput />
      </div>
    </header>
  );
}
