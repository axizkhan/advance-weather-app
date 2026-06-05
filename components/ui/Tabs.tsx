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
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActive(tab.value)}
          className={`rounded-2xl px-4 py-2 ${
            active === tab.value ? "bg-blue-500 text-white" : "bg-white/10"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
