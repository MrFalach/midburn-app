interface MapViewProps {
  onClose: () => void;
}

export function MapView({ onClose }: MapViewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-6xl max-h-screen">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gradient-to-br from-amber-400 to-orange-500 text-amber-950 p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={3} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Map image */}
        <div className="w-full h-full overflow-auto bg-white rounded-lg">
          <img 
            src="/midburn-map.png" 
            alt="Midburn Festival Map" 
            className="w-full h-auto"
            style={{ minHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}