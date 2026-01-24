import { useCurrentWeather, useForecast } from "@/entities/weather/model/queries.ts";

export function useWeatherDetail(lat: number, lon: number) {
  const currentWeather = useCurrentWeather(lat, lon);
  const forecast = useForecast(lat, lon);

  return {
    currentWeather,
    forecast,
    isLoading: currentWeather.isLoading || forecast.isLoading,
    isError: currentWeather.isError || forecast.isError,
    error: currentWeather.error || forecast.error,
  };
}
