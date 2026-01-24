import { useCallback, useEffect, useState } from "react";
import { districts } from "@/shared/data/koreaDistricts";
import type { District } from "@/shared/model/type.ts";
import { filterDistricts } from "@/features/search-district/lib/filterDistricts.ts";

interface UseDistrictSearchOptions {
  debounceMs?: number;
  maxResults?: number;
}

interface UseDistrictSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  searchResults: District[];
  noResults: boolean;
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  clearSearch: () => void;
}

export function useDistrictSearch(options: UseDistrictSearchOptions = {}): UseDistrictSearchReturn {
  const { debounceMs = 300, maxResults = 20 } = options;

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<District[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setNoResults(false);
      setFocusIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = filterDistricts(districts, query, maxResults);
      setSearchResults(filtered);
      setNoResults(filtered.length === 0);
      setFocusIndex(-1);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, maxResults]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSearchResults([]);
    setNoResults(false);
    setFocusIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    searchResults,
    noResults,
    focusIndex,
    setFocusIndex,
    clearSearch,
  };
}
