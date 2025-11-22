import { useRef } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onSearchChange("");
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    inputRef.current?.blur();
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="🔍 חיפוש דיג'יי"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlur();
            }
          }}
          className="w-full px-4 py-3 pr-12 rounded-xl bg-amber-950/60 backdrop-blur-sm text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg text-right font-semibold border-2 border-amber-700/50"
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-300 hover:text-amber-100 transition-colors p-1"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
