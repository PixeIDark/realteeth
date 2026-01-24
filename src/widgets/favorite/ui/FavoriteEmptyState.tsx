import { Star } from "lucide-react";

function FavoriteEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-16">
      <Star className="text-muted-foreground/40 mb-3 h-10 w-10 sm:h-12 sm:w-12" />
      <p className="text-muted-foreground text-center text-xs sm:text-sm">
        즐겨찾기한 장소가 없습니다.
        <br />
        검색을 통해 장소를 추가해보세요.
      </p>
    </div>
  );
}

export default FavoriteEmptyState;
