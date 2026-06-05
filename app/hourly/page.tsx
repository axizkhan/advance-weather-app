"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HourlyForecast } from "@/components/weather/hourly/HourlyForecast";
import { TemperatureChart } from "@/components/weather/charts/TemperatureChart";
import { RainChart } from "@/components/weather/charts/RainChart";
import { WindChart } from "@/components/weather/charts/WindChart";
import { HumidityChart } from "@/components/weather/charts/HumidityChart";
import { WeatherThemeWrapper } from "@/components/weather/shared/WeatherThemeWrapper";
import { WeatherBackground } from "@/components/weather/shared/WeatherBackground";
import { CentralizedErrorPage } from "@/components/shared/CentralizedErrorPage";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { useWeatherData } from "@/hooks/weather/useWeatherData";

type AnalyticsTab = "temperature" | "precipitation" | "wind" | "humidity";

export default function HourlyPage() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("temperature");

  // Synchronize 24-hour high-density telemetry stream
  const { isLoading, error, data } = useWeatherData();

  // 1. Initial State: Handle full-screen splash layer during layout loading
  if (isLoading) {
    return <SplashScreen />;
  }

  // 2. Exception State: Handle backend connectivity or API anomalies safely
  if (error) {
    return <CentralizedErrorPage code="API_TIMEOUT" errorInstance={error} />;
  }

  // 3. Fallback Check: Verify array structure stability before committing to DOM nodes
  if (!data || !data.hourly) {
    return <CentralizedErrorPage code="NOT_FOUND" />;
  }

  const weatherCode = data.current?.condition?.code;

  // Filter hourly to start from the NEXT hour relative to current time, limited to 24 hours
  const currentTime = data.current?.time
    ? new Date(data.current.time).getTime()
    : Date.now();
  const futureHourly =
    data.hourly?.filter(
      (hour: any) => new Date(hour.time).getTime() > currentTime,
    ) || [];

  return (
    <WeatherThemeWrapper weatherCode={weatherCode}>
      {/* Background layer running underneath layout panels */}
      <WeatherBackground />

      <PageWrapper>
        <div className="mx-auto max-w-5xl space-y-6 pb-12 select-none sm:space-y-8">
          {/* Module Geographic Header Block */}
          <div className="flex flex-col gap-1.5 border-b border-[#13223f]/30 pb-5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[#1bf8c3]" />
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                24-Hour Chronographic Feed
              </h1>
            </div>
            <p className="ml-3 text-xs font-semibold tracking-wide text-[#7c8ba1]/70 uppercase">
              Real-time Atmospheric Timelines & Predictive Data
            </p>
          </div>

          {/* Virtualized Horizontal Timeline Track */}
          <HourlyForecast data={futureHourly} />

          {/* Analytics Engine Panel Suite */}
          <section className="rounded-xl border border-[#13223f]/40 bg-[#091225]/20 p-5 backdrop-blur-sm">
            {/* Tab Controller Bar Interface */}
            <div className="mb-6 flex flex-col gap-4 border-b border-[#13223f]/20 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#1bf8c3]" />
                <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                  Advanced Graphing Core
                </h3>
              </div>

              {/* High-Density Segmented Controls */}
              <div className="flex self-start rounded-lg border border-[#13223f]/40 bg-[#030914]/60 p-1 sm:self-auto">
                {(
                  ["temperature", "precipitation", "wind", "humidity"] as AnalyticsTab[]
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-[#13223f] text-[#1bf8c3] shadow-md"
                        : "text-[#7c8ba1]/70 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Rendering Window based on Active State Vector */}
            <div className="flex min-h-[300px] flex-col justify-center rounded-xl border border-[#13223f]/10 bg-[#030914]/20 p-2 sm:p-4">
              {activeTab === "temperature" && (
                <TemperatureChart data={futureHourly} />
              )}
              {activeTab === "precipitation" && (
                <RainChart data={futureHourly} />
              )}
              {activeTab === "wind" && <WindChart data={futureHourly} />}
              {activeTab === "humidity" && <HumidityChart data={futureHourly} />}
            </div>
          </section>
        </div>
      </PageWrapper>
    </WeatherThemeWrapper>
  );
}
