"use client";

import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { setLang, setUnit } from "@/store/redux/slices/preferenceSlice";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageWrapper } from "@/components/layout/PageWrapper";

const LANGUAGES = [
  { code: "en", name: "English (US)" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "it", name: "Italian (Italiano)" },
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { units, lang } = useAppSelector((state) => state.preferences);

  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    dispatch(setUnit(newUnit));
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLang(e.target.value));
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-3xl space-y-6 pt-6 pb-12 select-none sm:space-y-8 sm:pt-8">
        {/* Module Geographic Header Block */}
        <div className="flex flex-col gap-1.5 border-b border-[#13223f]/30 pb-5">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-[#1bf8c3]" />
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              System Control Panel
            </h1>
          </div>
          <p className="ml-3 text-xs font-semibold tracking-wide text-[#7c8ba1]/70 uppercase">
            Configure Telemetry Metrology & Localization Constants
          </p>
        </div>

        {/* Master Panel Engine */}
        <GlassCard className="relative overflow-hidden border border-[#13223f]/60 bg-[#091225]/40 p-5 shadow-xl backdrop-blur-md sm:p-8">
          {/* Subtle Ambient Decorative Gradients */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#1bf8c3]/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/5 blur-[120px]" />

          <div className="relative z-10 space-y-8">
            {/* Row 1: Measurement Units Telemetry Matrix */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-bold tracking-[0.06em] text-white uppercase">
                  Metrology Core System
                </h2>
                <p className="max-w-sm text-xs leading-relaxed text-[#7c8ba1]/80">
                  Toggle structural units for temperature indices, wind
                  matrices, and air pressure telemetry scales.
                </p>
              </div>

              {/* High-Density Segmented Controls */}
              <div className="flex w-full rounded-xl border border-[#13223f]/50 bg-[#030914]/60 p-1 md:w-auto">
                <button
                  onClick={() => handleUnitChange("metric")}
                  className={`flex-1 rounded-lg px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 md:flex-none ${
                    units === "metric"
                      ? "border border-[#1bf8c3]/20 bg-[#13223f] text-[#1bf8c3] shadow-md"
                      : "text-[#7c8ba1]/60 hover:text-white"
                  }`}
                >
                  Metric{" "}
                  <span className="pl-1 font-mono opacity-80">°C, km/h</span>
                </button>
                <button
                  onClick={() => handleUnitChange("imperial")}
                  className={`flex-1 rounded-lg px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 md:flex-none ${
                    units === "imperial"
                      ? "border border-[#1bf8c3]/20 bg-[#13223f] text-[#1bf8c3] shadow-md"
                      : "text-[#7c8ba1]/60 hover:text-white"
                  }`}
                >
                  Imperial{" "}
                  <span className="pl-1 font-mono opacity-80">°F, mph</span>
                </button>
              </div>
            </div>

            <hr className="border-[#13223f]/30" />
          </div>
        </GlassCard>
      </div>
    </PageWrapper>
  );
}
