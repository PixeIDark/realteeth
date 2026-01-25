import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

const DEFAULT_LOCATION: Location = { lat: 37.5665, lon: 126.978 };
const hasGeolocation = typeof navigator !== "undefined" && !!navigator.geolocation;
const initialLocation = hasGeolocation ? null : DEFAULT_LOCATION;

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(initialLocation);
  const [isLoading, setIsLoading] = useState(hasGeolocation);

  useEffect(() => {
    if (!hasGeolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        console.warn("위치 획득 실패, 기본값 사용:", error.message);
        setLocation(DEFAULT_LOCATION);
        setIsLoading(false);
      }
    );
  }, []);

  return { location: location as Location, isLoading };
}
