import { Card } from "@/components/ui/Card";

interface Props {
  uv: number;
}

export function UVCard({ uv }: Props) {
  return (
    <Card>
      <p className="text-white/60">UV Index</p>
      <h3 className="mt-2 text-3xl font-bold">{uv}</h3>
    </Card>
  );
}
