import * as z from "zod";

const envSchema = z.object({
  NEXT_WEATHER_API_KEY: z.string(),
  NEXT_WEATHER_API_URL: z.string(),
});

export const env = envSchema.parse({
  NEXT_WEATHER_API_KEY: process.env.NEXT_WEATHER_API_KEY,
  NEXT_WEATHER_API_URL: process.env.NEXT_WEATHER_API_URL,
});
