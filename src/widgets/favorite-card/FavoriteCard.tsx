import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ENV } from "@/shared/config/env.ts";
import { LINKS } from "@/app/routes/route.ts";
import type { Favorite } from "@/shared/types/favorite.ts";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Check, Cloud, Loader2, Pencil, Trash2, X } from "lucide-react";

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}

function FavoriteCard({ favorite, onRemove, onUpdateAlias }: FavoriteCardProps) {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState(favorite.alias);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `${ENV.WEATHER_BASE_URL}/weather?lat=${favorite.lat}&lon=${favorite.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
        );
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [favorite.lat, favorite.lon]);

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
        {weather ? (
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2">
              <Cloud className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xl font-bold sm:text-2xl">{weather.main?.temp}°C</span>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm">
              <span>최저 {weather.main?.temp_min}°C</span>
              <span>최고 {weather.main?.temp_max}°C</span>
            </div>
            <p className="text-muted-foreground text-xs capitalize sm:text-sm">{weather.weather?.[0]?.description}</p>
          </div>
        ) : (
          <div className="text-muted-foreground flex items-center gap-2 py-2 sm:py-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs sm:text-sm">날씨 로딩 중...</span>
          </div>
        )}

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
