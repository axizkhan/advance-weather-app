"use client";

import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { setLang, setUnit } from "@/store/redux/slices/preferenceSlice";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageWrapper } from "@/components/layout/PageWrapper";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
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
      <div className="mx-auto max-w-3xl space-y-8 pt-8 pb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Settings
          </h1>
          <p className="mt-2 text-[#94a3b8]">
            Customize your weather experience
          </p>
        </div>

        <GlassCard className="border border-[#13223f]/60 bg-[#091225]/40 p-6 md:p-8">
          <div className="space-y-8">
            {/* Units Setting */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Measurement Units
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => handleUnitChange("metric")}
                  className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                    units === "metric"
                      ? "bg-blue-500 text-white"
                      : "bg-[#13223f] text-[#94a3b8] hover:bg-[#1a2d4f] hover:text-white"
                  }`}
                >
                  Metric (°C, km/h)
                </button>
                <button
                  onClick={() => handleUnitChange("imperial")}
                  className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                    units === "imperial"
                      ? "bg-blue-500 text-white"
                      : "bg-[#13223f] text-[#94a3b8] hover:bg-[#1a2d4f] hover:text-white"
                  }`}
                >
                  Imperial (°F, mph)
                </button>
              </div>
            </div>

            <hr className="border-[#13223f]/60" />
          </div>
        </GlassCard>
      </div>
    </PageWrapper>
  );
}
