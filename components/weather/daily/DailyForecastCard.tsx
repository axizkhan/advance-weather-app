"use client";

import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "../shared/WeatherIcon";

interface Props {
  item: {
    date: string | number | Date;
    condition: string;
    icon: string;
    maxTemp: number;
    minTemp: number;
  };
}

export function DailyForecastCard({ item }: Props) {
  const dayName = new Date(item.date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <Card className="flex items-center justify-between p-4 transition-all duration-200 hover:border-[#13223f]/90 hover:bg-[#091225]/80">
      {/* Left: Day & Condition Stack */}
      <div className="space-y-0.5">
        <p className="text-sm font-semibold tracking-wide text-white">
          {dayName}
        </p>
        <p className="text-xs font-medium text-[#7c8ba1]">{item.condition}</p>
      </div>

      {/* Right: Weather Icon & Temperature Range Grid */}
      <div className="flex items-center gap-6">
        {/* Isolated illustration container */}
        <div className="flex h-12 w-12 items-center justify-center drop-shadow-[0_4px_10px_rgba(3,9,20,0.3)]">
          <WeatherIcon icon={item.icon} size={36} />
        </div>

        {/* High-density thermal typography alignment */}
        <div className="flex min-w-[70px] items-baseline justify-end gap-2.5 text-right">
          <span className="text-base font-bold tracking-tight text-white">
            {Math.round(item.maxTemp)}°
          </span>
          <span className="text-xs font-semibold tracking-tight text-[#7c8ba1]/60">
            {Math.round(item.minTemp)}°
          </span>
        </div>
      </div>
    </Card>
  );
}
