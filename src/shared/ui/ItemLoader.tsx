import { Loader2 } from "lucide-react";

interface IItemLoaderProps {
  text?: string;
}

function ItemLoader({ text }: IItemLoaderProps) {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-6">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text && <span className="text-xs sm:text-sm">{text}</span>}
    </div>
  );
}

export default ItemLoader;
