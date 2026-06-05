"use client";

import { useState } from "react";

interface Tab {
  label: string;
  value: string;
}

interface Props {
  tabs: Tab[];
}

export function Tabs({ tabs }: Props) {
  const [active, setActive] = useState(tabs[0]?.value);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#13223f] bg-[#091225]/40 p-1.5 backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = active === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none focus:outline-none ${
              isActive
                ? "bg-[#1bf8c3] text-[#030914] shadow-[0_0_15px_rgba(27,248,195,0.25)]"
                : "text-[#7c8ba1] hover:bg-[#091225]/60 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
