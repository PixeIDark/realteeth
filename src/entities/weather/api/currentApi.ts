import type { CurrentWeatherResponse } from "@/entities/weather";
import { ENV } from "@/shared/config/env.ts";

export const getCurrent = async (lat: number, lon: number): Promise<CurrentWeatherResponse> => {
  const res = await fetch(
    `${ENV.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
  );
  if (!res.ok) {
    throw new Error(`날씨 정보를 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.json();
};
