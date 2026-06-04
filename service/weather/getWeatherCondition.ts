import { ConditionCode, conditionCodes } from "./weatherCodition";

export function getCondition(code: string) {
  return (
    conditionCodes[code as ConditionCode] ?? {
      label: "Unknown",
      description: "Unknown weather condition",
    }
  );
}
