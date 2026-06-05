"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/store/query/queryKey";

async function fetchCurrentWeather({
  lat,
  lon,
  lang = "en",
  unit = "metric",
  days = 7,
  ai = false,
}: {
  lat: number;
  lon: number;
  lang: string;
  unit: string;
  days: number;
  ai: boolean;
}) {
  const reponse = await fetch("/api/weather/forecast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat, lon, unit, lang, days, ai }),
  });

  return reponse.json();
}

export function useCurrentWeather({
  lat,
  lon,
  lang = "en",
  unit = "metric",
  days = 7,
  ai = false,
}: {
  lat: number;
  lon: number;
  lang?: string;
  unit?: string;
  days?: number;
  ai?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.weather.current(lat, lon),
    queryFn: () => fetchCurrentWeather({ lat, lon, lang, unit, days, ai }),
    enabled: !!lat && !!lon,
  });
}
