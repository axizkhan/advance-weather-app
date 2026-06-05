import { DailyForecastCard } from "./DailyForecastCard";

interface Props {
  data: any[];
}

export function DailyPreview({ data }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">7-Day Forecast</h2>
      <div className="space-y-3">
        {data?.slice(0, 7)?.map((item, index) => (
          <DailyForecastCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
