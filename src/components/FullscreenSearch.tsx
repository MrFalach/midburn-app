import { useRef, useEffect } from 'react';
import { SearchResults } from './SearchResults';
import type { Stage } from '../types/schedule';

interface FullscreenSearchProps {
  stages: Stage[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
}

export function FullscreenSearch({ stages, searchQuery, onSearchChange, onClose }: FullscreenSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();

    // ESC to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-800 animate-fade-in">
      {/* Header with search */}
      <div className="bg-gradient-to-b from-amber-950/95 to-orange-900/95 backdrop-blur-sm shadow-2xl p-4 border-b-4 border-amber-600/50">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 bg-amber-900/50 p-3 rounded-xl text-amber-100 hover:bg-amber-800/60 hover:text-white transition-all border border-amber-700/50 active:scale-95"
            aria-label="Close search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Search input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="🔍 חיפוש דיג'יי"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  inputRef.current?.blur();
                }
              }}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-md text-amber-100 placeholder-amber-300/60 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all text-right border border-white/20 text-lg"
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
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="overflow-y-auto h-[calc(100vh-88px)] p-6">
        {searchQuery ? (
          <SearchResults 
            stages={stages}
            searchQuery={searchQuery}
          />
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-amber-200 text-lg">התחל להקליד לחיפוש דיג'יי...</p>
          </div>
        )}
      </div>
    </div>
  );
}