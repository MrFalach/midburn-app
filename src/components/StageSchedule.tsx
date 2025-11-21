import type { Stage } from '../types/schedule';

interface StageScheduleProps {
  stage: Stage;
}

export function StageSchedule({ stage }: StageScheduleProps) {
  return (
<div className="rounded-2xl overflow-hidden vintage-shadow burned-edges">      {/* Header with darker vintage top */}
<div className="p-4 border-b-2 border-orange-950/50 relative" style={{
  background: 'linear-gradient(to bottom, #7c2d12, #c2410c, #ea580c)'
}}>        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-center text-amber-100 flex items-center justify-center gap-2 relative z-10" style={{ fontFamily: "'Righteous', sans-serif" }}>
          <span className="text-3xl drop-shadow-lg">🔥</span>
          {stage.name}
        </h2>
      </div>

      {/* Old paper body */}
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
}}><div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none rounded-b-2xl" style={{ mixBlendMode: 'multiply' }}></div>        
        <div className="relative z-10">
          {stage.days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-10 last:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-900/40 to-orange-900/40"></div>
                <h3 className="text-sm font-bold text-orange-950 px-3 py-1 bg-orange-900/20 rounded-full" style={{ fontFamily: "'Righteous', sans-serif" }}>
                  {day.date}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-orange-900/40 to-orange-900/40"></div>
              </div>

              <div className="space-y-1">
                {day.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="flex gap-4 p-3 border-b border-orange-900/20 last:border-b-0 hover:bg-orange-900/10 transition-colors"
                  >
                    <div className="flex-shrink-0 text-orange-950">
                      <div className="text-sm font-mono font-bold whitespace-nowrap">
                        {slot.startTime} – {slot.endTime}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex items-center">
                      <div className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Righteous', sans-serif" }}>
                        {slot.artist}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}