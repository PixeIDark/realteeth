import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

interface UseCurrentLocationReturn {
  location: Location | null;
  errorMessage: string | null;
  isLoading: boolean;
}

export function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<Location | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      queueMicrotask(() => {
        setErrorMessage("브라우저가 위치 정보를 지원하지 않습니다.");
        setIsLoading(false);
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    );
  }, []);

  return { location, errorMessage, isLoading };
}
