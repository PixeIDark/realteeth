import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card.tsx";
import { Clock } from "lucide-react";
import { useForecast } from "@/entities/weather/model/queries.ts";
import ItemLoader from "@/shared/ui/ItemLoader.tsx";
import ErrorCard from "@/shared/ui/ErrorCard.tsx";

interface HourlyForecastCardProps {
  lat: number;
  lon: number;
}

function HourlyForecastCard({ lat, lon }: HourlyForecastCardProps) {
  const { data: forecast, isLoading, isError } = useForecast(lat, lon);

  if (isLoading) {
    return <ItemLoader text="시간대별 기후 로딩 중..." />;
  }

  if (isError || !forecast) {
    return <ErrorCard message="시간대별 예보를 불러올 수 없습니다" />;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-violet-500 sm:h-5 sm:w-5" />
          <h2 className="text-base sm:text-xl">시간대별 기온</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {forecast.map((item) => (
            <div
              key={item.id}
              // min-w를 w-로 바꾸고, shrink-0을 추가해 압축되지 않게 합니다.
              className="bg-muted/50 flex w-[100px] shrink-0 flex-col items-center gap-2 rounded-lg p-3 sm:w-[120px] sm:p-4"
            >
              <p className="text-muted-foreground text-xs">{item.date}</p>
              <p className="text-sm font-medium">{item.time}</p>
              <p className="text-lg font-bold sm:text-xl">{item.temp}</p>

              {/* 설명 부분: 높이를 고정하거나 텍스트 정렬 처리 */}
              <p className="text-muted-foreground line-clamp-2 min-h-[2rem] text-center text-[10px] leading-tight sm:text-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyForecastCard;
