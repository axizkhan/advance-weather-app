"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/redux/hooks";
import { setLocation } from "@/store/redux/slices/locationSlice";
import { useGeoWeather } from "./useGeoWeather";
import { useCurrentWeather } from "./useCurrentWeather";

function shiftOfflineData(baseData: any, now: number) {
  if (!baseData) return baseData;

  // Deep clone to avoid mutating the React Query cache
  const shiftedData = { ...baseData, current: { ...baseData.current } };

  if (baseData.hourly && baseData.hourly.length > 0) {
    // 1. Try to find the matching hour
    const currentHourData = baseData.hourly.find((hour: any) => {
      const hourTime = new Date(hour.time).getTime();
      // Hour block is valid for 1 hour (3600000 ms)
      return now >= hourTime && now < hourTime + 3600000;
    });

    if (currentHourData) {
      shiftedData.current = {
        ...shiftedData.current,
        temperature: currentHourData.temperature,
        humidity: currentHourData.humidity,
        windSpeed: currentHourData.windSpeed,
        conditionCode: currentHourData.conditionCode,
        icon: currentHourData.icon,
        uvIndex: currentHourData.uvIndex,
        time: new Date(now),
      };
      return shiftedData;
    }

    // 2. If hourly array is exhausted (time has passed the last cached hour)
    const lastHour = baseData.hourly[baseData.hourly.length - 1];
    const lastHourTime = new Date(lastHour.time).getTime();
    if (now > lastHourTime && baseData.daily && baseData.daily.length > 0) {
      // Find matching daily data or default to the very last available day
      const todayStr = new Date(now).toISOString().split("T")[0];
      const currentDaily =
        baseData.daily.find((day: any) => day.date.startsWith(todayStr)) ||
        baseData.daily[baseData.daily.length - 1];

      if (currentDaily) {
        // Approximate temperature as the average of min and max
        const avgTemp = (currentDaily.tempMin + currentDaily.tempMax) / 2;
        shiftedData.current = {
          ...shiftedData.current,
          temperature: Math.round(avgTemp * 10) / 10,
          windSpeed: currentDaily.windMax || shiftedData.current.windSpeed,
          conditionCode: currentDaily.conditionCode,
          icon: currentDaily.icon,
          time: new Date(now),
        };
        return shiftedData;
      }
    }
  }

  return shiftedData;
}

export function useWeatherData() {
  const dispatch = useAppDispatch();
  const [now, setNow] = useState(Date.now());

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

  const rawBaseData = forecastQuery.data || geoQuery.data;
  const error = forecastQuery.error || geoQuery.error;
  const isOffline = !!error && !!rawBaseData;

  // 4. Force a re-render every minute to keep time-shifted data accurate when offline
  useEffect(() => {
    if (!isOffline) return;
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, [isOffline]);

  // Apply offline interpolation to shift data to current time
  const baseData = isOffline ? shiftOfflineData(rawBaseData, now) : rawBaseData;

  return {
    location,
    units,
    lang,
    // Provide a unified loading state
    isLoading: (!activeLat && geoQuery.isLoading) || forecastQuery.isLoading,
    error,
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
