import type { Stage } from '../types/schedule';

interface StageScheduleProps {
  stage: Stage;
}

export function StageSchedule({ stage }: StageScheduleProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
        🎵 {stage.name}
      </h2>

      {stage.days.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-8">
          <h3 className="text-xl font-semibold text-pink-700 mb-4 border-b-2 border-pink-200 pb-2">
            {day.date}
          </h3>

          <div className="space-y-3">
            {day.slots.map((slot, slotIndex) => (
              <div
                key={slotIndex}
                className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors"
              >
                <span className="text-sm font-mono text-gray-600 whitespace-nowrap">
                  {slot.startTime} - {slot.endTime}
                </span>
                <span className="font-medium text-gray-900">{slot.artist}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}