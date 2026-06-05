"use client";

import { DailyForecastCard } from "./DailyForecastCard";

interface Props {
  data: any[];
}

export function DailyPreview({ data }: Props) {
  // Graceful guard state to prevent layout breaking if telemetry data is delayed or empty
  const hasData = data && data.length > 0;

  return (
    <section className="rounded-xl border border-[#13223f]/40 bg-[#091225]/20 p-5 backdrop-blur-sm">
      {/* High-Fidelity Header Section */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 rounded-full bg-[#1bf8c3]" />
          <h2 className="text-sm font-bold tracking-[0.06em] text-white uppercase">
            7-Day Forecast
          </h2>
        </div>

        {/* Secondary high-density metadata badge */}
        <span className="text-[10px] font-semibold tracking-[0.08em] text-[#7c8ba1]/60 uppercase">
          Regional Outlook
        </span>
      </div>

      {/* Structured Chronological Row Flow */}
      {hasData ? (
        <div className="flex flex-col gap-2.5">
          {data.slice(0, 7).map((item, index) => (
            <DailyForecastCard
              key={item.id || item.date || index}
              item={item}
            />
          ))}
        </div>
      ) : (
        /* Clean fallback state container to preserve dashboard geometry during async load frames */
        <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-[#13223f]/60 bg-[#030914]/40 p-4 text-center">
          <p className="text-xs font-medium text-[#7c8ba1]">
            No forecast telemetry stream available
          </p>
        </div>
      )}
    </section>
  );
}
