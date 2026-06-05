"use client";

import { useAppSelector } from "@/store/redux/hooks";
import { RootState } from "@/store/redux/store";
import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "../shared/WeatherIcon";

interface Props {
  item: {
    time: string | number | Date;
    icon: string;
    temperature: number;
  };
}

export function HourlyCard({ item }: Props) {
  // Extract global unit format settings from your preferences slice
  const units = useAppSelector((state: RootState) => state.preferences.units);
  const isMetric = units === "metric";

  // Calculate dynamic display value
  const displayTemp = isMetric
    ? Math.round(item.temperature)
    : Math.round((item.temperature * 9) / 5 + 32);

  // Format time into a clean 12-hour or 24-hour scannable string (e.g., "04:00 PM" or "16:00")
  const formattedTime = new Date(item.time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card className="flex min-w-[76px] sm:min-w-[105px] flex-col items-center justify-between gap-2 sm:gap-3 p-2 sm:p-4 text-center transition-all duration-200 select-none hover:border-[#13223f]/90 hover:bg-[#091225]/80">
      {/* Time Segment Tracker */}
      <p className="text-[9px] sm:text-[11px] font-bold tracking-wider text-[#7c8ba1] uppercase">
        {formattedTime}
      </p>

      {/* Weather Icon Frame Vector */}
      <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center drop-shadow-[0_4px_8px_rgba(3,9,20,0.4)] transition-transform duration-300 hover:scale-110">
        <WeatherIcon icon={item.icon} size={32} />
      </div>

      {/* Temperature Display Metric */}
      <p className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
        {displayTemp}
        <span className="ml-0.5 text-xs sm:text-sm font-semibold text-[#7c8ba1]/70">
          °
        </span>
      </p>
    </Card>
  );
}
