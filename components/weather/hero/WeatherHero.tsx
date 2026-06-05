import { GlassCard } from "@/components/ui/GlassCard";
import { CurrentTemperature } from "./CurrentTemperature";
import { WeatherCondition } from "./WeatherCondition";
import { WeatherLocation } from "./WeatherLocation";
import { FeelsLike } from "./FeelsLike";
import { WeatherIcon } from "../shared/WeatherIcon";

interface Props {
  data: any;
}

export function WeatherHero({ data }: Props) {
  return (
    <GlassCard className="relative overflow-hidden p-8 md:p-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="space-y-4">
          <WeatherLocation city={data.location.name} country={data.location.country} />
          <CurrentTemperature temperature={data.current.temperature} />
          <WeatherCondition condition={data.current.condition.text} />
          <FeelsLike value={data.current.feelsLike} />
        </div>
        <WeatherIcon
          icon={data.current.condition.icon}
          alt={data.current.condition.text}
          size={140}
        />
      </div>
    </GlassCard>
  );
}
