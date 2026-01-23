import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCurrentLocation } from "@/features/get-current-location";
import { useFavorites } from "@/features/manage-favorite";
import { ENV } from "@/shared/config/env.ts";
import { type District, districts } from "@/shared/data/koreaDistricts.ts";
import { LINKS } from "@/app/routes/route.ts";
import { FavoriteCard } from "../../../widgets/favorite-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { AlertCircle, Clock, Cloud, Loader2, MapPin, Search, Star, Thermometer } from "lucide-react";

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

function HomePage() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<any>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<District[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const { location } = useCurrentLocation();
  const { favorites, addFavorite, removeFavorite, updateAlias } = useFavorites();

  useEffect(() => {
    if (!location) return;

    const fetchWeatherData = async () => {
      try {
        // 현재 날씨
        const currentRes = await fetch(
          `${ENV.WEATHER_BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
        );
        if (!currentRes.ok) throw new Error(`HTTP error! status: ${currentRes.status}`);
        const currentData = await currentRes.json();
        setWeather(currentData);

        // 시간대별 예보
        const forecastRes = await fetch(
          `${ENV.WEATHER_BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${ENV.WEATHER_API_KEY}&units=metric&lang=kr`
        );
        if (!forecastRes.ok) throw new Error(`HTTP error! status: ${forecastRes.status}`);
        const forecastData = await forecastRes.json();

        // 오늘 날짜의 데이터 필터링 (최대 8개 = 24시간)
        const today = new Date().toISOString().split("T")[0];
        const todayForecast = forecastData.list.filter((item: HourlyForecast) => item.dt_txt.startsWith(today));

        const forecast = todayForecast.length >= 4 ? todayForecast : forecastData.list.slice(0, 8);

        setHourlyForecast(forecast);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setNoResults(false);
      setFocusIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = districts.filter((d) => d.fullName.includes(query) || d.name.includes(query));
      setSearchResults(filtered.slice(0, 20));
      setNoResults(filtered.length === 0);
      setFocusIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (district: District) => {
    navigate(LINKS.DETAIL(district.id));
    setQuery("");
    setSearchResults([]);
    setNoResults(false);
    setFocusIndex(-1);
  };

  const handleAddFavorite = (district: District) => {
    addFavorite({
      id: district.id,
      fullName: district.fullName,
      lat: district.lat,
      lon: district.lon,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusIndex >= 0) {
          handleSelect(searchResults[focusIndex]);
        } else if (searchResults.length > 0) {
          handleSelect(searchResults[0]);
        }
        break;
      case "Escape":
        setSearchResults([]);
        setFocusIndex(-1);
        break;
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
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <AlertCircle className="text-destructive h-10 w-10" />
            <p className="text-muted-foreground text-center text-sm">에러: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* 검색 */}
        <div className="relative mb-6 sm:mb-8">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:h-5 sm:w-5" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="장소 검색 (시, 구, 동)"
              className="h-10 pl-9 text-sm sm:h-12 sm:pl-11 sm:text-base"
            />
          </div>

          {searchResults.length > 0 && (
            <Card className="absolute z-20 mt-1 w-full overflow-hidden">
              <ul className="max-h-60 overflow-y-auto sm:max-h-80">
                {searchResults.map((d, index) => (
                  <li
                    key={d.id}
                    className={`flex items-center justify-between gap-2 px-3 py-2.5 transition-colors sm:px-4 sm:py-3 ${
                      focusIndex === index ? "bg-accent" : "hover:bg-muted/50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(d)}
                      className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
                    >
                      <MapPin className="text-muted-foreground h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                      <span className="truncate text-sm sm:text-base">{d.fullName}</span>
                    </button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddFavorite(d)}
                      className="shrink-0 text-xs sm:text-sm"
                    >
                      <Star className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden sm:inline">즐겨찾기</span>
                      <span className="sm:hidden">추가</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {noResults && query.trim() && (
            <Card className="absolute z-20 mt-1 w-full">
              <CardContent className="py-4 sm:py-6">
                <p className="text-muted-foreground text-center text-xs sm:text-sm">
                  해당 장소의 정보가 제공되지 않습니다.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 현재 위치 날씨 */}
        <Card className="mb-6 overflow-hidden sm:mb-8">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
              <MapPin className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
              현재 위치 날씨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
                <MapPin className="text-muted-foreground h-5 w-5 sm:h-6 sm:w-6" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">도시</p>
                  <p className="text-sm font-semibold sm:text-lg">{weather?.name || "-"}</p>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
                <Thermometer className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">현재 기온</p>
                  <p className="text-sm font-semibold sm:text-lg">{weather?.main?.temp}°C</p>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
                <Thermometer className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">최저 / 최고</p>
                  <p className="text-sm font-semibold sm:text-lg">
                    {weather?.main?.temp_min}°C / {weather?.main?.temp_max}°C
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3 sm:p-4">
                <Cloud className="h-5 w-5 text-sky-500 sm:h-6 sm:w-6" />
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">날씨</p>
                  <p className="text-sm font-semibold capitalize sm:text-lg">{weather?.weather?.[0]?.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시간대별 기온 */}
        <Card className="mb-6 sm:mb-8">
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

        {/* 즐겨찾기 */}
        <section>
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
              <Star className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
              즐겨찾기
            </h2>
            <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm">
              {favorites.length}/6
            </span>
          </div>

          {favorites.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
                <Star className="text-muted-foreground/40 mb-3 h-10 w-10 sm:h-12 sm:w-12" />
                <p className="text-muted-foreground text-center text-xs sm:text-sm">
                  즐겨찾기한 장소가 없습니다.
                  <br />
                  검색을 통해 장소를 추가해보세요.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {favorites.map((fav) => (
                <FavoriteCard key={fav.id} favorite={fav} onRemove={removeFavorite} onUpdateAlias={updateAlias} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
