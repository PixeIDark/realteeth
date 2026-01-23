import { useQuery } from "@tanstack/react-query";
import type { HourlyForecast } from "@/entities/weather";
import { weatherApi } from "@/entities/weather/api/weatherApi.ts";

export const weatherKeys = {
  all: ["weather"] as const,
  current: (lat: number, lon: number) => [...weatherKeys.all, "current", lat, lon] as const,
  forecast: (lat: number, lon: number) => [...weatherKeys.all, "forecast", lat, lon] as const,
};

export const useCurrentWeather = (lat: number, lon: number, enabled = true) => {
  return useQuery({
    queryKey: weatherKeys.current(lat, lon),
    queryFn: () => weatherApi.getCurrent(lat, lon),
    enabled,
  });
};

export const useForecast = (lat: number, lon: number, enabled = true) => {
  return useQuery({
    queryKey: weatherKeys.forecast(lat, lon),
    queryFn: () => weatherApi.getForecast(lat, lon),
    enabled,
    select: (data) => {
      const today = new Date().toISOString().split("T")[0];
      const todayForecast = data.list.filter((item: HourlyForecast) => item.dt_txt.startsWith(today));
      return todayForecast.length >= 4 ? todayForecast : data.list.slice(0, 8);
    },
  });
};

export const useWeatherDetail = (lat: number, lon: number, enabled = true) => {
  const currentWeather = useCurrentWeather(lat, lon, enabled);
  const forecast = useForecast(lat, lon, enabled);

  return {
    currentWeather,
    forecast,
    isLoading: currentWeather.isLoading || forecast.isLoading,
    isError: currentWeather.isError || forecast.isError,
    error: currentWeather.error || forecast.error,
  };
};
