export function getWeatherType(code: number) {
  if (code === 1000) {
    return "sunny";
  }
  if (code >= 1003 && code < 1180) {
    return "cloudy";
  }
  if (code >= 1180 && code < 1273) {
    return "rain";
  }
  if (code >= 1273 && code <= 1282) {
    return "storm";
  }
  if (code >= 1210 && code <= 1225) {
    return "snow";
  }
  return "default";
}
