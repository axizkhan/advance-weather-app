"use client";

import { RainAnimation } from "@/components/animations/RainAnimation";
import { SunnyAnimation } from "@/components/animations/SunnyAnimation";
import { CloudsAnimation } from "@/components/animations/CloudsAnimation";
import { ThunderstormAnimation } from "@/components/animations/ThunderstormAnimation";
import { SnowAnimation } from "@/components/animations/SnowAnimation";

interface Props {
  weatherType: string;
}

export function WeatherAnimation({ weatherType }: Props) {
  switch (weatherType) {
    case "sunny":
      return <SunnyAnimation />;
    case "cloudy":
      return <CloudsAnimation />;
    case "rain":
      return <RainAnimation />;
    case "storm":
      return (
        <>
          <RainAnimation />
          <ThunderstormAnimation />
        </>
      );
    case "snow":
      return <SnowAnimation />;
    default:
      return null;
  }
}
