"use client";

import { useMemo, useEffect, useState } from "react";
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

const TemperatureChart = dynamic(
  () =>
    import("@/components/weather/charts/TemperatureChart").then(
      (mod) => mod.TemperatureChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full animate-pulse items-center justify-center rounded-xl border border-[#13223f]/60 bg-[#091225]/40 backdrop-blur-md">
        <span className="text-sm text-[#94a3b8]">Loading...</span>
      </div>
    ),
  },
);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isLoading, error, data } = useWeatherData();

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

  if (!mounted || isLoading) {
    return <SplashScreen />;
  }

  if (isLoading && !data) {
    return <SplashScreen />;
  }

  if (error && (!data || !data.hourly)) {
    return <CentralizedErrorPage code="OFFLINE" errorInstance={error} />;
  }

  if (!data || !data.hourly) {
    return <CentralizedErrorPage code="NOT_FOUND" />;
  }

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
              <div className="lg:col-span-2">
                <HourlyPreview data={homeHourly} />
              </div>

              <div className="min-h-[16rem] w-full">
                <TemperatureChart data={homeHourly} />
              </div>
            </div>
          )}
          {data.daily && <DailyPreview data={data.daily} />}
        </div>
      </PageWrapper>
    </WeatherThemeWrapper>
  );
}
