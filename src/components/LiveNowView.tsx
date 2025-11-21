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
      <div className="rounded-2xl vintage-shadow burned-edges p-8 text-center relative mx-6" style={{
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
        <div className="text-6xl mb-4">🎵</div>
        <p className="text-orange-950 text-lg font-semibold">אין כרגע הופעות בזמן אמת</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden vintage-shadow burned-edges mx-6">
      <div className="p-4 border-b-2 border-orange-950/50 relative" style={{
        background: 'linear-gradient(to bottom, #7c2d12, #c2410c, #ea580c)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        <h2 className="text-xl font-bold text-center text-amber-100 relative z-10 flex items-center justify-center gap-2" style={{ fontFamily: "'Righteous', sans-serif" }}>
          <span className="text-2xl animate-pulse">🔴</span>
          מנגן עכשיו - {liveSlots.length} במות
        </h2>
      </div>

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
        
        <div className="space-y-3 relative z-10">
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
      </div>
    </div>
  );
}