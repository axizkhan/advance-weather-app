import { weatherRequest } from "./weatherClient";

export async function hourlyWeatherData({
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
  return weatherRequest("/v1/hourly", {
    lat,
    lon,
    units,
    days,
    ai,
  });
}
