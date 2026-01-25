import { Input } from "@/shared/ui/Input.tsx";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  placeholder?: string;
}

function SearchInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  placeholder = "장소 검색 (시, 구, 동)",
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:h-5 sm:w-5" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        className="h-10 pl-9 text-sm sm:h-12 sm:pl-11 sm:text-base"
      />
    </div>
  );
}

export default SearchInput;
