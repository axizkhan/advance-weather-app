"use client";

import { HumidityCard } from "../current/HumidityCard";
import { WindCard } from "../current/WindCard";
import { UVCard } from "../current/UVCard";
import { VisibilityCard } from "../current/VisibilityCard";

interface Props {
  data: any;
}

export function MetricsGrid({ data }: Props) {
  // Defensive check to ensure data structures are warm before rendering the DOM grid nodes
  const hasTelemetry = data?.current;

  return (
    <section className="rounded-xl border border-[#13223f]/40 bg-[#091225]/20 p-5 backdrop-blur-sm">
      {/* High-Fidelity Container Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Identity Mint Tag Accent Indicator */}
          <span className="h-3 w-1 rounded-full bg-[#1bf8c3]" />
          <h2 className="text-sm font-bold tracking-[0.06em] text-white uppercase">
            Atmospheric Telemetry
          </h2>
        </div>

        {/* Real-time system feed metadata badge */}
        <span className="text-[10px] font-semibold tracking-[0.08em] text-[#7c8ba1]/60 uppercase">
          Live Sensor Arrays
        </span>
      </div>

      {hasTelemetry ? (
        /* Responsive High-Density Geometry Grid Matrix */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <HumidityCard humidity={data.current.humidity ?? 0} />
          <WindCard speed={data.current.windSpeed ?? 0} />
          <UVCard uv={data.current.uvIndex ?? 0} />
          <VisibilityCard visibility={data.current.visibility ?? 10} />
        </div>
      ) : (
        /* Clean fallback state container to preserve dashboard alignment metrics during async streams */
        <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-[#13223f]/60 bg-[#030914]/40 p-4 text-center">
          <p className="text-xs font-medium text-[#7c8ba1]">
            Calibrating regional environmental telemetry feeds...
          </p>
        </div>
      )}
    </section>
  );
}
