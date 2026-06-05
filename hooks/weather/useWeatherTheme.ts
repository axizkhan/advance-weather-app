"use client";

import { useMemo } from "react";

import { getWeatherCondition } from "@/service/weather/getWeatherCondition";

import { weatherThemes } from "@/service/weather/weatherTheme";

export function useWeatherTheme(weatherCode?: string) {
  return useMemo(() => {
    if (!weatherCode) {
      return weatherThemes.default;
    }

    const type = getWeatherCondition(weatherCode);

    return weatherThemes[type.themeCode] || weatherThemes.default;
  }, [weatherCode]);
}
