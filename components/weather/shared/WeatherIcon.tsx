interface Props {
  icon: string;
  alt?: string;
  size?: number;
}

export function WeatherIcon({ icon, alt, size = 64 }: Props) {
  return <img src={`https:${icon}`} alt={alt} width={size} height={size} />;
}
