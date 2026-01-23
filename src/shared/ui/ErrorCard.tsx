import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/Card.tsx";

interface ErrorCardProps {
  error: unknown;
}

function ErrorCard({ error }: ErrorCardProps) {
  const message = error instanceof Error ? error.message : "알 수 없는 에러";

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-3 pt-6">
          <AlertCircle className="text-destructive h-10 w-10" />
          <p className="text-muted-foreground text-center text-sm">에러: {message}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorCard;
