"use client";

interface Props {
  city: string;
  country: string;
}

export function WeatherLocation({ city, country }: Props) {
  return (
    <div className="flex flex-col gap-1 select-none">
      {/* High-fidelity geographic display array */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Dynamic localized region name */}
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {city}
        </h2>

        {/* Sleek structural separator tag */}
        <span className="mx-0.5 hidden text-lg font-light text-[#7c8ba1]/40 sm:inline">
          /
        </span>

        {/* Country descriptor tag styled as a dashboard utility badge */}
        <span className="inline-flex items-center rounded-md border border-[#13223f]/80 bg-[#13223f]/50 px-2 py-0.5 text-xs font-semibold tracking-wider text-[#7c8ba1] uppercase">
          {country}
        </span>
      </div>

      {/* Real-time sync timeline anchor subtext */}
      <p className="text-[11px] font-medium tracking-wide text-[#7c8ba1]/60">
        Local Station Coordinates
      </p>
    </div>
  );
}
