"use client";

import { ReactNode } from "react";
import { useWeatherTheme } from "@/hooks/weather/useWeatherTheme";

interface Props {
  weatherCode?: number;
  children: ReactNode;
}

export function WeatherThemeWrapper({ weatherCode, children }: Props) {
  const theme = useWeatherTheme(weatherCode);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme} transition-all duration-700`}>
      {children}
    </div>
  );
}
