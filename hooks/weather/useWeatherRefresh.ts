"use client";

import { useEffect } from "react";

import { queryClient } from "@/store/query/queryClient";

import { queryKeys } from "@/store/query/queryKey";

import { CACHE_TIMES } from "@/constants/cacheTimes";

export function useWeatherRefresh(lat: number, lon: number) {
  useEffect(() => {
    if (!lat || !lon) return;

    const currentInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.weather.current(lat, lon),
      });
    }, CACHE_TIMES.CURRENT_WEATHER);

    const dailyInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.weather.daily(lat, lon),
      });
    }, CACHE_TIMES.DAILY_FORECAST);

    const hourlyInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.weather.hourly(lat, lon),
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
  }, []);
}
