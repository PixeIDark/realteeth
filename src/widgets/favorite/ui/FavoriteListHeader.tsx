import { Star } from "lucide-react";
import { CardHeader, CardTitle } from "@/shared/ui/Card.tsx";

interface FavoriteListHeaderProps {
  count: number;
}

function FavoriteListHeader({ count }: FavoriteListHeaderProps) {
  return (
    <CardHeader className="-mx-6">
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
          <h2 className="text-base sm:text-xl">즐겨찾기</h2>
        </span>
        <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium sm:py-1 sm:text-sm">
          {count}/6
        </span>
      </CardTitle>
    </CardHeader>
  );
}

export default FavoriteListHeader;
