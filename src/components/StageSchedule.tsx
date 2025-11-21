import type { Stage } from '../types/schedule';

interface StageScheduleProps {
  stage: Stage;
}

export function StageSchedule({ stage }: StageScheduleProps) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3">
        <h2 className="text-xl font-bold text-center text-white">
          🎵 {stage.name}
        </h2>
      </div>

      <div className="p-3">
        {stage.days.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4 last:mb-0">
            <h3 className="text-base font-bold text-pink-700 mb-2 pb-2 border-b-2 border-pink-200">
              {day.date}
            </h3>

            <div className="space-y-2">
              {day.slots.map((slot, slotIndex) => (
                <div
                  key={slotIndex}
                  className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="text-xs font-mono text-gray-500 whitespace-nowrap">
                      {slot.startTime}
                    </div>
                    <div className="text-xs font-mono text-gray-400">
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