import { useCallback, useEffect, useState } from "react";
import { filterDistricts } from "@/features/search-district/lib/filterDistricts.ts";
import type { District } from "@/entities/district/model/type.ts";
import { useDistricts } from "@/entities/district/model/queries.ts";

interface UseDistrictSearchOptions {
  debounceMs?: number;
  maxResults?: number;
}

interface UseDistrictSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  searchResults: District[];
  isResults: boolean;
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  clearSearch: () => void;
}

export function useDistrictSearch(options: UseDistrictSearchOptions = {}): UseDistrictSearchReturn {
  const { debounceMs = 300, maxResults = 20 } = options;
  const { data: districts } = useDistricts();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<District[]>([]);
  const [isResults, setIsResults] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsResults(false);
        setFocusIndex(-1);
        return;
      }

      const filtered = filterDistricts(districts, query, maxResults);
      setSearchResults(filtered);
      setIsResults(filtered.length === 0);
      setFocusIndex(-1);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, maxResults]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSearchResults([]);
    setIsResults(false);
    setFocusIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    searchResults,
    isResults,
    focusIndex,
    setFocusIndex,
    clearSearch,
  };
}
