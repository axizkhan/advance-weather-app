interface Props {
  city: string;
  country: string;
}

export function WeatherLocation({ city, country }: Props) {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{city}</h2>
      <p className="text-white/60">{country}</p>
    </div>
  );
}
