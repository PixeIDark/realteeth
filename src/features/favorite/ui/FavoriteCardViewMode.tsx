import { Button } from "@/shared/ui/Button.tsx";
import { Pencil } from "lucide-react";

interface FavoriteCardViewModeProps {
  favoriteAlias: string;
  onEdit: (e: React.MouseEvent) => void;
}

function FavoriteCardViewMode({ favoriteAlias, onEdit }: FavoriteCardViewModeProps) {
  return (
    <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-x-2">
      <h3 className="min-w-0 flex-1 truncate text-base font-semibold sm:text-lg">{favoriteAlias}</h3>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 shrink-0 transition-opacity group-hover:opacity-100 sm:h-8 sm:w-8"
        onClick={onEdit}
      >
        <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="sr-only">수정</span>
      </Button>
    </div>
  );
}

export default FavoriteCardViewMode;
