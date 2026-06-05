"use client";

import { ReactNode, useEffect, useState } from "react";
import { getWeatherType } from "@/services/weather/weatherMapper";
import { weatherThemes } from "@/services/weather/weatherThemes";
import { WeatherAnimation } from "./WeatherAnimation";
import { WeatherOverlay } from "./WeatherOverlay";

interface Props {
  weatherCode?: string | number;
  children: ReactNode;
}

export function WeatherThemeWrapper({ weatherCode, children }: Props) {
  const [mounted, setMounted] = useState(false);

  // Prevents server-side hydration mismatches by ensuring client-side evaluation is active
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 text-white antialiased">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </div>
    );
  }

  const weatherType = weatherCode ? getWeatherType(Number(weatherCode)) : "default";
  const theme = weatherThemes[weatherType] || weatherThemes.default;

  return (
    <div
      className={`relative min-h-screen w-full bg-gradient-to-br text-white antialiased select-none ${theme} transition-all duration-1000 ease-in-out`}
    >
      <WeatherAnimation weatherType={weatherType} />
      <WeatherOverlay />

      <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply backdrop-brightness-[0.95]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </div>
    </div>
  );
}
