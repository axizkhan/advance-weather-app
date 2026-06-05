"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/store/query/queryKey";

async function fetchGeoWeather({
  ip = "auto",
  days = 7,
  ai = false,
}: {
  ip: string;
  days: number;
  ai: boolean;
}) {
  const reponse = await fetch("/api/weather/geo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip, days, ai }),
  });

  return reponse.json();
}

export function useGeoWeather({
  ip = "auto",
  days = 7,
  ai = false,
}: {
  ip?: string;
  days?: number;
  ai?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.geo.auto(),
    queryFn: () => fetchGeoWeather({ ip, days, ai }),
    enabled: !!ip && !!days,
  });
}
