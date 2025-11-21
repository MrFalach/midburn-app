import type { Stage } from '../types/schedule';

interface StageScheduleProps {
  stage: Stage;
}

export function StageSchedule({ stage }: StageScheduleProps) {
  return (
    <div className="bg-amber-50 rounded-xl shadow-xl overflow-hidden border-2 border-amber-200">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-3">
        <h2 className="text-xl font-bold text-center text-white">
          🎵 {stage.name}
        </h2>
      </div>

      <div className="p-3">
        {stage.days.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-10 last:mb-0">
            <h3 className="text-base font-bold text-orange-800 mb-2 pb-2 border-b-2 border-orange-300">
              {day.date}
            </h3>

            <div className="space-y-2">
              {day.slots.map((slot, slotIndex) => (
                <div
                  key={slotIndex}
                  className="flex gap-3 p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-amber-200"
                >
                  <div className="flex-shrink-0">
                    <div className="text-xs font-mono text-amber-800 whitespace-nowrap font-semibold">
                      {slot.startTime}
                    </div>
                    <div className="text-xs font-mono text-amber-600">
                      {slot.endTime}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900">
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
  );
}