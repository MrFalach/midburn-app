import { LiveNowView } from "./LiveNowView";

interface FullscreenLiveNowProps {
  liveSlots: Array<{
    stageName: string;
    date: string;
    startTime: string;
    endTime: string;
    artist: string;
  }>;
  onClose: () => void;
}

export function FullscreenLiveNow({
  liveSlots,
  onClose,
}: FullscreenLiveNowProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-800 animate-fade-in">
      {/* Header with Live button */}
      <div className="bg-gradient-to-b from-amber-950/95 to-orange-900/95 backdrop-blur-sm shadow-2xl p-4 border-b-4 border-amber-600/50">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 bg-amber-900/50 p-3 rounded-xl text-amber-100 hover:bg-amber-800/60 hover:text-white transition-all border border-amber-700/50 active:scale-95"
            aria-label="Close live view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>

          {/* Live indicator - clickable */}
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-500/50 hover:bg-green-600 active:scale-95 transition-all"
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-lg">LIVE NOW</span>
          </button>

          {/* Empty space for symmetry */}
          <div className="flex-shrink-0 w-12"></div>
        </div>
      </div>

      {/* Live results */}
      <div className="overflow-y-auto h-[calc(100vh-88px)] p-6">
        <LiveNowView liveSlots={liveSlots} />
      </div>
    </div>
  );
}
