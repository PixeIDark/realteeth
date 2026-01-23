import { useCurrentLocation } from "@/features/get-current-location";
import { HourlyForecastCard, useWeatherDetail, WeatherCard, WeatherLoading } from "@/entities/weather";
import { DistrictSearchBox } from "@/widgets/district-search-box";
import { FavoriteList } from "@/widgets/favorite-list";
import ErrorCard from "@/shared/ui/ErrorCard.tsx";

function HomePage() {
  const { location } = useCurrentLocation();
  const { currentWeather, forecast, isLoading, isError, error } = useWeatherDetail(location.lat, location.lon, true);

  if (isLoading) {
    return <WeatherLoading />;
  }

  if (isError) {
    return <ErrorCard error={error} />;
  }

  const weather = currentWeather.data;
  const hourlyForecast = forecast.data ?? [];

  return (
    <div>
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
  );
}

export default HomePage;
