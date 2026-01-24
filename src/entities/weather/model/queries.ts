import { useSuspenseQuery } from "@tanstack/react-query";
import type { HourlyForecast } from "@/entities/weather";
import { weatherApi } from "@/entities/weather/api/weatherApi.ts";
import { weatherKeys } from "@/entities/weather/model/keys.ts";

export function useCurrentWeather(lat: number, lon: number) {
  return useSuspenseQuery({
    queryKey: weatherKeys.current(lat, lon),
    queryFn: () => weatherApi.getCurrent(lat, lon),
  });
}

export function useForecast(lat: number, lon: number) {
  return useSuspenseQuery({
    queryKey: weatherKeys.forecast(lat, lon),
    queryFn: () => weatherApi.getForecast(lat, lon),
    select: (data) => {
      const today = new Date().toISOString().split("T")[0];
      const todayForecast = data.list.filter((item: HourlyForecast) => item.dt_txt.startsWith(today));
      return todayForecast.length >= 4 ? todayForecast : data.list.slice(0, 8);
    },
  });
}
