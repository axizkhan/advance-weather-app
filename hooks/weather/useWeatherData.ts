"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/redux/hooks";
import { setLocation } from "@/store/redux/slices/locationSlice";
import { useGeoWeather } from "./useGeoWeather";
import { useCurrentWeather } from "./useCurrentWeather";

export function useWeatherData() {
  const dispatch = useAppDispatch();

  // Extract user preferences and current location from Redux
  const { units, lang } = useAppSelector((state) => state.preferences);
  const location = useAppSelector((state) => state.location);

  // 1. Fetch GeoWeather (auto-location via IP) if we don't have explicit coordinates
  const geoQuery = useGeoWeather({
    ip: "auto",
    days: 7,
    ai: false,
  });

  // 2. Sync auto-detected location into Redux if location is empty
  useEffect(() => {
    if (!location.lat && geoQuery.data?.location) {
      dispatch(
        setLocation({
          lat: geoQuery.data.location.lat,
          lon: geoQuery.data.location.lon,
          // geoNormalizer returns city, but safeguard with name just in case
          city:
            (geoQuery.data.location as any).city ||
            (geoQuery.data.location as any).name,
          country: geoQuery.data.location.country,
        }),
      );
    }
  }, [geoQuery.data, location.lat, dispatch]);

  // 3. Fetch precise weather using the robust Forecast endpoint, passing in Redux prefs
  const activeLat = location.lat || geoQuery.data?.location?.lat;
  const activeLon = location.lon || geoQuery.data?.location?.lon;

  const forecastQuery = useCurrentWeather({
    lat: activeLat,
    lon: activeLon,
    unit: units,
    lang: lang,
    days: 7,
  });

  const baseData = forecastQuery.data || geoQuery.data;

  return {
    location,
    units,
    lang,
    // Provide a unified loading state
    isLoading: (!activeLat && geoQuery.isLoading) || forecastQuery.isLoading,
    error: forecastQuery.error || geoQuery.error,
    // Fall back to geoQuery data if forecast hasn't resolved yet
    data: baseData
      ? {
          ...baseData,
          location: {
            ...baseData.location,
            // Inject the Redux location or fallback to geoQuery so the UI never sees "Unknown Location"
            city:
              location.city ||
              (geoQuery.data?.location as any)?.city ||
              (baseData.location as any)?.name ||
              (baseData.location as any)?.city ||
              "Unknown City",
            country:
              location.country ||
              geoQuery.data?.location?.country ||
              (baseData.location as any)?.country ||
              "",
          },
        }
      : undefined,
  };
}
