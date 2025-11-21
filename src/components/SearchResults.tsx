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
      <div className="bg-amber-50 rounded-xl shadow-xl p-8 text-center border-2 border-amber-200">
        <p className="text-amber-800 text-lg">😕 לא נמצאו תוצאות עבור "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 rounded-xl shadow-xl overflow-hidden border-2 border-amber-200">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-3">
        <h2 className="text-xl font-bold text-center text-white">
          🔍 תוצאות חיפוש: {results.length} הופעות
        </h2>
      </div>

      <div className="p-3 space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-3 border border-amber-200"
          >
            <div className="font-bold text-lg text-gray-900 mb-1">
              {result.artist}
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <span className="font-semibold">🎵 {result.stageName}</span>
              <span>•</span>
              <span>{result.date}</span>
            </div>
            <div className="text-xs font-mono text-amber-700 mt-1 font-semibold">
              {result.startTime} - {result.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}