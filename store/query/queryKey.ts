export const queryKeys = {
  weather: {
    current: (lat: number, lon: number, units: string, lang: string) => ["weather", "forecast", lat, lon, units, lang],

    hourly: (lat: number, lon: number, units: string, lang: string) => ["weather", "hourly", lat, lon, units, lang],

    daily: (lat: number, lon: number, units: string, lang: string) => ["weather", "daily", lat, lon, units, lang],
  },

  geo: {
    auto: () => ["geo", "auto"],
  },
};
