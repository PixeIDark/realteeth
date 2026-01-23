import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message }: PageLoaderProps) => (
  <div className="bg-background flex min-h-screen items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  </div>
);
