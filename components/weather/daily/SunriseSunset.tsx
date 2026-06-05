"use client";

import { Card } from "@/components/ui/Card";

interface Props {
  /** Expects either a clean time string or an ISO timestamp string like "2026-06-05T05:32" */
  sunrise: string;
  sunset: string;
}

// Utility function to format rough API timestamps into high-fidelity user strings
function formatSolarTime(timeStr: string): string {
  if (!timeStr) return "--:--";

  // If it's a full ISO timestamp string, extract just the hours and minutes
  if (timeStr.includes("T")) {
    try {
      const timePart = timeStr.split("T")[1]; // "05:32:00" or "05:32"
      const [hours, minutes] = timePart.split(":");
      const hr = parseInt(hours, 10);
      const ampm = hr >= 12 ? "PM" : "AM";
      const displayHr = hr % 12 === 0 ? 12 : hr % 12;
      return `${displayHr.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr; // Fallback to raw string if processing encounters anomalies
    }
  }
  return timeStr;
}

export function SunriseSunset({ sunrise, sunset }: Props) {
  const formattedSunrise = formatSolarTime(sunrise);
  const formattedSunset = formatSolarTime(sunset);

  return (
    <Card className="flex flex-col border border-[#13223f]/60 bg-[#091225]/40 p-5 backdrop-blur-sm select-none">
      {/* 1. VISUAL UPGRADE: The Dynamic Daytime Solar Progress Tracking Arch */}
      <div className="relative mt-2 mb-6 flex h-16 w-full items-end justify-center overflow-hidden border-b border-[#13223f]/60">
        {/* Dotted Orbit Arch */}
        <div className="absolute bottom-0 h-24 w-[85%] rounded-full border-2 border-dashed border-[#13223f]/80" />
        {/* Active Golden Gradient Arc filling up the day frame progress */}
        <div className="absolute bottom-0 h-24 w-[85%] -rotate-45 rounded-full border-2 border-transparent border-t-amber-400/30 border-l-amber-400/30" />
        {/* Glowing Sun Vector Indicator at Peak Zenith */}
        <div className="absolute bottom-10 left-[48%] h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fdb813]" />
      </div>

      {/* 2. RESPONSIVE GRID CONFIGURATION:
          Stacks cleanly on desktop modules inside card siderails, while spreading into two columns on compact displays.
      */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
        {/* Sunrise Segment Panel Block */}
        <div className="flex flex-col justify-between rounded-xl border border-[#13223f]/30 bg-[#030914]/40 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v8M5.22 10.22l1.42 1.42M18.78 10.22l-1.42 1.42M2 22h20M17 22a5 5 0 0 0-10 0"
                />
              </svg>
            </div>
            <p className="text-[10px] font-extrabold tracking-widest text-[#7c8ba1] uppercase">
              Sunrise
            </p>
          </div>

          <div className="mt-3">
            <h3 className="font-mono text-xl font-black tracking-tight text-white">
              {formattedSunrise}
            </h3>
            <p className="mt-0.5 text-[9px] font-bold tracking-wider text-[#7c8ba1]/40 uppercase">
              First Light Dawn
            </p>
          </div>
        </div>

        {/* Sunset Segment Panel Block */}
        <div className="flex flex-col justify-between rounded-xl border border-[#13223f]/30 bg-[#030914]/40 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6M5.22 10.22l1.42 1.42M18.78 10.22l-1.42 1.42M2 22h20M17 22a5 5 0 0 0-10 0M12 16l-3-3m3 3l3-3"
                />
              </svg>
            </div>
            <p className="text-[10px] font-extrabold tracking-widest text-[#7c8ba1] uppercase">
              Sunset
            </p>
          </div>

          <div className="mt-3">
            <h3 className="font-mono text-xl font-black tracking-tight text-white">
              {formattedSunset}
            </h3>
            <p className="mt-0.5 text-[9px] font-bold tracking-wider text-[#7c8ba1]/40 uppercase">
              Last Light Dusk
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
