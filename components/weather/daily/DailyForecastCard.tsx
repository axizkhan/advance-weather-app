import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "../shared/WeatherIcon";

interface Props {
  item: any;
}

export function DailyForecastCard({ item }: Props) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="font-medium">
          {new Date(item.date).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </p>
        <p className="text-white/60">{item.condition}</p>
      </div>
      <div className="flex items-center gap-4">
        <WeatherIcon icon={item.icon} size={52} />
        <div className="text-right">
          <p className="font-bold">{item.maxTemp}°</p>
          <p className="text-white/60">{item.minTemp}°</p>
        </div>
      </div>
    </Card>
  );
}
