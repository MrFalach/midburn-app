import type { Stage } from '../types/schedule';
import { Card } from './Card';

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
      <Card>
        <div className="text-center py-4">
          <p className="text-orange-950 text-lg font-semibold">😕 לא נמצאו תוצאות עבור "{searchQuery}"</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title={`תוצאות חיפוש: ${results.length} הופעות`} icon="🔍">
      <div className="space-y-1">
        {results.map((result, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-3 border-b border-orange-900/20 last:border-b-0"
          >
            <div className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Righteous', sans-serif" }}>
              {result.artist}
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-950 font-semibold">
              <span>🎵 {result.stageName}</span>
              <span>•</span>
              <span>{result.date}</span>
            </div>
            <div className="text-sm font-mono text-orange-950 font-bold">
              {result.startTime} – {result.endTime}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}