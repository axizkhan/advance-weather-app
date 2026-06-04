export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherLocation extends Coordinates {
  city: string;
  region: string;
  country: string;
  localtime: string;
}

export interface ForecastLocation extends Coordinates {
  country: string;
  timezone: string;
  requestedLat: number;
  requestedLon: number;
}

export interface CurrentWeather {
  temperature: number;

  humidity: number;

  windSpeed: number;

  windDirection: number;
  uvIndex: number;

  conditionCode: number;
  icon: string;
  time: Date;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  precipitationProbability: number;
  windSpeed: number;
  conditionCode: number;
  icon: string;
  humidity: number;
  feelsLike: number;
  windGust: number;
  uvIndex: number;
}

export interface DailyForecastItem {
  date: string;
  tempMin: number;
  tempMax: number;
  precipitationSum: number;
  sunrise: string;
  sunset: string;
  conditionCode: number;
  icon: string;
  precipitationProbability: number;
  windMax: number;
}

export interface WeatherGeoResponse {
  location: WeatherLocation;

  current: CurrentWeather;

  hourly?: HourlyForecastItem[];

  daily?: DailyForecastItem[];
}

export interface WeatherForecasteResponse {
  location: ForecastLocation;

  current: CurrentWeather;

  hourly?: HourlyForecastItem[];

  daily?: DailyForecastItem[];
}
