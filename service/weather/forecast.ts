import { weatherRequest } from "./weatherClient";

export async function forecasteWeatherData({
  lat,
  lon,
  ai = false,
  units = "matric",
  days = 7,
  lang = "en",
}: {
  lat: number;
  lon: number;
  ai: boolean;
  units: string;
  days: number;
  lang: string;
}) {
  return weatherRequest("/v1/weather", {
    lat,
    lon,
    units,
    days,
    ai,
    lang,
  });
}
