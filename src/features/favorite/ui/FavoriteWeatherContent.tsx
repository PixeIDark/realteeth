import { useCurrentWeather } from "@/entities/weather/model/queries.ts";
import { Cloud, Trash2 } from "lucide-react";
import ItemLoader from "@/shared/ui/ItemLoader.tsx";
import { Button } from "@/shared/ui/Button.tsx";
import { CardContent } from "@/shared/ui/Card.tsx";
import ErrorContent from "@/shared/ui/ErrorContent.tsx";

interface FavoriteWeatherContentProps {
  lat: number;
  lon: number;
  onRemove: (e: React.MouseEvent) => void;
}

function FavoriteWeatherContent({ lat, lon, onRemove }: FavoriteWeatherContentProps) {
  const { data: weather, isLoading, isError } = useCurrentWeather(lat, lon);

  if (isLoading) {
    return <ItemLoader text="날씨 로딩 중..." />;
  }

  if (isError || !weather) {
    return <ErrorContent message="즐겨찾기 날씨를 불러올 수 없습니다" />;
  }

  return (
    <CardContent className="space-y-2 sm:space-y-3">
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2">
          <Cloud className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xl font-bold sm:text-2xl">{weather.temp}</span>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm">
          <span>최저 {weather.tempMin}</span>
          <span>최고 {weather.tempMax}</span>
        </div>
        <p className="text-muted-foreground text-xs capitalize sm:text-sm">{weather.description}</p>
      </div>
      <Button variant="destructive" size="sm" className="w-full text-xs sm:text-sm" onClick={onRemove}>
        <Trash2 className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        삭제
      </Button>
    </CardContent>
  );
}

export default FavoriteWeatherContent;
