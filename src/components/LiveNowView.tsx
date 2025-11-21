import { Card } from './Card';

interface LiveSlot {
  stageName: string;
  date: string;
  startTime: string;
  endTime: string;
  artist: string;
}

interface LiveNowViewProps {
  liveSlots: LiveSlot[];
}

export function LiveNowView({ liveSlots }: LiveNowViewProps) {
  if (liveSlots.length === 0) {
    return (
      <Card>
        <div className="text-center py-4">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-orange-950 text-lg font-semibold">אין כרגע הופעות בזמן אמת</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title={`מנגן עכשיו - ${liveSlots.length} במות`} icon="🔴">
      <div className="space-y-3">
        {liveSlots.map((slot, index) => (
          <div
            key={index}
            className="bg-green-400/40 border-l-4 border-green-600 rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 text-xl animate-pulse">▶️</span>
              <div className="font-bold text-xl text-green-900" style={{ fontFamily: "'Righteous', sans-serif" }}>
                {slot.artist}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-950 font-semibold mb-1">
              <span>🎵 {slot.stageName}</span>
            </div>
            <div className="text-sm font-mono text-orange-950 font-bold">
              {slot.startTime} – {slot.endTime}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}