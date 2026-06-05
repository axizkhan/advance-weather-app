"use client";

import { useState, useEffect } from "react";

interface Props {
  icon: string;
  alt?: string;
  size?: number;
}

export function WeatherIcon({
  icon,
  alt = "Weather Condition Asset",
  size = 64,
}: Props) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  // Parse and normalize incoming telemetry string coordinates safely
  useEffect(() => {
    if (!icon) {
      setHasError(true);
      return;
    }

    // Ensure protocol absolute boundaries are intact
    const normalizedUrl = icon.startsWith("http") ? icon : `https:${icon}`;
    setImgSrc(normalizedUrl);
    setHasError(false);
  }, [icon]);

  if (hasError) {
    /* High-fidelity fallback asset placeholder if the data stream fails or breaks */
    return (
      <div
        className="flex animate-pulse items-center justify-center rounded-full border border-[#13223f]/60 bg-[#13223f]/30 text-[#7c8ba1]"
        style={{ width: size, height: size }}
      >
        <svg
          className="opacity-60"
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Underlying layout drop shadow ring layer to push icons out from the dark dashboard backdrop */}
      <div className="absolute inset-0 scale-75 rounded-full opacity-20 bg-blend-screen blur-md" />

      <img
        src={imgSrc}
        alt={alt}
        width={size}
        height={size}
        onError={() => setHasError(true)}
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_4px_6px_rgba(3,9,20,0.5)] filter transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
