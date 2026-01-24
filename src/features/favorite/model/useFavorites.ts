import { useEffect, useState } from "react";
import type { FavoriteItem } from "@/entities/favorite";

const STORAGE_KEY = "weather-favorites";
const MAX_FAVORITES = 6;

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (district: { id: string; fullName: string; lat: number; lon: number }) => {
    if (favorites.length >= MAX_FAVORITES) {
      alert("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
      return false;
    }
    if (favorites.some((f) => f.districtId === district.id)) {
      alert("이미 추가된 장소입니다.");
      return false;
    }

    setFavorites((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        districtId: district.id,
        alias: district.fullName,
        lat: district.lat,
        lon: district.lon,
      },
    ]);
    return true;
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const updateAlias = (id: string, alias: string) => {
    setFavorites((prev) => prev.map((f) => (f.id === id ? { ...f, alias } : f)));
  };

  const getFavoriteItem = (districtId: string | undefined) => {
    if (!districtId) return undefined;
    return favorites.find((f) => f.districtId === districtId);
  };

  return { favorites, addFavorite, removeFavorite, updateAlias, getFavoriteItem };
}
