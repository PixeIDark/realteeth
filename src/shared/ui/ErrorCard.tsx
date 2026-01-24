import { useRouteError } from "react-router";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/Card.tsx";

interface ErrorPageProps {
  error?: unknown;
}

function ErrorPage({ error: propsError }: ErrorPageProps) {
  const routeError = useRouteError();
  const error = propsError ?? routeError;
  const message = error instanceof Error ? error.message : "알 수 없는 에러";

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-3 pt-6">
          <AlertCircle className="text-destructive h-10 w-10" />
          <p className="text-muted-foreground text-center text-sm">에러: {message}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorPage;
