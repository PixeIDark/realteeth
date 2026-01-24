import { useCurrentLocation } from "@/features/get-current-location";
import { HourlyForecastCard, useWeatherDetail, WeatherCard } from "@/entities/weather";
import { formatTemp } from "@/entities/weather/lib/formatWeather.ts";
import { DistrictSearchBox } from "@/widgets/district-search-box";
import { FavoriteList } from "@/widgets/favorite-list";
import { formatString } from "@/shared/lib/formater.ts";

function HomePage() {
  const { location } = useCurrentLocation();
  const { currentWeather, forecast } = useWeatherDetail(location.lat, location.lon);

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
