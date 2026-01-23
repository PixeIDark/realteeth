import { useCallback } from "react";

interface UseListKeyboardNavOptions<T> {
  items: T[];
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (item: T) => void;
  onEscape?: () => void;
}

export function useListKeyboardNav<T>({
  items,
  focusIndex,
  setFocusIndex,
  onSelect,
  onEscape,
}: UseListKeyboardNavOptions<T>) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (items.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusIndex >= 0) {
            onSelect(items[focusIndex]);
          } else if (items.length > 0) {
            onSelect(items[0]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onEscape?.();
          break;
      }
    },
    [items, focusIndex, setFocusIndex, onSelect, onEscape]
  );

  return { handleKeyDown };
}
