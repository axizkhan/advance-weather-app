"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { HourlyCard } from "./HourlyCard";

interface Props {
  data: any[];
}

export function HourlyForecast({ data }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  // TanStack Virtual configuration for ultra-smooth layout rendering
  const virtualizer = useVirtualizer({
    count: data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 115, // Aligned tightly with our HourlyCard min-width + column gaps
    horizontal: true,
    overscan: 4, // Buffers upcoming cards outside the viewport boundary to eliminate flashing
  });

  const hasData = data && data.length > 0;

  return (
    <section className="rounded-xl border border-[#13223f]/40 bg-[#091225]/20 p-5 backdrop-blur-sm">
      {/* High-Fidelity Module Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 rounded-full bg-[#1bf8c3]" />
          <h2 className="text-sm font-bold tracking-[0.06em] text-white uppercase">
            Hourly Telemetry
          </h2>
        </div>

        {/* Secondary layout metadata */}
        <span className="text-[10px] font-semibold tracking-[0.08em] text-[#7c8ba1]/60 uppercase">
          24-Hour Timeline
        </span>
      </div>

      {hasData ? (
        /* Scrollable Track Container viewport with customized dashboard scrollbar */
        <div
          ref={parentRef}
          className="scrollbar-thin scrollbar-thumb-[#13223f] scrollbar-track-transparent overflow-x-auto rounded-xl border border-[#13223f]/20 bg-[#030914]/30 p-3"
        >
          <div
            className="relative h-[142px] w-full"
            style={{
              width: `${virtualizer.getTotalSize()}px`,
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const item = data[virtualItem.index];
              if (!item) return null;

              return (
                <div
                  key={virtualItem.key}
                  className="absolute top-0 h-full"
                  style={{
                    width: `${virtualItem.size}px`,
                    transform: `translateX(${virtualItem.start}px)`,
                  }}
                >
                  {/* Outer padding wrap to simulate clean grid item gaps within absolute rendering */}
                  <div className="h-full pr-2.5">
                    <HourlyCard item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State Layout Box */
        <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-[#13223f]/60 bg-[#030914]/40 p-4 text-center">
          <p className="text-xs font-medium text-[#7c8ba1]">
            Waiting for chronographic station telemetry feed...
          </p>
        </div>
      )}
    </section>
  );
}
