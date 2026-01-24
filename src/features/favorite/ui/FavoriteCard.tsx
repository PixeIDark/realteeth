import { Suspense, useState } from "react";
import { useNavigate } from "react-router";
import { LINKS } from "@/app/routes/route.ts";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card.tsx";
import { Button } from "@/shared/ui/Button.tsx";
import { Input } from "@/shared/ui/Input.tsx";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { FavoriteItem } from "@/entities/favorite/model/types.ts";
import ItemLoader from "@/shared/ui/ItemLoader.tsx";
import FavoriteWeatherContent from "@/features/favorite/ui/FavoriteWeatherContent.tsx";

interface FavoriteCardProps {
  favorite: FavoriteItem;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}

function FavoriteCard({ favorite, onRemove, onUpdateAlias }: FavoriteCardProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState(favorite.alias);

  const handleCardClick = () => {
    if (!isEditing) {
      navigate(LINKS.DETAIL(favorite.districtId));
    }
  };

  const handleSaveAlias = () => {
    onUpdateAlias(favorite.id, alias);
    setIsEditing(false);
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isEditing ? "cursor-default" : "cursor-pointer hover:-translate-y-1"
      }`}
    >
      <CardHeader className="pb-2 sm:pb-3">
        {isEditing ? (
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="flex-1 text-sm sm:text-base"
              autoFocus
            />
            <div className="flex gap-1.5 sm:gap-2">
              <Button size="sm" onClick={handleSaveAlias} className="flex-1 sm:flex-none">
                <Check className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">저장</span>
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">
                <X className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">취소</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="truncate text-base font-semibold sm:text-lg">{favorite.alias}</h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 sm:h-8 sm:w-8"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only">수정</span>
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-2 sm:space-y-3">
        <Suspense fallback={<ItemLoader text="날씨 로딩 중..." />}>
          <FavoriteWeatherContent lat={favorite.lat} lon={favorite.lon} />
        </Suspense>

        <Button
          variant="destructive"
          size="sm"
          className="w-full text-xs sm:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(favorite.id);
          }}
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          삭제
        </Button>
      </CardContent>
    </Card>
  );
}

export default FavoriteCard;
