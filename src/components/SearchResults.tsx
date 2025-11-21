import type { Stage } from '../types/schedule';

interface SearchResultsProps {
  stages: Stage[];
  searchQuery: string;
}

interface SearchResult {
  stageName: string;
  date: string;
  startTime: string;
  endTime: string;
  artist: string;
}

export function SearchResults({ stages, searchQuery }: SearchResultsProps) {
  const results: SearchResult[] = [];

  stages.forEach(stage => {
    stage.days.forEach(day => {
      day.slots.forEach(slot => {
        if (slot.artist.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            stageName: stage.name,
            date: day.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            artist: slot.artist,
          });
        }
      });
    });
  });

  if (results.length === 0) {
    return (
      <div className="old-paper paper-noise rounded-2xl vintage-shadow worn-edges p-8 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none rounded-2xl"></div>
        <p className="text-orange-950 text-lg font-semibold relative z-10">😕 לא נמצאו תוצאות עבור "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden vintage-shadow worn-edges">
      <div className="bg-gradient-to-b from-orange-900 via-orange-800 to-orange-700 p-4 border-b-2 border-orange-950/50 paper-noise relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        <h2 className="text-xl font-bold text-center text-amber-100 relative z-10" style={{ fontFamily: "'Righteous', sans-serif" }}>
          🔍 תוצאות חיפוש: {results.length} הופעות
        </h2>
      </div>

      <div className="old-paper paper-noise p-4 space-y-3 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none rounded-b-2xl"></div>
        
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-orange-900/10 rounded-lg p-3 border-l-4 border-orange-900/50 relative z-10"
          >
            <div className="font-bold text-lg text-gray-900 mb-1" style={{ fontFamily: "'Righteous', sans-serif" }}>
              {result.artist}
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-950 font-semibold">
              <span>🎵 {result.stageName}</span>
              <span>•</span>
              <span>{result.date}</span>
            </div>
            <div className="text-sm font-mono text-orange-900 mt-1 font-bold">
              {result.startTime} – {result.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}