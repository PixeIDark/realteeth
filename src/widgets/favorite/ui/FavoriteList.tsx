import { Card } from "@/shared/ui/Card";
import FavoriteListContent from "@/widgets/favorite/ui/FavoriteListContent.tsx";
import FavoriteListHeader from "@/widgets/favorite/ui/FavoriteListHeader.tsx";
import { useFavorites } from "@/entities/favorite";

function FavoriteList() {
  const { favorites, removeFavorite, updateAlias } = useFavorites();

  const handleUpdateAlias = (id: string, alias: string) => {
    updateAlias({ id, alias });
  };

  return (
    <Card className="px-6">
      <FavoriteListHeader count={favorites.length} />
      <FavoriteListContent favorites={favorites} onRemove={removeFavorite} onUpdateAlias={handleUpdateAlias} />
    </Card>
  );
}

export default FavoriteList;
