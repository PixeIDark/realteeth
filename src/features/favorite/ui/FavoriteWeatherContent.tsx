import { useCurrentWeather } from "@/entities/weather/model/queries.ts";
import { Cloud } from "lucide-react";

function FavoriteWeatherContent({ lat, lon }: { lat: number; lon: number }) {
  const { data: weather } = useCurrentWeather(lat, lon);

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center gap-2">
        <Cloud className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-xl font-bold sm:text-2xl">{weather.temp}</span>
      </div>
      <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm">
        <span>최저 {weather.tempMin}</span>
        <span>최고 {weather.tempMax}</span>
      </div>
      <p className="text-muted-foreground text-xs capitalize sm:text-sm">{weather.description}</p>
    </div>
  );
}

export default FavoriteWeatherContent;
