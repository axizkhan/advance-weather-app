import { Card } from "@/components/ui/Card";

interface Props {
  humidity: number;
}

export function HumidityCard({ humidity }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        {/* Label styled with the exact high-density uppercase slate typography */}
        <p className="text-[11px] font-bold tracking-[0.08em] text-[#7c8ba1] uppercase">
          Humidity
        </p>

        {/* Metric styled with tight tracking and pure white high-contrast display weights */}
        <h3 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {humidity}
          <span className="text-2xl font-semibold text-[#7c8ba1]/70">%</span>
        </h3>
      </div>

      {/* Subtle indicator element mimicking the low-opacity clean tracking details of the platform */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1bf8c3]" />
        <span className="text-[11px] font-medium text-[#7c8ba1]">
          Live Sensor Data
        </span>
      </div>
    </Card>
  );
}
