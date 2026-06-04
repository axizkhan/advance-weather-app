import { WeatherForecasteResponse } from "@/service/weather/types.js";

export function normalizeForecastWeatherData(
  data: any,
): WeatherForecasteResponse {
  const currentTime = new Date(data.current?.time).getTime();

  const nearestHour =
    data.hourly?.reduce((closest: any, hour: any) => {
      const hourTime = new Date(hour.time).getTime();

      if (!closest) return hour;

      const closestTime = new Date(closest.time).getTime();

      return Math.abs(hourTime - currentTime) <
        Math.abs(closestTime - currentTime)
        ? hour
        : closest;
    }, null) ?? null;

  return {
    location: {
      lat: data.location?.lat,
      lon: data.location?.lon,
      country: data.location?.country ?? "",
      timezone: data.location?.timezone ?? "",
      requestedLat: data.location?.requested_lat,
      requestedLon: data.location?.requested_lon,
    },

    current: {
      temperature: data.current?.temperature,
      humidity: nearestHour?.humidity ?? 0,
      windSpeed: data.current?.wind_speed,
      windDirection: data.current?.wind_direction,
      uvIndex: nearestHour?.uv_index ?? 0,
      conditionCode: Number(data.current?.condition_code),
      icon: data.current?.icon,
      time: new Date(data.current?.time),
    },

    hourly:
      data.hourly?.map((hour: any) => ({
        time: hour.time,
        temperature: hour.temperature,
        precipitationProbability: hour.precipitation_probability,
        windSpeed: hour.wind_speed,
        conditionCode: Number(hour.condition_code),
        icon: hour.icon,
        humidity: hour.humidity,
        feelsLike: hour.feels_like,
        windGust: hour.wind_gust,
        uvIndex: hour.uv_index,
      })) ?? [],

    daily:
      data.daily?.map((day: any) => ({
        date: day.date,
        tempMin: day.temp_min,
        tempMax: day.temp_max,
        precipitationSum: day.precipitation_sum,
        sunrise: day.sunrise,
        sunset: day.sunset,
        conditionCode: Number(day.condition_code),
        icon: day.icon,
        precipitationProbability: day.precipitation_probability,
        windMax: day.wind_max,
      })) ?? [],
  };
}
