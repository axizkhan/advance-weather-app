import { Card } from "@/components/ui/Card";

interface Props {
  visibility: number;
}

export function VisibilityCard({ visibility }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        {/* Label styled with high-density uppercase slate typography */}
        <p className="text-[11px] font-bold tracking-[0.08em] text-[#7c8ba1] uppercase">
          Visibility
        </p>

        {/* Metric styled with tight tracking and pure white high-contrast display weights */}
        <h3 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {visibility}
          <span className="ml-1 text-lg font-semibold tracking-normal text-[#7c8ba1]/70">
            km
          </span>
        </h3>
      </div>

      {/* Atmospheric clarity metadata row */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1bf8c3]" />
        <span className="text-[11px] font-medium text-[#7c8ba1]">
          {visibility >= 10 ? "Clear Atmosphere" : "Reduced Clarity"}
        </span>
      </div>
    </Card>
  );
}
