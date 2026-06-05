"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/redux/hooks";
import { setLocation } from "@/store/redux/slices/locationSlice";
import { useGeoWeather } from "./useGeoWeather";
import { useCurrentWeather } from "./useCurrentWeather";
import { getBrowserLocation } from "@/service/geolocation/browserLocation";

function shiftOfflineData(baseData: any, now: number) {
  if (!baseData) return baseData;

  const shiftedData = { ...baseData, current: { ...baseData.current } };

  if (baseData.hourly && baseData.hourly.length > 0) {
    const currentHourData = baseData.hourly.find((hour: any) => {
      const hourTime = new Date(hour.time).getTime();
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

    const lastHour = baseData.hourly[baseData.hourly.length - 1];
    const lastHourTime = new Date(lastHour.time).getTime();
    if (now > lastHourTime && baseData.daily && baseData.daily.length > 0) {
      const todayStr = new Date(now).toISOString().split("T")[0];
      const currentDaily =
        baseData.daily.find((day: any) => day.date.startsWith(todayStr)) ||
        baseData.daily[baseData.daily.length - 1];

      if (currentDaily) {
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

  const { units, lang } = useAppSelector((state) => state.preferences);
  const location = useAppSelector((state) => state.location);

  const [browserGeoFailed, setBrowserGeoFailed] = useState(false);

  useEffect(() => {
    if (!location.lat) {
      getBrowserLocation()
        .then((coords) => {
          dispatch(
            setLocation({
              lat: coords.lat,
              lon: coords.lon,
              city: "",
              country: "",
            }),
          );
        })
        .catch((err) => {
          console.warn(
            "Browser Geolocation failed or denied, falling back to IP:",
            err,
          );
          setBrowserGeoFailed(true);
        });
    }
  }, [location.lat, dispatch]);

  const geoQuery = useGeoWeather({
    ip: "auto",
    days: 7,
    ai: false,
  });

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

  useEffect(() => {
    if (!isOffline) return;
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, [isOffline]);

  const baseData = isOffline ? shiftOfflineData(rawBaseData, now) : rawBaseData;

  return {
    location,
    units,
    lang,
    isLoading:
      (!activeLat && !browserGeoFailed) ||
      (!activeLat && geoQuery.isLoading) ||
      forecastQuery.isLoading,
    error,
    data: baseData
      ? {
          ...baseData,
          location: {
            ...baseData.location,
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
