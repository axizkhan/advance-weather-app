"use client";

import { HourlyCard } from "./HourlyCard";

interface Props {
  data: any[];
}

export function HourlyPreview({ data }: Props) {
  const hasData = data && data.length > 0;

  return (
    <section className="rounded-xl border border-[#13223f]/40 bg-[#091225]/20 p-5 backdrop-blur-sm">
      {/* High-Fidelity Module Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Platform Identity Mint Tag Accent */}
          <span className="h-3 w-1 rounded-full bg-[#1bf8c3]" />
          <h2 className="text-sm font-bold tracking-[0.06em] text-white uppercase">
            Hourly Forecast
          </h2>
        </div>

        {/* High-density layout tracking metadata */}
        <span className="text-[10px] font-semibold tracking-[0.08em] text-[#7c8ba1]/60 uppercase">
          12-Hour Horizon
        </span>
      </div>

      {hasData ? (
        /* Native horizontal layout track with ultra-smooth scroll configuration */
        <div className="flex snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#13223f] scrollbar-track-transparent gap-3 overflow-x-auto rounded-xl border border-[#13223f]/20 bg-[#030914]/30 p-3 pb-4">
          {data.slice(0, 12).map((item, index) => (
            <div key={item.id || item.time || index} className="snap-center">
              <HourlyCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        /* Structural fallback matrix to keep geometry solid during loading states */
        <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-[#13223f]/60 bg-[#030914]/40 p-4 text-center">
          <p className="text-xs font-medium text-[#7c8ba1]">
            Awaiting upcoming chronographic station telemetry feed...
          </p>
        </div>
      )}
    </section>
  );
}
