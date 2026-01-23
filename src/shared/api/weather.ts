import { ENV } from "../config/env";

export async function fetchCurrentWeather(lat: number, lon: number) {
  const response = await fetch(
    `${ENV.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

export async function fetchHourlyForecast(lat: number, lon: number) {
  const response = await fetch(
    `${ENV.WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}
