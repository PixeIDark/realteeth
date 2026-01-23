import { Card, CardContent } from "@/shared/ui/Card";
import { Star } from "lucide-react";
import { FavoriteCard, useFavorites } from "@/features/favorite";

function FavoriteList() {
  const { favorites, removeFavorite, updateAlias } = useFavorites();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <Star className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
          즐겨찾기
        </h2>
        <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm">
          {favorites.length}/6
        </span>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
            <Star className="text-muted-foreground/40 mb-3 h-10 w-10 sm:h-12 sm:w-12" />
            <p className="text-muted-foreground text-center text-xs sm:text-sm">
              즐겨찾기한 장소가 없습니다.
              <br />
              검색을 통해 장소를 추가해보세요.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} favorite={fav} onRemove={removeFavorite} onUpdateAlias={updateAlias} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteList;
