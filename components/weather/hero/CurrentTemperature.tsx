"use client";

import { useAppSelector } from "@/store/redux/hooks";
import { RootState } from "@/store/redux/store";
interface Props {
  temperature: number;
}

export function CurrentTemperature({ temperature }: Props) {
  // Extract global unit format settings from your preferences slice
  const units = useAppSelector((state: RootState) => state.preferences.units);

  const isMetric = units === "metric";

  const displayTemperature = isMetric
    ? Math.round(temperature)
    : Math.round((temperature * 9) / 5 + 32);

  const unitLabel = isMetric ? "C" : "F";

  return (
    <div className="flex items-start select-none">
      {/* Prime Core Numeric Reading Display */}
      <h1 className="text-7xl font-extrabold tracking-tighter text-white sm:text-8xl md:text-9xl">
        {displayTemperature}
      </h1>

      {/* High-Fidelity Degree & Scale Notation Cluster */}
      <div className="mt-2 ml-1 flex items-start md:mt-4">
        {/* Degree Symbol O-Ring */}
        <span className="text-3xl leading-none font-light text-[#7c8ba1]/70 md:text-4xl">
          °
        </span>
        {/* Scale Metric Character Indicator */}
        <span className="text-2xl leading-none font-bold text-white md:text-3xl">
          {unitLabel}
        </span>
      </div>
    </div>
  );
}
