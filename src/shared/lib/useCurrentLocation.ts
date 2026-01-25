import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

type LocationStatus = "idle" | "pending" | "loading" | "success";

const DEFAULT_LOCATION: Location = { lat: 37.5665, lon: 126.978 };
const hasGeolocation = typeof navigator !== "undefined" && !!navigator.geolocation;

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(hasGeolocation ? null : DEFAULT_LOCATION);
  const [status, setStatus] = useState<LocationStatus>(hasGeolocation ? "idle" : "success");

  useEffect(() => {
    if (!hasGeolocation) return;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      const isPrompt = result.state === "prompt";
      setStatus(isPrompt ? "pending" : "loading");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setStatus("success");
        },
        (error) => {
          console.warn("위치 획득 실패, 기본값 사용:", error.message);
          setLocation(DEFAULT_LOCATION);
          setStatus("success");
        }
      );
    });
  }, []);

  return {
    location: location as Location,
    isPending: status === "pending",
    isLoading: status === "idle" || status === "loading",
  };
}
