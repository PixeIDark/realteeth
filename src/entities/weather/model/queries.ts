import { useQuery } from "@tanstack/react-query";
import type { HourlyForecast } from "@/entities/weather";
import { weatherApi } from "@/entities/weather/api/weatherApi.ts";
import { weatherKeys } from "@/entities/weather/model/keys.ts";

export function useCurrentWeather(lat: number, lon: number, enabled = true) {
  return useQuery({
    queryKey: weatherKeys.current(lat, lon),
    queryFn: () => weatherApi.getCurrent(lat, lon),
    enabled,
  });
}

export function useForecast(lat: number, lon: number, enabled = true) {
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
}
