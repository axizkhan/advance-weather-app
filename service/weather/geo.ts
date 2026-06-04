import { weatherRequest } from "./weatherClient";

export async function autoGeoData({
  ip = "auto",
  days = 7,
  ai = false,
}: {
  ip: string;
  days: number;
  ai: boolean;
}) {
  return weatherRequest("/v1/weather-geo", {
    ip,
    days,
    ai,
  });
}
