import { HourlyForecastCard, WeatherCard } from "@/features/weather";
import { useCurrentLocation } from "@/shared/lib/useCurrentLocation.ts";
import { DistrictSearchBox } from "@/widgets/search-district";
import { FavoriteList } from "@/widgets/favorite";

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
