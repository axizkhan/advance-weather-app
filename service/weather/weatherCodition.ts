export const conditionCodes = {
  "0": {
    label: "Clear Sky",
    description: "Clear weather",
    themeCode: "sunny",
  },

  "1": {
    label: "Mainly Clear",
    description: "Mostly sunny / mainly clear",
    themeCode: "sunny",
  },

  "2": {
    label: "Partly Cloudy",
    description: "Partly cloudy skies",
    themeCode: "cloudy",
  },

  "3": {
    label: "Overcast",
    description: "Cloudy / overcast skies",
    themeCode: "cloudy",
  },

  // Drizzle
  "51": {
    label: "Light Drizzle",
    description: "Light drizzle",
    themeCode: "drizzle",
  },

  "53": {
    label: "Moderate Drizzle",
    description: "Moderate drizzle",
    themeCode: "drizzle",
  },

  "55": {
    label: "Dense Drizzle",
    description: "Dense drizzle",
    themeCode: "rain",
  },

  // Rain
  "61": {
    label: "Light Rain",
    description: "Light rain",
    themeCode: "rain",
  },

  "63": {
    label: "Moderate Rain",
    description: "Moderate rain",
    themeCode: "rain",
  },

  "65": {
    label: "Heavy Rain",
    description: "Heavy rain",
    themeCode: "storm",
  },

  // Rain Showers
  "80": {
    label: "Light Rain Showers",
    description: "Light rain showers",
    themeCode: "rain",
  },

  "81": {
    label: "Moderate Rain Showers",
    description: "Moderate rain showers",
    themeCode: "rain",
  },

  "82": {
    label: "Violent Rain Showers",
    description: "Heavy rain showers",
    themeCode: "storm",
  },
} as const;

export type ConditionCode = keyof typeof conditionCodes;
