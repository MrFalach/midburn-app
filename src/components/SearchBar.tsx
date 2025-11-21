interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-3">
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 חיפוש דיג'יי"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-amber-950/60 backdrop-blur-sm text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg text-center font-semibold border-2 border-amber-700/50"
        />
      </div>
    </div>
  );
}