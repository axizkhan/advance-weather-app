"use client";

import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
      <Search size={18} />
      <input placeholder="Search location..." className="w-full bg-transparent outline-none" />
    </div>
  );
}
