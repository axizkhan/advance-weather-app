import { WeatherGeoResponse } from "@/service/weather/types";

export const queryKeys = {
  weather: {
    forecaste: (lat: string, lon: string) => ["weather", "forecaste", lat, lon],

    hourly: (lat: string, lon: string) => ["weather", "hourly", lat, lon],

    daily: (lat: string, lon: string) => ["weather", "daily", lat, lon],
  },

  geo: {
    auto: () => ["geo", "auto"],
  },
};
