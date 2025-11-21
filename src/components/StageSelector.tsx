import type { Stage } from '../types/schedule';

interface StageSelectorProps {
  stages: Stage[];
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
}

export function StageSelector({ stages, selectedStageId, onSelectStage }: StageSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => onSelectStage(stage.id)}
          className={`px-3 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
            selectedStageId === stage.id
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-amber-950 shadow-lg shadow-amber-500/30 border-amber-300 scale-105'
              : 'bg-amber-100/90 text-amber-900 border-amber-800/70 hover:bg-amber-200 hover:border-amber-700 active:scale-95 shadow-md'
          }`}
          style={{ fontFamily: "'Righteous', sans-serif" }}
        >
          {stage.name}
        </button>
      ))}
    </div>
  );
}