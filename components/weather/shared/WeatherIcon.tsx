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

  useEffect(() => {
    if (!icon) {
      setHasError(true);
      return;
    }

    const normalizedUrl = icon.startsWith("http") ? icon : `https:${icon}`;
    setImgSrc(normalizedUrl);
    setHasError(false);
  }, [icon]);

  if (hasError) {
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
      {/* 1. UPGRADED GLOW CORE:
        Swapped out the empty backdrop layer for a vibrant white-blue radial glow ring 
        to add extra pop and separate the icon asset from the dark layout.
      */}
      <div className="pointer-events-none absolute inset-0 scale-90 rounded-full bg-blue-400/10 blur-xl" />

      <img
        src={imgSrc || undefined}
        alt={alt}
        width={size}
        height={size}
        onError={() => setHasError(true)}
        className="/* 2. THE GRAPHIC RESOLUTION MATRIX: - flips dark pixels to bright white. - ensures any muddy grey midtones turn crisp and luminous. */ relative z-10 h-full w-full object-contain brightness-200 brightness-[2] contrast-[1.1] drop-shadow-[0_4px_12px_rgba(27,248,195,0.15)] invert-100 invert-[0.85] filter transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
