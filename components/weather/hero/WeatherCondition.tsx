"use client";

interface Props {
  condition: string;
}

export function WeatherCondition({ condition }: Props) {
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1bf8c3] opacity-40" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1bf8c3]" />
      </span>

      <p className="text-sm font-bold tracking-[0.04em] text-white/90 antialiased md:text-base">
        {condition}
      </p>
    </div>
  );
}
