import { useRef, useState } from "react";
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
  const { query, setQuery, searchResults, focusIndex, setFocusIndex, clearSearch } = useDistrictSearch();
  useOnClickOutside(containerRef, () => setIsOpen(false));

  const handleSelect = (district: District) => {
    navigate(LINKS.DETAIL(district.id));
    clearSearch();
    setIsOpen(false);
  };

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

  const handleChange = (val: string) => {
    setQuery(val);
    setIsOpen(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={containerRef}>
      <SearchInput value={query} onChange={handleChange} onFocus={handleOpen} onKeyDown={handleKeyDown} />
      {isOpen && (
        <SearchResultList results={searchResults} focusIndex={focusIndex} query={query} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default DistrictSearchBox;
