import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { LINKS } from "@/app/routes/route";
import { useDistrictSearch } from "@/features/search-district";
import { useListKeyboardNav } from "@/shared/lib/useListKeyboardNav.ts";
import SearchResultList from "@/widgets/search-district/ui/SearchResultList.tsx";
import SearchInput from "@/widgets/search-district/ui/SearchInput.tsx";
import type { District } from "@/entities/district/model/type.ts";
import { useOnClickOutside } from "@/shared/lib/useOnClickOutside.ts";

function DistrictSearchBox() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, searchResults, isResults, focusIndex, setFocusIndex, clearSearch } = useDistrictSearch();
  useOnClickOutside(containerRef, () => setIsOpen(false));

  const handleSelect = useCallback(
    (district: District) => {
      navigate(LINKS.DETAIL(district.id));
      clearSearch();
      setIsOpen(false);
    },
    [navigate, clearSearch]
  );

  const { handleKeyDown } = useListKeyboardNav({
    items: searchResults,
    focusIndex,
    setFocusIndex,
    onSelect: handleSelect,
    onEscape: () => {
      clearSearch();
      setIsOpen(false);
    },
  });

  return (
    <div className="relative" ref={containerRef}>
      <SearchInput
        value={query}
        onChange={(val) => {
          setQuery(val);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <SearchResultList
          results={searchResults}
          focusIndex={focusIndex}
          isResults={isResults}
          query={query}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default DistrictSearchBox;
