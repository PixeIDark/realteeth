import { useNavigate, useParams } from "react-router";
import { districts } from "@/shared/data/koreaDistricts";
import { useFavorites } from "@/features/favorite";
import { HourlyForecastCard, useWeatherDetail, WeatherCard, WeatherLoading } from "@/entities/weather";
import { formatTemp } from "@/entities/weather/lib/formatWeather.ts";
import { formatString } from "@/shared/lib/formater.ts";
import { Card, CardContent } from "@/shared/ui/Card.tsx";
import { Button } from "@/shared/ui/Button.tsx";
import { AlertCircle, ArrowLeft, Star, StarOff } from "lucide-react";
import ErrorCard from "@/shared/ui/ErrorCard.tsx";

function DetailPage() {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();

  const district = districts.find((d) => d.id === locationId);
  const favoriteItem = favorites.find((f) => f.districtId === locationId);
  const isCurrentFavorite = isFavorite(locationId || "");

  const { currentWeather, forecast, isLoading, isError, error } = useWeatherDetail(
    district?.lat ?? 0,
    district?.lon ?? 0,
    !!district
  );

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
      <div className="bg-background flex min-h-screen items-center justify-center px-4">
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

  if (isLoading) {
    return <WeatherLoading />;
  }

  if (isError) {
    return <ErrorCard error={error} />;
  }

  const weather = currentWeather.data;
  const hourlyForecast = forecast.data ?? [];

  const name = formatString(weather?.name, "-");
  const temp = formatTemp(weather?.main?.temp);
  const tempMin = formatTemp(weather?.main?.temp_min);
  const tempMax = formatTemp(weather?.main?.temp_max);
  const description = formatString(weather?.weather?.[0]?.description, "정보 없음");

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
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

      <WeatherCard name={name} temp={temp} tempMin={tempMin} tempMax={tempMax} description={description} />
      <HourlyForecastCard forecast={hourlyForecast} />
    </div>
  );
}

export default DetailPage;
