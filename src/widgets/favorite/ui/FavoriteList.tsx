import { Card } from "@/shared/ui/Card";
import { useFavorites } from "@/features/favorite";
import FavoriteListContent from "@/widgets/favorite/ui/FavoriteListContent.tsx";
import FavoriteListHeader from "@/widgets/favorite/ui/FavoriteListHeader.tsx";

function FavoriteList() {
  const { favorites, removeFavorite, updateAlias } = useFavorites();

  return (
    <Card className="px-6">
      <FavoriteListHeader count={favorites.length} />
      <FavoriteListContent favorites={favorites} onRemove={removeFavorite} onUpdateAlias={updateAlias} />
    </Card>
  );
}

export default FavoriteList;
