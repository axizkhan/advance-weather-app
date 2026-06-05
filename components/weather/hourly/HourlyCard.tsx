import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "../shared/WeatherIcon";

interface Props {
  item: any;
}

export function HourlyCard({ item }: Props) {
  return (
    <Card className="min-w-[110px] text-center">
      <p className="text-sm">{new Date(item.time).getHours()}:00</p>
      <div className="flex justify-center">
        <WeatherIcon icon={item.icon} size={48} />
      </div>
      <p className="text-2xl font-bold">{item.temp}°</p>
    </Card>
  );
}
