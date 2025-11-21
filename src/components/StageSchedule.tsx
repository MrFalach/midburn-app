import type { Stage } from '../types/schedule';
// import { useState, useEffect } from 'react';

interface StageScheduleProps {
  stage: Stage;
}

function parseDate(dateString: string): Date | null {
  // Parse "Monday 24.11" format
  const parts = dateString.split(' ');
  if (parts.length < 2) return null;
  
  const [day, month] = parts[1].split('.').map(Number);
  const currentYear = new Date().getFullYear();
  
  // Create date with current year
  return new Date(currentYear, month - 1, day);
}

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

function isSlotPlaying(dateString: string, startTime: string, endTime: string): boolean {
  const slotDate = parseDate(dateString);
  if (!slotDate) return false;
  
  const now = new Date();
  
  // Check if it's the correct day
  if (!isSameDay(slotDate, now)) {
    return false;
  }

  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  let startTimeInMinutes = startHours * 60 + startMinutes;
  let endTimeInMinutes = endHours * 60 + endMinutes;
  
  // Handle times that cross midnight
  if (endTimeInMinutes < startTimeInMinutes) {
    endTimeInMinutes += 24 * 60;
    if (currentTimeInMinutes < 720) {
      return currentTimeInMinutes + 24 * 60 >= startTimeInMinutes && currentTimeInMinutes + 24 * 60 < endTimeInMinutes;
    }
  }
  
  return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
}

export function StageSchedule({ stage }: StageScheduleProps) {
  // const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 60000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="rounded-2xl overflow-hidden vintage-shadow burned-edges">
      <div className="p-4 border-b-2 border-orange-950/50 relative" style={{
        background: 'linear-gradient(to bottom, #7c2d12, #c2410c, #ea580c)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-center text-amber-100 flex items-center justify-center gap-2 relative z-10" style={{ fontFamily: "'Righteous', sans-serif" }}>
          <span className="text-3xl drop-shadow-lg">🔥</span>
          {stage.name}
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
                {day.slots.map((slot, slotIndex) => {
                  const isPlaying = isSlotPlaying(day.date, slot.startTime, slot.endTime);
                  
                  return (
                    <div
                      key={slotIndex}
                      className={`flex gap-4 p-3 border-b border-orange-900/20 last:border-b-0 transition-all ${
                        isPlaying 
                          ? 'bg-green-400/40 border-l-4 border-green-600 shadow-lg' 
                          : 'hover:bg-orange-900/10'
                      }`}
                    >
                      <div className="flex-shrink-0 text-orange-950 flex items-center gap-2">
                        {isPlaying && <span className="text-green-600 text-lg animate-pulse">▶️</span>}
                        <div>
                          <div className="text-sm font-mono font-bold whitespace-nowrap">
                            {slot.startTime} – {slot.endTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-base ${isPlaying ? 'text-green-900' : 'text-gray-900'}`} style={{ fontFamily: "'Righteous', sans-serif" }}>
                          {slot.artist}
                        </div>
                        {isPlaying && (
                          <span className="inline-block mt-1 text-xs bg-green-600 text-white px-2 py-1 rounded-full whitespace-nowrap">
                            LIVE NOW
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}