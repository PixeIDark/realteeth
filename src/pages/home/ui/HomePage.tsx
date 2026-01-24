import { useCurrentLocation } from "@/features/get-current-location";
import { HourlyForecastCard, WeatherCard } from "@/entities/weather";
import { DistrictSearchBox } from "@/widgets/district-search-box";
import { FavoriteList } from "@/widgets/favorite-list";

function HomePage() {
  const { location } = useCurrentLocation();

  return (
    <div className="mb-6 flex flex-col gap-6 sm:gap-8">
      <DistrictSearchBox />
      <WeatherCard lat={location.lat} lon={location.lon} />
      <HourlyForecastCard lat={location.lat} lon={location.lon} />
      <FavoriteList />
    </div>
  );
}

export default HomePage;
