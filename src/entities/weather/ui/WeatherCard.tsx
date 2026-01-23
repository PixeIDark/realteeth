import { Cloud, MapPin, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import SectionHeader from "@/shared/ui/SectionHeader";

interface WeatherCardProps {
  name: string;
  temp: string;
  tempMin: string;
  tempMax: string;
  description: string;
}

function WeatherCard({ name, temp, tempMin, tempMax, description }: WeatherCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <SectionHeader icon={<MapPin className="text-primary h-4 w-4 sm:h-5 sm:w-5" />} title="현재 위치 날씨" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
            <MapPin className="text-muted-foreground h-5 w-5 sm:h-6 sm:w-6" />
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">도시</p>
              <p className="text-sm font-semibold sm:text-lg">{name}</p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
            <Thermometer className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6" />
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">현재 기온</p>
              <p className="text-sm font-semibold sm:text-lg">{temp}</p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
            <Thermometer className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">최저 / 최고</p>
              <p className="text-sm font-semibold sm:text-lg">
                {tempMin} / {tempMax}
              </p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
            <Cloud className="h-5 w-5 text-sky-500 sm:h-6 sm:w-6" />
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">날씨</p>
              <p className="text-sm font-semibold capitalize sm:text-lg">{description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
