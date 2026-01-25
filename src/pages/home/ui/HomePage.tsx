import { useCurrentLocation } from "@/shared/lib/useCurrentLocation.ts";
import { DistrictSearchBox } from "@/widgets/search-district";
import { FavoriteList } from "@/widgets/favorite";
import CurrentLocationWeather from "@/pages/home/ui/CurrentLocationWeather.tsx";

function HomePage() {
  const { location, isLoading, isPending } = useCurrentLocation();

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <DistrictSearchBox />
      <CurrentLocationWeather location={location} isPending={isPending} isLoading={isLoading} />
      <FavoriteList />
    </div>
  );
}

export default HomePage;
