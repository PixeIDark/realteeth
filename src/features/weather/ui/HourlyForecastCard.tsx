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
        <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
          <Clock className="h-4 w-4 text-violet-500 sm:h-5 sm:w-5" />
          시간대별 기온
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {forecast.map((item) => (
            <div
              key={item.id}
              className="bg-muted/50 flex min-w-[100px] flex-col items-center gap-2 rounded-lg p-3 sm:min-w-[120px] sm:p-4"
            >
              <p className="text-muted-foreground text-xs">{item.date}</p>
              <p className="text-sm font-medium">{item.time}</p>
              <p className="text-lg font-bold sm:text-xl">{item.temp}</p>
              <p className="text-muted-foreground text-center text-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyForecastCard;
