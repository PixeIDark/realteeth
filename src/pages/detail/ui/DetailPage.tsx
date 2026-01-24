import { useNavigate, useParams } from "react-router";
import { districts } from "@/shared/data/koreaDistricts";
import { useFavorites } from "@/features/favorite";
import { Button } from "@/shared/ui/Button.tsx";
import { ArrowLeft, Star, StarOff } from "lucide-react";
import { HourlyForecastCard, WeatherCard } from "@/features/weather";
import PlaceNotFound from "@/shared/ui/PlaceNotFound.tsx";

function DetailPage() {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();

  const district = districts.find((d) => d.id === locationId);
  const favoriteItem = favorites.find((f) => f.districtId === locationId);
  const isCurrentFavorite = isFavorite(locationId || "");

  const handleToggleFavorite = () => {
    if (!district) return;

    if (isCurrentFavorite && favoriteItem) {
      removeFavorite(favoriteItem.id);
    } else {
      addFavorite({
        id: district.id,
        fullName: district.fullName,
        lat: district.lat,
        lon: district.lon,
      });
    }
  };

  if (!district) {
    return <PlaceNotFound />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뒤로가기
        </Button>

        <Button
          variant={isCurrentFavorite ? "outline" : "default"}
          onClick={handleToggleFavorite}
          className="w-full sm:w-auto"
        >
          {isCurrentFavorite ? (
            <>
              <StarOff className="mr-2 h-4 w-4" />
              즐겨찾기 해제
            </>
          ) : (
            <>
              <Star className="mr-2 h-4 w-4" />
              즐겨찾기 추가
            </>
          )}
        </Button>
      </div>

      <WeatherCard lat={district.lat} lon={district.lon} />
      <HourlyForecastCard lat={district.lat} lon={district.lon} />
    </div>
  );
}

export default DetailPage;
