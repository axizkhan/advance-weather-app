interface Props {
  value: number;
}

export function FeelsLike({ value }: Props) {
  return <p className="text-white/70">Feels like {value}°</p>;
}
