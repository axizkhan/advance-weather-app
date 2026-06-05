import { Card } from "@/components/ui/Card";

interface Props {
  speed: number;
}

export function WindCard({ speed }: Props) {
  return (
    <Card>
      <p className="text-white/60">Wind Speed</p>
      <h3 className="mt-2 text-3xl font-bold">{speed} kph</h3>
    </Card>
  );
}
