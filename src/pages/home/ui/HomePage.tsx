import { useCurrentLocation } from "@/features/get-current-location";
import { HourlyForecastCard, useWeatherDetail, WeatherCard, WeatherLoading } from "@/entities/weather";
import { formatTemp } from "@/entities/weather/lib/formatWeather.ts";
import { DistrictSearchBox } from "@/widgets/district-search-box";
import { FavoriteList } from "@/widgets/favorite-list";
import ErrorCard from "@/shared/ui/ErrorCard.tsx";
import { formatString } from "@/shared/lib/formater.ts";

// 에러처리 서스펜스로 페이지 감싸서 하고, useSuspenseQuery 활용해서 데이터 정합성 보장해보자
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

  const name = formatString(weather?.name, "-");
  const temp = formatTemp(weather?.main?.temp);
  const tempMin = formatTemp(weather?.main?.temp_min);
  const tempMax = formatTemp(weather?.main?.temp_max);
  const description = formatString(weather?.weather?.[0]?.description, "정보 없음");

  return (
    <div className="mb-6 flex flex-col gap-6 sm:gap-8">
      <DistrictSearchBox />
      <WeatherCard name={name} temp={temp} tempMin={tempMin} tempMax={tempMax} description={description} />
      <HourlyForecastCard forecast={hourlyForecast} />
      <FavoriteList />
    </div>
  );
}

export default HomePage;
