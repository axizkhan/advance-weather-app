"use client";

import { useAppSelector } from "@/store/redux/hooks.js";

export function WeatherBackground() {
  // Optional: You can hook into your global theme preference or weather condition slice if you want to swap modes dynamically later.
  // const currentCondition = useAppSelector((state) => state.weather?.current?.condition?.text?.toLowerCase());

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030914] select-none">
      {/* Prime Base Space Ambient Texture - Deep Midnight Indigo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#070f21] via-[#030914] to-[#01040a]" />

      {/* Layer 1: The Core Upper Radiance Matrix (Upgraded from your original) */}
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_-10%,rgba(27,248,195,0.08),transparent_60%)] [animation-duration:8s]" />

      {/* Layer 2: Secondary Oceanic Atmosphere Shift */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-500/5 mix-blend-screen blur-[120px]" />

      {/* Layer 3: Dynamic Grid Alignment Texture Overlap */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#13223f/15_1px,transparent_1px),linear-gradient(to_bottom,#13223f/15_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(circle at top, white, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at top, white, transparent 75%)",
        }}
      />

      {/* Lighting Accent: Noise or Vignette Edge Crusher */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#01040a/70)]" />
    </div>
  );
}
