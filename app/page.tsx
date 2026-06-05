"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WeatherHero } from "@/components/weather/hero/WeatherHero";
import { MetricsGrid } from "@/components/weather/metrics/MetricsGrid";
import { HourlyPreview } from "@/components/weather/hourly/HourlyPreview";
import { DailyPreview } from "@/components/weather/daily/DailyPreview";
import { WeatherThemeWrapper } from "@/components/weather/shared/WeatherThemeWrapper";
import { WeatherBackground } from "@/components/weather/shared/WeatherBackground";
import { useWeatherData } from "@/hooks/weather/useWeatherData";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { CentralizedErrorPage } from "@/components/shared/CentralizedErrorPage";

// Bundle Splitting: Isolate heavy charts from the main UI thread to improve TTI/LCP
const TemperatureChart = dynamic(
  () =>
    import("@/components/weather/charts/TemperatureChart").then(
      (mod) => mod.TemperatureChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full animate-pulse items-center justify-center rounded-xl border border-[#13223f]/60 bg-[#091225]/40 backdrop-blur-md">
        <span className="text-sm text-[#94a3b8]">Loading Chart Engine...</span>
      </div>
    ),
  },
);

export default function HomePage() {
  // Execute real-time atmospheric telemetry sync loop using the master hook
  const { isLoading, error, data } = useWeatherData();

  // Zero-Stutter Render Pipeline: Memoize the heavy array filtering block safely at the top level
  const homeHourly = useMemo(() => {
    if (!data || !data.hourly) return [];

    const currentTime = data.current?.time
      ? new Date(data.current.time).getTime()
      : Date.now();

    const futureHourly =
      data.hourly.filter(
        (hour: any) => new Date(hour.time).getTime() > currentTime,
      ) || [];

    return futureHourly.slice(0, 24);
  }, [data?.hourly, data?.current?.time]);

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
              {/* Added explicit sizing min-h constraint to prevent CLS shift when dynamic component mounts */}
              <div className="min-h-[16rem] w-full">
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
