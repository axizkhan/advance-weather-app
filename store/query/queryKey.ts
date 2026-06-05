export const queryKeys = {
  weather: {
    current: (lat: number, lon: number) => ["weather", "forecaste", lat, lon],

    hourly: (lat: number, lon: number) => ["weather", "hourly", lat, lon],

    daily: (lat: number, lon: number) => ["weather", "daily", lat, lon],
  },

  geo: {
    auto: () => ["geo", "auto"],
  },
};
