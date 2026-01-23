import { PageLoader } from "@/shared/ui/PageLoader.tsx";

function WeatherLoading() {
  return <PageLoader message="날씨 정보를 불러오는 중..." />;
}

export default WeatherLoading;
