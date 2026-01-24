import { useCallback } from "react";
import { useNavigate } from "react-router";
import { LINKS } from "@/app/routes/route";
import { useDistrictSearch } from "@/features/search-district";
import { useListKeyboardNav } from "@/shared/lib/useListKeyboardNav.ts";
import SearchResultList from "@/widgets/search-district/ui/SearchResultList.tsx";
import SearchInput from "@/widgets/search-district/ui/SearchInput.tsx";
import type { District } from "@/entities/district/model/type.ts";

function DistrictSearchBox() {
  const navigate = useNavigate();
  const { query, setQuery, searchResults, noResults, focusIndex, setFocusIndex, clearSearch } = useDistrictSearch();

  const handleSelect = useCallback(
    (district: District) => {
      navigate(LINKS.DETAIL(district.id));
      clearSearch();
    },
    [navigate, clearSearch]
  );

  const { handleKeyDown } = useListKeyboardNav({
    items: searchResults,
    focusIndex,
    setFocusIndex,
    onSelect: handleSelect,
    onEscape: clearSearch,
  });

  return (
    <div className="relative">
      <SearchInput value={query} onChange={setQuery} onKeyDown={handleKeyDown} />
      <SearchResultList
        results={searchResults}
        focusIndex={focusIndex}
        noResults={noResults}
        query={query}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default DistrictSearchBox;
