import { Button } from "@/shared/ui/Button.tsx";
import { Input } from "@/shared/ui/Input.tsx";
import { Check, X } from "lucide-react";

interface FavoriteCardEditModeProps {
  alias: string;
  onAliasChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

function FavoriteCardEditMode({ alias, onAliasChange, onSave, onCancel }: FavoriteCardEditModeProps) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Input type="text" value={alias} onChange={onAliasChange} className="flex-1 text-sm sm:text-base" autoFocus />
      <div className="flex gap-1.5 sm:gap-2">
        <Button size="sm" onClick={onSave} className="flex-1 sm:flex-none">
          <Check className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">저장</span>
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">
          <X className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">취소</span>
        </Button>
      </div>
    </div>
  );
}

export default FavoriteCardEditMode;
