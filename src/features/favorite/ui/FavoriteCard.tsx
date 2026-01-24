import { useState } from "react";
import { useNavigate } from "react-router";
import { LINKS } from "@/app/routes/route.ts";
import { Card } from "@/shared/ui/Card.tsx";
import type { FavoriteItem } from "@/entities/favorite/model/types.ts";
import FavoriteCardHeader from "@/features/favorite/ui/FavoriteCardHeader.tsx";
import FavoriteWeatherContent from "@/features/favorite/ui/FavoriteWeatherContent.tsx";

interface FavoriteCardProps {
  favorite: FavoriteItem;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}

function FavoriteCard({ favorite, onRemove, onUpdateAlias }: FavoriteCardProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState(favorite.alias);

  const handleCardClick = () => {
    if (!isEditing) {
      navigate(LINKS.DETAIL(favorite.districtId));
    }
  };

  const handleSaveAlias = () => {
    onUpdateAlias(favorite.id, alias);
    setIsEditing(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(favorite.id);
  };

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(e.target.value);
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isEditing ? "cursor-default" : "cursor-pointer hover:-translate-y-1"
      }`}
    >
      <FavoriteCardHeader
        isEditing={isEditing}
        alias={alias}
        favoriteAlias={favorite.alias}
        onAliasChange={handleAliasChange}
        onSave={handleSaveAlias}
        onCancel={handleCancelEdit}
        onEdit={handleEditClick}
      />
      <FavoriteWeatherContent lat={favorite.lat} lon={favorite.lon} onRemove={handleRemove} />
    </Card>
  );
}

export default FavoriteCard;
