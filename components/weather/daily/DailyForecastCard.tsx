"use client";

import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "../shared/WeatherIcon";
import { getWeatherType } from "@/services/weather/weatherMapper";
import { useAppSelector } from "@/store/redux/hooks";
import { RootState } from "@/store/redux/store";

interface Props {
  item: {
    date: string | number | Date;
    conditionCode: number;
    icon: string;
    tempMax: number;
    tempMin: number;
  };
}

export function DailyForecastCard({ item }: Props) {
  const units = useAppSelector((state: RootState) => state.preferences.units);
  const isMetric = units === "metric";

  const dayName = new Date(item.date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const weatherKey = getWeatherType(item.conditionCode || 1000);
  const conditionText =
    weatherKey.charAt(0).toUpperCase() + weatherKey.slice(1);

  const avgTempRaw = (item.tempMax + item.tempMin) / 2;
  const displayTemp = isMetric
    ? Math.round(avgTempRaw)
    : Math.round((avgTempRaw * 9) / 5 + 32);

  return (
    <Card className="flex items-center justify-between p-4 transition-all duration-200 hover:border-[#13223f]/90 hover:bg-[#091225]/80">
      {/* Left: Day & Condition Stack */}
      <div className="space-y-0.5">
        <p className="text-sm font-semibold tracking-wide text-white">
          {dayName}
        </p>
        <p className="text-xs font-medium text-[#7c8ba1]">{conditionText}</p>
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
            {displayTemp}°
          </span>
        </div>
      </div>
    </Card>
  );
}
