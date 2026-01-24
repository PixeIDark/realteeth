import { useCurrentWeather } from "@/entities/weather/model/queries.ts";
import { formatTemp } from "@/entities/weather";
import { formatString } from "@/shared/lib/formater.ts";
import { Cloud } from "lucide-react";

function FavoriteWeatherContent({ lat, lon }: { lat: number; lon: number }) {
  const { data: weather } = useCurrentWeather(lat, lon);

  const temp = formatTemp(weather?.main?.temp);
  const tempMin = formatTemp(weather?.main?.temp_min);
  const tempMax = formatTemp(weather?.main?.temp_max);
  const description = formatString(weather?.weather[0]?.description);

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center gap-2">
        <Cloud className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-xl font-bold sm:text-2xl">{temp}</span>
      </div>
      <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm">
        <span>최저 {tempMin}</span>
        <span>최고 {tempMax}</span>
      </div>
      <p className="text-muted-foreground text-xs capitalize sm:text-sm">{description}</p>
    </div>
  );
}

export default FavoriteWeatherContent;
