import { useNavigate, useParams } from "react-router";
import { districts } from "@/shared/data/koreaDistricts";
import { useFavorites } from "@/features/favorite";
import { HourlyForecastCard, WeatherCard } from "@/entities/weather";
import { Card, CardContent } from "@/shared/ui/Card.tsx";
import { Button } from "@/shared/ui/Button.tsx";
import { AlertCircle, ArrowLeft, Star, StarOff } from "lucide-react";

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
    return (
      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="text-destructive h-10 w-10" />
            <p className="text-muted-foreground text-center text-sm">해당 장소의 정보가 제공되지 않습니다.</p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              뒤로가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
