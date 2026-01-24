import { CardHeader } from "@/shared/ui/Card.tsx";
import FavoriteCardEditMode from "@/features/favorite/ui/FavoriteCardEditMode.tsx";
import FavoriteCardViewMode from "@/features/favorite/ui/FavoriteCardViewMode.tsx";

interface FavoriteCardHeaderProps {
  isEditing: boolean;
  alias: string;
  favoriteAlias: string;
  onAliasChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: (e: React.MouseEvent) => void;
}

function FavoriteCardHeader({
  isEditing,
  alias,
  favoriteAlias,
  onAliasChange,
  onSave,
  onCancel,
  onEdit,
}: FavoriteCardHeaderProps) {
  return (
    <CardHeader className="pb-2 sm:pb-3">
      {isEditing ? (
        <FavoriteCardEditMode alias={alias} onAliasChange={onAliasChange} onSave={onSave} onCancel={onCancel} />
      ) : (
        <FavoriteCardViewMode favoriteAlias={favoriteAlias} onEdit={onEdit} />
      )}
    </CardHeader>
  );
}

export default FavoriteCardHeader;
