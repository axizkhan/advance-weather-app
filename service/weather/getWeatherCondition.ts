import { ConditionCode, conditionCodes } from "./weatherCodition";

export function getWeatherCondition(code: string) {
  return (
    conditionCodes[code as ConditionCode] ?? {
      label: "Unknown",
      description: "Unknown weather condition",
    }
  );
}
