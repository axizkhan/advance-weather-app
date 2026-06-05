"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CurrentTemperature } from "./CurrentTemperature";
import { WeatherCondition } from "./WeatherCondition";
import { WeatherLocation } from "./WeatherLocation";
import { FeelsLike } from "./FeelsLike";
import { WeatherIcon } from "../shared/WeatherIcon";

import { getWeatherType } from "@/services/weather/weatherMapper";

interface Props {
  data: any;
}

export function WeatherHero({ data }: Props) {
  const city = data.location?.city || data.location?.name || "Unknown Location";
  const country = data.location?.country || "";
  const temperature = data.current?.temperature || 0;
  const feelsLike = data.hourly?.[0]?.feelsLike ?? temperature;
  const conditionCode = data.current?.conditionCode || 1000;
  const icon = data.current?.icon || "";

  // Convert WMO code to human-readable string
  const weatherKey = getWeatherType(conditionCode);
  const conditionText =
    weatherKey.charAt(0).toUpperCase() + weatherKey.slice(1);

  return (
    <GlassCard className="relative overflow-hidden border border-[#13223f]/60 bg-[#091225]/40 p-6 shadow-xl backdrop-blur-md sm:p-8 md:p-10">
      {/* Decorative localized ambient glow background matrix */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#1bf8c3]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Main content grid split */}
      <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        {/* Left Stack: Telemetry Strings & Aggregates */}
        <div className="flex flex-col items-start space-y-3.5 md:space-y-4">
          <WeatherLocation city={city} country={country} />

          <div className="my-1">
            <CurrentTemperature temperature={temperature} />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <WeatherCondition condition={conditionText} />
            <span className="hidden h-3 w-px bg-[#13223f] sm:block" />
            <FeelsLike value={feelsLike} />
          </div>
        </div>

        {/* Right Stack: Isolated Illustration Canvas */}
        <div className="flex items-center justify-center self-center md:self-auto">
          <div className="group relative flex h-36 w-36 items-center justify-center rounded-full border border-[#13223f]/30 bg-[#030914]/20 p-2 shadow-inner transition-transform duration-500 hover:scale-105">
            {/* Soft backdrop glow layer backing the weather icon */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1bf8c3]/5 to-transparent opacity-60 mix-blend-screen" />

            <WeatherIcon icon={icon} alt={conditionText} size={110} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
