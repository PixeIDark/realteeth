import { useQuery } from "@tanstack/react-query";
import type { HourlyForecast } from "@/entities/weather";
import { weatherKeys } from "@/entities/weather/model/keys.ts";
import { formatTemp } from "@/entities/weather/lib/formatWeather.ts";
import { formatShortDate, formatString, formatTime } from "@/shared/lib/formater.ts";
import { getCurrent } from "@/entities/weather/api/currentApi.ts";
import { getForecast } from "@/entities/weather/api/forecastApi.ts";

export function useCurrentWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: weatherKeys.current(lat, lon),
    queryFn: () => getCurrent(lat, lon),
    select: (data) => ({
      name: formatString(data.name, "-"),
      temp: formatTemp(data.main?.temp),
      tempMin: formatTemp(data.main?.temp_min),
      tempMax: formatTemp(data.main?.temp_max),
      description: formatString(data.weather?.[0]?.description, "정보 없음"),
    }),
  });
}

export function useForecast(lat: number, lon: number) {
  return useQuery({
    queryKey: weatherKeys.forecast(lat, lon),
    queryFn: () => getForecast(lat, lon),
    select: (data) => {
      const today = new Date().toISOString().split("T")[0];
      const filtered = data.list.filter((item: HourlyForecast) => item.dt_txt.startsWith(today));
      const forecasts = filtered.length >= 4 ? filtered : data.list.slice(0, 8);

      return forecasts.map((item: HourlyForecast) => ({
        id: item.dt,
        date: formatShortDate(item.dt_txt),
        time: formatTime(item.dt_txt),
        temp: formatTemp(item.main.temp),
        description: formatString(item.weather[0]?.description, ""),
      }));
    },
  });
}
