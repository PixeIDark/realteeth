import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { FavoriteItem } from "@/entities/favorite";
import { favoriteKeys } from "@/entities/favorite/model/keys.ts";

const MAX_COUNT = 6;
const STORAGE_KEY = "weather-favorites";

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useSuspenseQuery({
    queryKey: favoriteKeys.all,
    queryFn: () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      return (stored ? JSON.parse(stored) : []) as FavoriteItem[];
    },
  });

  const addFavorite = useMutation({
    mutationFn: async (district: { id: string; fullName: string; lat: number; lon: number }) => {
      const current = [...favorites];

      if (current.length >= MAX_COUNT) {
        alert(`즐겨찾기는 최대 ${MAX_COUNT}개까지만 가능합니다.`);
        return;
      }

      if (current.some((f) => f.districtId === district.id)) {
        alert("이미 추가된 장소입니다.");
        return;
      }

      const next = [
        ...current,
        {
          id: crypto.randomUUID(),
          districtId: district.id,
          alias: district.fullName,
          lat: district.lat,
          lon: district.lon,
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: favoriteKeys.all }),
  });

  const removeFavorite = useMutation({
    mutationFn: async (id: string) => {
      const next = favorites.filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: favoriteKeys.all }),
  });

  const updateAlias = useMutation({
    mutationFn: async ({ id, alias }: { id: string; alias: string }) => {
      const next = favorites.map((f) => (f.id === id ? { ...f, alias } : f));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: favoriteKeys.all }),
  });

  return {
    favorites,
    addFavorite: addFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    updateAlias: updateAlias.mutate,
    getFavoriteItem: (distId?: string) => favorites.find((f) => f.districtId === distId),
    isPending: addFavorite.isPending || removeFavorite.isPending || updateAlias.isPending,
  };
}
