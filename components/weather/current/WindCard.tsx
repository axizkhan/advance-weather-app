"use client";

import { useAppSelector } from "@/store/redux/hooks";
import { RootState } from "@/store/redux/store";
import { Card } from "@/components/ui/Card";

interface Props {
  /** Wind speed provided in km/h from the telemetry source */
  speed: number;
}

export function WindCard({ speed }: Props) {
  // Extract user unit preference from the registered store slice
  const units = useAppSelector((state: RootState) => state.preferences.units);

  const isMetric = units === "metric";

  // Calculate dynamic display value and notation label
  // Formula: 1 km/h = 0.621371 mph
  const displaySpeed = isMetric ? speed : Math.round(speed * 0.621371);
  const unitLabel = isMetric ? "km/h" : "mph";

  return (
    <Card className="flex flex-col justify-between">
      <div>
        {/* Label styled with high-density uppercase slate typography */}
        <p className="text-[11px] font-bold tracking-[0.08em] text-[#7c8ba1] uppercase">
          Wind Speed
        </p>

        {/* Metric styled with tight tracking and pure white display weights */}
        <h3 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {displaySpeed}
          <span className="ml-1 text-lg font-semibold tracking-normal text-[#7c8ba1]/70">
            {unitLabel}
          </span>
        </h3>
      </div>

      {/* Real-time telemetry connection status bar */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1bf8c3]" />
        <span className="text-[11px] font-medium text-[#7c8ba1]">
          Anemometer Stream Active
        </span>
      </div>
    </Card>
  );
}
