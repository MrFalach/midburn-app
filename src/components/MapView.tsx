interface MapViewProps {
  onClose: () => void;
}

export function MapView({ onClose }: MapViewProps) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-full h-full">
        <iframe
          src="/midburn-map.pdf#toolbar=0&navpanes=0&scrollbar=0"
          className="w-full h-full border-0"
          title="Midburn Map"
        />
      </div>

      {/* Download button - minimal */}
      <a
        href="/midburn-map.pdf"
        download="midburn-map.pdf"
        className="fixed bottom-6 left-4 z-50 p-3 rounded-full bg-amber-500/90 hover:bg-amber-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </a>
    </div>
  );
}
