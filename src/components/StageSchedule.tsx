import type { Stage } from '../types/schedule';
import { useEffect, useRef } from 'react';
import { Card } from './Card';

interface StageScheduleProps {
  stage: Stage;
}

function parseDate(dateString: string): Date | null {
  const parts = dateString.split(' ');
  if (parts.length < 2) return null;
  
  const [day, month] = parts[1].split('.').map(Number);
  const currentYear = new Date().getFullYear();
  
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
  
  if (endTimeInMinutes < startTimeInMinutes) {
    endTimeInMinutes += 24 * 60;
    if (currentTimeInMinutes < 720) {
      return currentTimeInMinutes + 24 * 60 >= startTimeInMinutes && currentTimeInMinutes + 24 * 60 < endTimeInMinutes;
    }
  }
  
  return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
}

export function StageSchedule({ stage }: StageScheduleProps) {
  const liveSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      // Force re-render every minute
      return;
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (liveSlotRef.current) {
      setTimeout(() => {
        liveSlotRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 300);
    }
  }, [stage.id]);

  return (
    <Card title={stage.name} icon="🔥">
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
                  ref={isPlaying ? liveSlotRef : null}
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
    </Card>
  );
}