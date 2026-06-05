"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/redux/hooks";
import { queryClient } from "@/store/query/queryClient";
import { queryKeys } from "@/store/query/queryKey";
import { CACHE_TIMES } from "@/constants/cacheTimes";

export function useWeatherRefresh(lat: number, lon: number) {
  const { units, lang } = useAppSelector((state) => state.preferences);

  useEffect(() => {
    if (!lat || !lon) return;

    const currentInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.weather.current(lat, lon, units, lang),
      });
    }, CACHE_TIMES.CURRENT_WEATHER);

    const dailyInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.weather.daily(lat, lon, units, lang),
      });
    }, CACHE_TIMES.DAILY_FORECAST);

    const hourlyInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.weather.hourly(lat, lon, units, lang),
      });
    }, CACHE_TIMES.HOURLY_FORECAST);

    const geoInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.geo.auto(),
      });
    }, CACHE_TIMES.GEO_LOCATION);

    return () => {
      clearInterval(dailyInterval);
      clearInterval(hourlyInterval);
      clearInterval(geoInterval);
      clearInterval(currentInterval);
    };
  }, [lat, lon, units, lang]);
}
