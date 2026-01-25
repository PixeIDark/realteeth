import { MapPin } from "lucide-react";

function LocationPermissionPrompt() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 pt-6 text-center">
        <MapPin className="text-primary h-12 w-12" />
        <h2 className="text-lg font-semibold">위치 권한이 필요합니다</h2>
        <p className="text-muted-foreground text-sm">
          현재 위치의 날씨 정보를 제공하기 위해
          <br />
          위치 접근 권한을 허용해주세요.
        </p>
      </div>
    </div>
  );
}

export default LocationPermissionPrompt;
