import { useCurrentLocation } from "@/features/get-current-location";
import { HourlyForecastCard, useWeatherDetail, WeatherCard, WeatherLoading } from "@/entities/weather";
import { DistrictSearchBox } from "@/widgets/district-search-box";
import { FavoriteList } from "@/widgets/favorite-list";
import { Card, CardContent } from "@/shared/ui/Card";
import { AlertCircle } from "lucide-react";

function HomePage() {
  const { location } = useCurrentLocation();
  const { currentWeather, forecast, isLoading, isError, error } = useWeatherDetail(location.lat, location.lon, true);

  if (isLoading) {
    return <WeatherLoading />;
  }

  if (isError) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <AlertCircle className="text-destructive h-10 w-10" />
            <p className="text-muted-foreground text-center text-sm">
              에러: {error instanceof Error ? error.message : "알 수 없는 에러"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const weather = currentWeather.data;
  const hourlyForecast = forecast.data ?? [];

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <DistrictSearchBox />
        <WeatherCard
          name={weather?.name || "-"}
          temp={weather?.main?.temp}
          tempMin={weather?.main?.temp_min}
          tempMax={weather?.main?.temp_max}
          description={weather?.weather?.[0]?.description || "정보 없음"}
        />
        <HourlyForecastCard forecast={hourlyForecast} />
        <FavoriteList />
      </div>
    </div>
  );
}

export default HomePage;
