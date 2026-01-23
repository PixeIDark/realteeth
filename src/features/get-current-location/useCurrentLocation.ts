import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

const DEFAULT_LOCATION: Location = { lat: 37.5665, lon: 126.978 };

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  return { location };
}
