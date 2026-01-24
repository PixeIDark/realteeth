import { ENV } from "@/shared/config/env";
import type { CurrentWeatherResponse, ForecastResponse } from "@/entities/weather";

// TODO: 두개 분리하기
export const weatherApi = {
  getCurrent: async (lat: number, lon: number): Promise<CurrentWeatherResponse> => {
    const res = await fetch(
      `${ENV.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
    );
    if (!res.ok) {
      throw new Error(`날씨 정보를 불러오는데 실패했습니다. (status: ${res.status})`);
    }
    return res.json();
  },

  getForecast: async (lat: number, lon: number): Promise<ForecastResponse> => {
    const res = await fetch(
      `${ENV.WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
    );
    if (!res.ok) {
      throw new Error(`예보 정보를 불러오는데 실패했습니다. (status: ${res.status})`);
    }
    return res.json();
  },
};
