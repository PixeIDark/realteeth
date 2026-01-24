import type { FavoriteItem } from "@/entities/favorite/model/types.ts";
import FavoriteEmptyState from "./FavoriteEmptyState.tsx";
import FavoriteGrid from "./FavoriteGrid.tsx";

interface FavoriteListContentProps {
  favorites: FavoriteItem[];
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}

function FavoriteListContent({ favorites, onRemove, onUpdateAlias }: FavoriteListContentProps) {
  if (favorites.length === 0) {
    return <FavoriteEmptyState />;
  }
  return <FavoriteGrid favorites={favorites} onRemove={onRemove} onUpdateAlias={onUpdateAlias} />;
}

export default FavoriteListContent;
