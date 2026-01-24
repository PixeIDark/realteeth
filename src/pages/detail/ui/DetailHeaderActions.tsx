import { FavoriteButton } from "@/features/favorite";
import BackButton from "@/shared/ui/BackButton.tsx";
import type { District } from "@/entities/district/model/type.ts";

interface DetailHeaderActionsProps {
  district: District;
}

function DetailHeaderActions({ district }: DetailHeaderActionsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <BackButton />
      <FavoriteButton district={district} />
    </div>
  );
}

export default DetailHeaderActions;
