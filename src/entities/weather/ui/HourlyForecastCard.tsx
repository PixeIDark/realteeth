import type { HourlyForecast } from "../model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Clock } from "lucide-react";
import { formatShortDate, formatTime } from "@/shared/lib/formater.ts";

interface HourlyForecastCardProps {
  forecast: HourlyForecast[];
}

function HourlyForecastCard({ forecast }: HourlyForecastCardProps) {
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
              key={item.dt}
              className="bg-muted/50 flex min-w-[100px] flex-col items-center gap-2 rounded-lg p-3 sm:min-w-[120px] sm:p-4"
            >
              <p className="text-muted-foreground text-xs">{formatShortDate(item.dt_txt)}</p>
              <p className="text-sm font-medium">{formatTime(item.dt_txt)}</p>
              <p className="text-lg font-bold sm:text-xl">{Math.round(item.main.temp)}°C</p>
              <p className="text-muted-foreground text-center text-xs">{item.weather[0]?.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyForecastCard;
