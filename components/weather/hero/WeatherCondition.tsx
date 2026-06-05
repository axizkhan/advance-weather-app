interface Props {
  condition: string;
}

export function WeatherCondition({ condition }: Props) {
  return <p className="text-xl text-white/70">{condition}</p>;
}
