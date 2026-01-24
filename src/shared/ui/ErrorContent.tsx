import { CardContent } from "@/shared/ui/Card.tsx";
import { AlertCircle } from "lucide-react";

interface ErrorContentProps {
  message?: string;
}

function ErrorContent({ message = "정보를 불러올 수 없습니다" }: ErrorContentProps) {
  return (
    <CardContent className="flex items-center gap-3 py-6">
      <AlertCircle className="text-destructive h-5 w-5" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </CardContent>
  );
}

export default ErrorContent;
