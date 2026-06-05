import { HumidityCard } from "../current/HumidityCard";
import { WindCard } from "../current/WindCard";
import { UVCard } from "../current/UVCard";
import { VisibilityCard } from "../current/VisibilityCard";

interface Props {
  data: any;
}

export function MetricsGrid({ data }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <HumidityCard humidity={data.current.humidity} />
      <WindCard speed={data.current.windSpeed} />
      <UVCard uv={data.current.uv} />
      <VisibilityCard visibility={data.current.visibility} />
    </div>
  );
}
