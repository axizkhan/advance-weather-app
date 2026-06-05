"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { WeatherHero } from "@/components/weather/hero/WeatherHero";
import { MetricsGrid } from "@/components/weather/metrics/MetricsGrid";
import { HourlyPreview } from "@/components/weather/hourly/HourlyPreview";
import { DailyPreview } from "@/components/weather/daily/DailyPreview";
import { TemperatureChart } from "@/components/weather/charts/TemperatureChart";
import { WeatherThemeWrapper } from "@/components/weather/shared/WeatherThemeWrapper";
import { WeatherBackground } from "@/components/weather/shared/WeatherBackground";
import { useGeoWeather } from "@/hooks/weather/useGeoWeather";

export default function HomePage() {
  const weatherQuery = useGeoWeather({
    days: 7,
    ai: false,
    ip: "auto",
  });

  const { isLoading, error, data } = weatherQuery;

  if (isLoading) {
    return <main className="p-6">Loading location...</main>;
  }

  if (error) {
    return <main className="p-6">{error.message}</main>;
  }

  if (!data) {
    return <main className="p-6">No weather data available</main>;
  }

  const weatherCode = data?.current?.condition?.code;

  return (
    <WeatherThemeWrapper weatherCode={weatherCode}>
      <WeatherBackground />
      <PageWrapper>
        <div className="space-y-8">
          {data && (
            <>
              <WeatherHero data={data} />
              <MetricsGrid data={data} />
            </>
          )}

          {data?.hourly && (
            <>
              <HourlyPreview data={data.hourly} />
              <TemperatureChart data={data.hourly} />
            </>
          )}

          {data?.daily && <DailyPreview data={data.daily} />}
        </div>
      </PageWrapper>
    </WeatherThemeWrapper>
  );
}
