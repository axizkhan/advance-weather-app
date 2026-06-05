"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { DailyPreview } from "@/components/weather/daily/DailyPreview";
import { SunriseSunset } from "@/components/weather/daily/SunriseSunset";
import { WeatherThemeWrapper } from "@/components/weather/shared/WeatherThemeWrapper";
import { WeatherBackground } from "@/components/weather/shared/WeatherBackground";
import { CentralizedErrorPage } from "@/components/shared/CentralizedErrorPage";
import { useGeoWeather } from "@/hooks/weather/useGeoWeather";
import { SplashScreen } from "@/components/ui/SplashScreen";

export default function DailyPage() {
  // Synchronize 7-day synoptic forecast metrics
  const { isLoading, error, data } = useGeoWeather({
    days: 7,
    ai: false,
    ip: "auto",
  });

  // 1. Initial State: Handle full-screen splash layout during stream compilation
  if (isLoading) {
    return <SplashScreen />;
  }

  // 2. Exception State: Handle telemetry failures gracefully
  if (error) {
    return <CentralizedErrorPage code="API_TIMEOUT" errorInstance={error} />;
  }

  // 3. Data Check State: Ensure safe array structures are warm before rendering DOM elements
  if (!data || !data.daily) {
    return <CentralizedErrorPage code="NOT_FOUND" />;
  }

  const weatherCode = data.current?.condition?.code;
  const currentDayMetrics = data.daily[0];

  return (
    <WeatherThemeWrapper weatherCode={weatherCode}>
      {/* Underlying layout tech grid matrix */}
      <WeatherBackground />

      <PageWrapper>
        <div className="mx-auto max-w-5xl space-y-6 pb-12 select-none sm:space-y-8">
          {/* Module Geographic Header & Subtext Track */}
          <div className="flex flex-col gap-1.5 border-b border-[#13223f]/30 pb-5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[#1bf8c3]" />
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                7-Day Synoptic Forecast
              </h1>
            </div>
            <p className="ml-3 text-xs font-semibold tracking-wide text-[#7c8ba1]/70 uppercase">
              Extended Climate Trends & Strategic Planning
            </p>
          </div>

          {/* Main Informational Layout Split Grid */}
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {/* Left/Center Matrix Area: Long-Range 7-Day Element Stack */}
            <div className="lg:col-span-2">
              <DailyPreview data={data.daily} />
            </div>

            {/* Right Matrix Area: Real-Time Solar Coordinates */}
            {currentDayMetrics && (
              <div className="h-full">
                <SunriseSunset
                  sunrise={currentDayMetrics.sunrise}
                  sunset={currentDayMetrics.sunset}
                />
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </WeatherThemeWrapper>
  );
}
