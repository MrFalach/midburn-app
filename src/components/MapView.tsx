interface MapViewProps {
  onClose: () => void;
}

export function MapView({ onClose }: MapViewProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-800 z-50 flex flex-col items-center justify-center p-6">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-red-500/90 hover:bg-red-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="text-center">
        <div className="text-6xl mb-6">🗺️</div>
        <h2 className="text-2xl font-bold text-amber-100 mb-4" style={{ fontFamily: "'Righteous', sans-serif" }}>
          מפת מידברן
        </h2>
        
        {/* View PDF button */}
        <a
          href="/midburn-map.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-4 px-6 py-3 rounded-xl font-bold text-base transition-all border-2 bg-gradient-to-br from-amber-400 to-orange-500 text-amber-950 border-amber-300 shadow-lg hover:scale-105 active:scale-95"
          style={{ fontFamily: "'Righteous', sans-serif" }}
        >
          📱 פתח מפה
        </a>

        {/* Download button */}
        <a
          href="/midburn-map.pdf"
          download="midburn-map.pdf"
          className="inline-block px-6 py-3 rounded-xl font-bold text-base transition-all border-2 bg-gradient-to-br from-green-400 to-green-600 text-white border-green-300 shadow-lg hover:scale-105 active:scale-95"
          style={{ fontFamily: "'Righteous', sans-serif" }}
        >
          📥 הורד מפה
        </a>
      </div>
    </div>
  );
}