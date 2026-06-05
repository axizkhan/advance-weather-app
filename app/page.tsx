"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { WeatherHero } from "@/components/weather/hero/WeatherHero";
import { MetricsGrid } from "@/components/weather/metrics/MetricsGrid";
import { HourlyPreview } from "@/components/weather/hourly/HourlyPreview";
import { DailyPreview } from "@/components/weather/daily/DailyPreview";
import { TemperatureChart } from "@/components/weather/charts/TemperatureChart";
import { WeatherThemeWrapper } from "@/components/weather/shared/WeatherThemeWrapper";
import { WeatherBackground } from "@/components/weather/shared/WeatherBackground";
import { useWeatherData } from "@/hooks/weather/useWeatherData";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { CentralizedErrorPage } from "@/components/shared/CentralizedErrorPage";

export default function HomePage() {
  // Execute real-time atmospheric telemetry sync loop using the master hook
  const { isLoading, error, data } = useWeatherData();

  // 1. Initial State: Handle splash view rendering during core telemetry load
  if (isLoading) {
    return <SplashScreen />;
  }

  // 1. Loading and NO cached data → Show splash
  if (isLoading && !data) {
    return <SplashScreen />;
  }

  // 2. No data even from cache and an error occurred → Show offline state
  if (error && (!data || !data.hourly)) {
    return <CentralizedErrorPage code="OFFLINE" errorInstance={error} />;
  }

  // 3. No data even from cache → Show not found
  if (!data || !data.hourly) {
    return <CentralizedErrorPage code="NOT_FOUND" />;
  }

  // Extract explicit WMO code strings or numbers from current weather frame coordinates
  const weatherCode = data.current?.condition?.code;

  // Filter hourly to start from the NEXT hour relative to current time, limited to 24 hours
  const currentTime = data.current?.time
    ? new Date(data.current.time).getTime()
    : Date.now();
  const futureHourly =
    data.hourly?.filter(
      (hour: any) => new Date(hour.time).getTime() > currentTime,
    ) || [];
  const homeHourly = futureHourly.slice(0, 24);

  console.log(data);
  return (
    <WeatherThemeWrapper weatherCode={weatherCode}>
      <WeatherBackground />

      <PageWrapper>
        <div className="mx-auto max-w-5xl space-y-6 pb-12 sm:space-y-8">
          <WeatherHero data={data} />

          <MetricsGrid data={data} />

          {homeHourly.length > 0 && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
              {/* Left/Center Area: Takes up 2 full columns on desktop, full-width on mobile */}
              <div className="lg:col-span-2">
                <HourlyPreview data={homeHourly} />
              </div>

              {/* Right Area: Placed alongside on desktop, stacks perfectly underneath on mobile */}
              <div className="w-full">
                <TemperatureChart data={homeHourly} />
              </div>
            </div>
          )}
          {/* Extended Synoptic Forecast Grid Area */}
          {data.daily && <DailyPreview data={data.daily} />}
        </div>
      </PageWrapper>
    </WeatherThemeWrapper>
  );
}
