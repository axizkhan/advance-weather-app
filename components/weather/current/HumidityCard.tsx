import { Card } from "@/components/ui/Card";

interface Props {
  humidity: number;
}

export function HumidityCard({ humidity }: Props) {
  return (
    <Card>
      <p className="text-white/60">Humidity</p>
      <h3 className="mt-2 text-3xl font-bold">{humidity}%</h3>
    </Card>
  );
}
