import type { FavoriteItem } from "@/entities/favorite/model/types.ts";
import { FavoriteCard } from "@/features/favorite";

interface FavoriteGridProps {
  favorites: FavoriteItem[];
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}

function FavoriteGrid({ favorites, onRemove, onUpdateAlias }: FavoriteGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {favorites.map((fav) => (
        <FavoriteCard key={fav.id} favorite={fav} onRemove={onRemove} onUpdateAlias={onUpdateAlias} />
      ))}
    </div>
  );
}

export default FavoriteGrid;
