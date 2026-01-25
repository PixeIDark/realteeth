import { Button } from "@/shared/ui/Button.tsx";
import { Star, StarOff } from "lucide-react";
import type { District } from "@/entities/district/model/type.ts";
import { useFavorites } from "@/entities/favorite";
import type { ComponentProps } from "react";

interface FavoriteButtonProps extends ComponentProps<typeof Button> {
  district: District;
  showLabel?: boolean;
}

function FavoriteButton({ district, showLabel = true, ...props }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, getFavoriteItem } = useFavorites();
  const favoriteItem = getFavoriteItem(district?.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const Icon = favoriteItem ? StarOff : Star;
  const label = favoriteItem ? "즐겨찾기 해제" : "즐겨찾기 추가";

  return (
    <Button variant={favoriteItem ? "outline" : "default"} onClick={handleToggleFavorite} {...props}>
      <Icon className={showLabel ? "mr-2 h-4 w-4" : "h-4 w-4"} />
      {showLabel && <span>{label}</span>}
    </Button>
  );
}

export default FavoriteButton;
