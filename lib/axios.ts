import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.NEXT_WEATHER_API_URL,
  headers: {
    Authorization: `Bearer ${env.NEXT_WEATHER_API_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
