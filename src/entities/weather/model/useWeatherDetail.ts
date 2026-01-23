import { useCurrentWeather, useForecast } from "@/entities/weather/model/queries.ts";

export function useWeatherDetail(lat: number, lon: number, enabled = true) {
  const currentWeather = useCurrentWeather(lat, lon, enabled);
  const forecast = useForecast(lat, lon, enabled);

  return {
    currentWeather,
    forecast,
    isLoading: currentWeather.isLoading || forecast.isLoading,
    isError: currentWeather.isError || forecast.isError,
    error: currentWeather.error || forecast.error,
  };
}
