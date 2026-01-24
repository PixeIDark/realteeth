import { useParams } from "react-router";
import { HourlyForecastCard, WeatherCard } from "@/features/weather";
import PlaceNotFound from "@/shared/ui/PlaceNotFound.tsx";
import DetailHeaderActions from "@/pages/detail/ui/DetailHeaderActions.tsx";
import { useDistricts } from "@/entities/district/model/queries.ts";

function DetailPage() {
  const { locationId } = useParams();
  const { data: districts } = useDistricts();
  const district = districts.find((d) => d.id === locationId);

  if (!district) {
    return <PlaceNotFound />;
  }

  return (
    <div className="flex flex-col gap-6">
      <DetailHeaderActions district={district} />
      <WeatherCard lat={district.lat} lon={district.lon} />
      <HourlyForecastCard lat={district.lat} lon={district.lon} />
    </div>
  );
}

export default DetailPage;
