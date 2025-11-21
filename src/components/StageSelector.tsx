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
          className={`px-3 py-2 rounded-lg font-bold text-xs transition-all ${
            selectedStageId === stage.id
              ? 'bg-white text-purple-900 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30 active:scale-95'
          }`}
        >
          {stage.name}
        </button>
      ))}
    </div>
  );
}