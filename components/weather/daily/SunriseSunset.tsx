"use client";

import { Card } from "@/components/ui/Card";

interface Props {
  sunrise: string;
  sunset: string;
}

export function SunriseSunset({ sunrise, sunset }: Props) {
  return (
    <Card className="grid grid-cols-2 divide-x divide-[#13223f]/50 p-4">
      {/* Left Column: Sunrise Segment */}
      <div className="flex flex-col justify-between pr-4">
        <div>
          <div className="flex items-center gap-1.5">
            {/* Custom Sunrise Micro-Vector Graphic */}
            <svg
              className="h-3.5 w-3.5 text-[#fdb813]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v8M5.22 10.22l1.42 1.42M18.78 10.22l-1.42 1.42M2 22h20M17 22a5 5 0 0 0-10 0" />
            </svg>
            <p className="text-[11px] font-bold tracking-[0.08em] text-[#7c8ba1] uppercase">
              Sunrise
            </p>
          </div>

          <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {sunrise}
          </h3>
        </div>

        <p className="mt-4 text-[10px] font-medium text-[#7c8ba1]/60">
          First Light Dawn
        </p>
      </div>

      {/* Right Column: Sunset Segment */}
      <div className="flex flex-col justify-between pl-4">
        <div>
          <div className="flex items-center gap-1.5">
            {/* Custom Sunset Micro-Vector Graphic */}
            <svg
              className="h-3.5 w-3.5 text-orange-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 10v6M5.22 10.22l1.42 1.42M18.78 10.22l-1.42 1.42M2 22h20M17 22a5 5 0 0 0-10 0M12 16l-3-3m3 3l3-3" />
            </svg>
            <p className="text-[11px] font-bold tracking-[0.08em] text-[#7c8ba1] uppercase">
              Sunset
            </p>
          </div>

          <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {sunset}
          </h3>
        </div>

        <p className="mt-4 text-[10px] font-medium text-[#7c8ba1]/60">
          Last Light Dusk
        </p>
      </div>
    </Card>
  );
}
