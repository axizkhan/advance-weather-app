import { weatherRequest } from "./weatherClient";

export async function currentWeatherData({
  lat,
  lon,
  ai = false,
  units = "matric",
  lang = "en",
}: {
  lat: number;
  lon: number;
  ai: boolean;
  units: string;
  lang: string;
}) {
  return weatherRequest("/v1/current", {
    lat,
    lon,
    units,
    lang,
    ai,
  });
}
