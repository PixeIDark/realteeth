import { Button } from "@/shared/ui/Button.tsx";
import { Star, StarOff } from "lucide-react";
import type { District } from "@/entities/district/model/type.ts";
import { useFavorites } from "@/entities/favorite";

interface FavoriteButtonProps {
  district: District;
}

function FavoriteButton({ district }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, getFavoriteItem } = useFavorites();
  const favoriteItem = getFavoriteItem(district?.id);

  const handleToggleFavorite = () => {
    if (favoriteItem) {
      removeFavorite(favoriteItem.id);
    } else {
      addFavorite({
        id: district.id,
        fullName: district.fullName,
        lat: district.lat,
        lon: district.lon,
      });
    }
  };

  return (
    <Button variant={favoriteItem ? "outline" : "default"} onClick={handleToggleFavorite} className="w-full sm:w-auto">
      {favoriteItem ? (
        <>
          <StarOff className="mr-2 h-4 w-4" />
          즐겨찾기 해제
        </>
      ) : (
        <>
          <Star className="mr-2 h-4 w-4" />
          즐겨찾기 추가
        </>
      )}
    </Button>
  );
}

export default FavoriteButton;
