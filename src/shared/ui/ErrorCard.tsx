import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/Card.tsx";

interface ErrorCardProps {
  message?: string;
}

function ErrorCard({ message = "정보를 불러올 수 없습니다" }: ErrorCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-6">
        <AlertCircle className="text-destructive h-5 w-5" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </CardContent>
    </Card>
  );
}

export default ErrorCard;
