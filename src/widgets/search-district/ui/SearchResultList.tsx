import { useEffect, useRef } from "react";
import { Card } from "@/shared/ui/Card.tsx";
import { MapPin } from "lucide-react";
import ErrorCard from "@/shared/ui/ErrorCard.tsx";
import type { District } from "@/entities/district/model/type.ts";
import { FavoriteButton } from "@/features/favorite";

interface SearchResultListProps {
  results: District[];
  focusIndex: number;
  isResults: boolean;
  query: string;
  onSelect: (district: District) => void;
}

function SearchResultList({ results, focusIndex, isResults, query, onSelect }: SearchResultListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (focusIndex >= 0 && itemRefs.current[focusIndex]) {
      itemRefs.current[focusIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusIndex]);

  if (isResults && query.trim()) {
    return <ErrorCard message="해당 장소의 정보가 제공되지 않습니다." />;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <Card className="absolute z-20 mt-1 w-full overflow-hidden">
      <ul ref={listRef} className="max-h-60 overflow-y-auto sm:max-h-80">
        {results.map((district, index) => (
          <li
            key={district.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`flex items-center justify-between gap-2 px-3 py-2.5 transition-colors sm:px-4 sm:py-3 ${
              focusIndex === index ? "bg-accent" : "hover:bg-muted/50"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(district)}
              className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
            >
              <MapPin className="text-muted-foreground h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate text-sm sm:text-base">{district.fullName}</span>
            </button>
            <FavoriteButton district={district} showLabel={false} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default SearchResultList;
