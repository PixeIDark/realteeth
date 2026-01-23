import { useNavigate } from "react-router";
import { LINKS } from "@/app/routes/route.ts";
import type { FavoriteItem } from "@/entities/favorite";
import { useCurrentWeather } from "@/entities/weather/model/queries.ts";
import FavoriteCard from "@/entities/favorite/ui/FavoriteCard.tsx";

function FavoriteCardWithWeather({
                                   favorite,
                                   onRemove,
                                   onUpdateAlias,
                                 }: {
  favorite: FavoriteItem;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useCurrentWeather(favorite.lat, favorite.lon);

  const weatherData = weather
    ? {
      temp: weather.main?.temp,
      tempMin: weather.main?.temp_min,
      tempMax: weather.main?.temp_max,
      description: weather.weather?.[0]?.description,
    }
    : null;

  return <FavoriteCard
    favorite={favorite}
  weather={weatherData}
  isWeatherLoading={isLoading}
  onRemove={onRemove}
  onUpdateAlias={onUpdateAlias}
  onClick={() => navigate(LINKS.DETAIL(favorite.districtId))}
  />

}

export default FavoriteCardWithWeather;
