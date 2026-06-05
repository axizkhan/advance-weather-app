interface Props {
  temperature: number;
}

export function CurrentTemperature({ temperature }: Props) {
  return (
    <div>
      <h1 className="text-7xl font-bold md:text-8xl">{temperature}°</h1>
    </div>
  );
}
