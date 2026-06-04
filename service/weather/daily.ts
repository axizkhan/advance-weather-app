import { weatherRequest } from "./weatherClient";

export async function dailyWeatherData({
  lat,
  lon,
  ai = false,
  units = "matric",
  days = 7,
}: {
  lat: number;
  lon: number;
  ai: boolean;
  units: string;
  days: number;
}) {
  return weatherRequest("/v1/daily", {
    lat,
    lon,
    units,
    days,
    ai,
  });
}
