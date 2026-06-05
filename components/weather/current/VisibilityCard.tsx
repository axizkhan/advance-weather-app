import { Card } from "@/components/ui/Card";

interface Props {
  visibility: number;
}

export function VisibilityCard({ visibility }: Props) {
  return (
    <Card>
      <p className="text-white/60">Visibility</p>
      <h3 className="mt-2 text-3xl font-bold">{visibility} km</h3>
    </Card>
  );
}
