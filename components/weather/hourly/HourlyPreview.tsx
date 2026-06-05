import { HourlyCard } from "./HourlyCard";

interface Props {
  data: any[];
}

export function HourlyPreview({ data }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Hourly Forecast</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {data?.slice(0, 12)?.map((item, index) => (
          <HourlyCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
