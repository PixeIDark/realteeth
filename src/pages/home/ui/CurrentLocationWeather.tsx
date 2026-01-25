import LocationPermissionPrompt from "@/shared/ui/LocationPermissionPrompt.tsx";
import { PageLoader } from "@/shared/ui/PageLoader.tsx";
import { HourlyForecastCard, WeatherCard } from "@/features/weather";

interface CurrentLocationWeatherProps {
  location: { lat: number; lon: number };
  isPending: boolean;
  isLoading: boolean;
}

function CurrentLocationWeather({ location, isPending, isLoading }: CurrentLocationWeatherProps) {
  if (isPending) {
    return <LocationPermissionPrompt />;
  }

  if (isLoading) {
    return <PageLoader message="현재 위치 탐색중..." />;
  }

  return (
    <>
      <WeatherCard lat={location.lat} lon={location.lon} />
      <HourlyForecastCard lat={location.lat} lon={location.lon} />
    </>
  );
}

export default CurrentLocationWeather;
