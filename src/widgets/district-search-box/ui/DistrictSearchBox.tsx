import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { District } from "@/shared/data/koreaDistricts";
import { LINKS } from "@/app/routes/route";
import { SearchResultList, useDistrictSearch } from "@/features/search-district";
import { useFavorites } from "../../../features/favorite";
import { Button } from "@/shared/ui/Button";
import { Star } from "lucide-react";
import SearchInput from "@/shared/ui/SearchInput.tsx";
import { useListKeyboardNav } from "@/shared/lib/useListKeyboardNav.ts";

function DistrictSearchBox() {
  const navigate = useNavigate();
  const { addFavorite } = useFavorites();
  const { query, setQuery, searchResults, noResults, focusIndex, setFocusIndex, clearSearch } = useDistrictSearch();

  const handleSelect = useCallback(
    (district: District) => {
      navigate(LINKS.DETAIL(district.id));
      clearSearch();
    },
    [navigate, clearSearch]
  );

  const handleAddFavorite = useCallback(
    (district: District) => {
      addFavorite({
        id: district.id,
        fullName: district.fullName,
        lat: district.lat,
        lon: district.lon,
      });
    },
    [addFavorite]
  );

  const { handleKeyDown } = useListKeyboardNav({
    items: searchResults,
    focusIndex,
    setFocusIndex,
    onSelect: handleSelect,
    onEscape: clearSearch,
  });

  const renderFavoriteButton = useCallback(
    (district: District) => (
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          handleAddFavorite(district);
        }}
        className="shrink-0 text-xs sm:text-sm"
      >
        <Star className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
        <span className="hidden sm:inline">즐겨찾기</span>
        <span className="sm:hidden">추가</span>
      </Button>
    ),
    [handleAddFavorite]
  );

  return (
    <div className="relative mb-6 sm:mb-8">
      <SearchInput value={query} onChange={setQuery} onKeyDown={handleKeyDown} />
      <SearchResultList
        results={searchResults}
        focusIndex={focusIndex}
        noResults={noResults}
        query={query}
        onSelect={handleSelect}
        renderAction={renderFavoriteButton}
      />
    </div>
  );
}

export default DistrictSearchBox;
