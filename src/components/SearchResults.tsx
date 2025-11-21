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
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <p className="text-gray-500 text-lg">😕 לא נמצאו תוצאות עבור "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3">
        <h2 className="text-xl font-bold text-center text-white">
          🔍 תוצאות חיפוש: {results.length} הופעות
        </h2>
      </div>

      <div className="p-3 space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3"
          >
            <div className="font-bold text-lg text-gray-900 mb-1">
              {result.artist}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold text-purple-700">🎵 {result.stageName}</span>
              <span>•</span>
              <span>{result.date}</span>
            </div>
            <div className="text-xs font-mono text-gray-500 mt-1">
              {result.startTime} - {result.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}