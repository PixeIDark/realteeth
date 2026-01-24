import { ENV } from "@/shared/config/env.ts";
import type { ForecastResponse } from "@/entities/weather";

export const getForecast = async (lat: number, lon: number): Promise<ForecastResponse> => {
  const res = await fetch(
    `${ENV.WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
  );
  if (!res.ok) {
    throw new Error(`예보 정보를 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.json();
};
