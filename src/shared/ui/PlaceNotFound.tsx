import { Card, CardContent } from "@/shared/ui/Card.tsx";
import { AlertCircle } from "lucide-react";

function PlaceNotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <AlertCircle className="text-destructive h-10 w-10" />
          <p className="text-muted-foreground text-center text-sm">해당 장소의 정보가 제공되지 않습니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PlaceNotFound;
