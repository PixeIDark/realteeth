import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { districts } from "@/shared/data/koreaDistricts.ts";
import { ENV } from "@/shared/config/env.ts";
import { useFavorites } from "@/features/manage-favorite";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { AlertCircle, ArrowLeft, Clock, Cloud, Loader2, MapPin, Star, StarOff, Thermometer } from "lucide-react";

interface HourlyForecast {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

function DetailPage() {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState<any>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();

  const district = districts.find((d) => d.id === locationId);
  const favoriteItem = favorites.find((f) => f.districtId === locationId);
  const isCurrentFavorite = isFavorite(locationId || "");

  useEffect(() => {
    if (!district) {
      setError("해당 장소의 정보가 제공되지 않습니다.");
      setLoading(false);
      return;
    }

    const fetchWeatherData = async () => {
      try {
        // 현재 날씨
        const currentRes = await fetch(
          `${ENV.WEATHER_BASE_URL}/weather?lat=${district.lat}&lon=${district.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
        );
        if (!currentRes.ok) throw new Error(`HTTP error! status: ${currentRes.status}`);
        const currentData = await currentRes.json();
        setWeather(currentData);

        // 시간대별 예보
        const forecastRes = await fetch(
          `${ENV.WEATHER_BASE_URL}/forecast?lat=${district.lat}&lon=${district.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
        );
        if (!forecastRes.ok) throw new Error(`HTTP error! status: ${forecastRes.status}`);
        const forecastData = await forecastRes.json();

        // 오늘 날짜의 데이터만 필터링 (최대 8개 = 24시간)
        const today = new Date().toISOString().split("T")[0];
        const todayForecast = forecastData.list.filter((item: HourlyForecast) => item.dt_txt.startsWith(today));

        // 오늘 데이터가 적으면 내일까지 포함해서 8개
        const forecast = todayForecast.length >= 4 ? todayForecast : forecastData.list.slice(0, 8);

        setHourlyForecast(forecast);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [district]);

  const handleToggleFavorite = () => {
    if (!district) return;

    if (isCurrentFavorite && favoriteItem) {
      removeFavorite(favoriteItem.id);
    } else {
      addFavorite({
        id: district.id,
        fullName: district.fullName,
        lat: district.lat,
        lon: district.lon,
      });
    }
  };

  const formatTime = (dtTxt: string) => {
    const date = new Date(dtTxt);
    return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const formatDate = (dtTxt: string) => {
    const date = new Date(dtTxt);
    return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm">날씨 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="text-destructive h-10 w-10" />
            <p className="text-muted-foreground text-center text-sm">{error}</p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              뒤로가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* 헤더 */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            뒤로가기
          </Button>

          <Button
            variant={isCurrentFavorite ? "outline" : "default"}
            onClick={handleToggleFavorite}
            className="w-full sm:w-auto"
          >
            {isCurrentFavorite ? (
              <>
                <StarOff className="mr-2 h-4 w-4" />
                즐겨찾기 해제
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                즐겨찾기 추가
              </>
            )}
          </Button>
        </div>

        {/* 위치 정보 카드 */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-2xl">
              <MapPin className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-balance">{district?.fullName}</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 현재 날씨 카드 */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
              <Cloud className="h-4 w-4 text-sky-500 sm:h-5 sm:w-5" />
              현재 날씨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4 sm:p-5">
                <Thermometer className="h-6 w-6 text-orange-500 sm:h-8 sm:w-8" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">현재 기온</p>
                  <p className="text-2xl font-bold sm:text-3xl">{weather?.main?.temp}°C</p>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4 sm:p-5">
                <Thermometer className="h-6 w-6 text-blue-500 sm:h-8 sm:w-8" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">최저 기온</p>
                  <p className="text-2xl font-bold sm:text-3xl">{weather?.main?.temp_min}°C</p>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4 sm:p-5">
                <Thermometer className="h-6 w-6 text-red-500 sm:h-8 sm:w-8" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">최고 기온</p>
                  <p className="text-2xl font-bold sm:text-3xl">{weather?.main?.temp_max}°C</p>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4 sm:p-5">
                <Cloud className="h-6 w-6 text-sky-500 sm:h-8 sm:w-8" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">날씨</p>
                  <p className="text-xl font-bold capitalize sm:text-2xl">{weather?.weather?.[0]?.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시간대별 기온 카드 */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
              <Clock className="h-4 w-4 text-violet-500 sm:h-5 sm:w-5" />
              시간대별 기온
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {hourlyForecast.map((forecast) => (
                <div
                  key={forecast.dt}
                  className="bg-muted/50 flex min-w-[100px] flex-col items-center gap-2 rounded-lg p-3 sm:min-w-[120px] sm:p-4"
                >
                  <p className="text-muted-foreground text-xs">{formatDate(forecast.dt_txt)}</p>
                  <p className="text-sm font-medium">{formatTime(forecast.dt_txt)}</p>
                  <p className="text-lg font-bold sm:text-xl">{Math.round(forecast.main.temp)}°C</p>
                  <p className="text-muted-foreground text-center text-xs">{forecast.weather[0]?.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DetailPage;
