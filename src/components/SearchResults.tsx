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
      <div className="rounded-2xl vintage-shadow burned-edges p-8 text-center relative" style={{
        background: '#f59e0b',
        backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(234, 88, 12, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(252, 211, 77, 0.2) 0%, transparent 70%),
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180, 83, 9, 0.03) 3px, rgba(180, 83, 9, 0.03) 6px),
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(146, 64, 14, 0.03) 3px, rgba(146, 64, 14, 0.03) 6px)
        `,
        boxShadow: 'inset 0 0 100px rgba(180, 83, 9, 0.1)'
      }}>
        <p className="text-orange-950 text-lg font-semibold relative z-10">😕 לא נמצאו תוצאות עבור "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden vintage-shadow burned-edges">
      {/* Header */}
      <div className="p-4 border-b-2 border-orange-950/50 relative" style={{
        background: 'linear-gradient(to bottom, #7c2d12, #c2410c, #ea580c)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        <h2 className="text-xl font-bold text-center text-amber-100 relative z-10" style={{ fontFamily: "'Righteous', sans-serif" }}>
          🔍 תוצאות חיפוש: {results.length} הופעות
        </h2>
      </div>

      {/* Body */}
      <div className="p-4 relative" style={{
        background: '#f59e0b',
        backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(234, 88, 12, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(252, 211, 77, 0.2) 0%, transparent 70%),
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180, 83, 9, 0.03) 3px, rgba(180, 83, 9, 0.03) 6px),
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(146, 64, 14, 0.03) 3px, rgba(146, 64, 14, 0.03) 6px)
        `,
        boxShadow: 'inset 0 0 100px rgba(180, 83, 9, 0.1)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none rounded-b-2xl" style={{ mixBlendMode: 'multiply' }}></div>
        
        <div className="space-y-1 relative z-10">
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
      </div>
    </div>
  );
}