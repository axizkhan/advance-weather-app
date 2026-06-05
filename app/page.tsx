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
import { SplashScreen } from "@/components/ui/SplashScreen";

export default function HomePage() {
  // Execute real-time atmospheric telemetry sync loop
  const { isLoading, error, data } = useGeoWeather({
    days: 7,
    ai: false,
    ip: "auto",
  });

  // 1. Initial State: Handle splash view rendering during core telemetry load
  if (isLoading) {
    return <SplashScreen />;
  }

  // 2. Exception State: Handle backend connectivity or API handshake failure safely
  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-6 select-none">
        <div className="w-full max-w-md rounded-xl border border-red-500/30 bg-[#0c0507] p-6 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-sm font-bold tracking-wider text-red-200 uppercase">
            Telemetry Error
          </h2>
          <p className="mt-2 text-xs leading-relaxed font-medium text-red-400/80">
            {error.message ||
              "Failed to establish a handshake with local ground weather stations."}
          </p>
        </div>
      </main>
    );
  }

  // 3. Fallback Empty State: Re-verifies data warmth before committing layout layers to DOM
  if (!data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-6 select-none">
        <div className="w-full max-w-md rounded-xl border border-[#13223f]/60 bg-[#030914]/60 p-6 text-center">
          <p className="text-xs font-bold tracking-widest text-[#7c8ba1] uppercase">
            No Station Data Available
          </p>
        </div>
      </main>
    );
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

          {data.hourly && (
            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2">
                <HourlyPreview data={data.hourly} />
              </div>
              <div className="h-full">
                <TemperatureChart data={data.hourly} />
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
