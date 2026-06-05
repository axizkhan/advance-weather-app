"use client";

import { useAppSelector } from "@/store/redux/hooks";
import { RootState } from "@/store/redux/store";

interface Props {
  value: number;
}

export function FeelsLike({ value }: Props) {
  const units = useAppSelector((state: RootState) => state.preferences.units);

  const isMetric = units === "metric";

  const displayValue = isMetric
    ? Math.round(value)
    : Math.round((value * 9) / 5 + 32);

  const unitLabel = isMetric ? "C" : "F";

  return (
    <div className="flex items-center gap-1.5 select-none">
      {/* Subtle indicator accent dot */}
      <span className="h-1 w-1 rounded-full bg-[#7c8ba1]/40" />

      {/* High-fidelity layout text */}
      <p className="text-xs font-semibold tracking-wide text-[#7c8ba1]">
        Feels like{" "}
        <span className="font-bold text-white">
          {displayValue}°{unitLabel}
        </span>
      </p>
    </div>
  );
}
