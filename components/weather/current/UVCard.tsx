import { Card } from "@/components/ui/Card";

interface Props {
  uv: number;
}

export function UVCard({ uv }: Props) {
  // Helper to determine threat tier styling based on standard UV metrics
  const getUvStatus = (value: number) => {
    if (value <= 2) return { text: "Low Risk", color: "bg-[#1bf8c3]" }; // Electric Mint
    if (value <= 5) return { text: "Moderate", color: "bg-[#fdb813]" }; // Solar Amber
    if (value <= 7) return { text: "High Risk", color: "bg-orange-500" };
    return { text: "Very High", color: "bg-red-500" };
  };

  const status = getUvStatus(uv);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        {/* Label styled with high-density uppercase slate typography */}
        <p className="text-[11px] font-bold tracking-[0.08em] text-[#7c8ba1] uppercase">
          UV Index
        </p>

        {/* Metric styled with tight tracking and pure white display weights */}
        <h3 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {uv}
        </h3>
      </div>

      {/* Dynamic risk assessment indicator row */}
      <div className="mt-4 flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${status.color} transition-colors duration-300`}
        />
        <span className="text-[11px] font-medium text-[#7c8ba1]">
          {status.text}
        </span>
      </div>
    </Card>
  );
}
