import type { District } from "@/shared/data/koreaDistricts";
import { Card, CardContent } from "@/shared/ui/Card";
import { MapPin } from "lucide-react";

interface SearchResultListProps {
  results: District[];
  focusIndex: number;
  noResults: boolean;
  query: string;
  onSelect: (district: District) => void;
  renderAction?: (district: District) => React.ReactNode;
}

function SearchResultList({ results, focusIndex, noResults, query, onSelect, renderAction }: SearchResultListProps) {
  if (noResults && query.trim()) {
    return (
      <Card className="absolute z-20 mt-1 w-full">
        <CardContent className="py-4 sm:py-6">
          <p className="text-muted-foreground text-center text-xs sm:text-sm">해당 장소의 정보가 제공되지 않습니다.</p>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <Card className="absolute z-20 mt-1 w-full overflow-hidden">
      <ul className="max-h-60 overflow-y-auto sm:max-h-80">
        {results.map((district, index) => (
          <li
            key={district.id}
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
            {renderAction?.(district)}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default SearchResultList;
