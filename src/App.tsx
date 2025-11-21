import { useEffect, useState } from 'react';
import { StageSchedule } from './components/StageSchedule';
import { StageSelector } from './components/StageSelector';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { stages } from './data/stages';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [hasSeenBefore, setHasSeenBefore] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(stages[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    setIsStandalone(standalone);

    const hasSeenReady = localStorage.getItem('hasSeenReady');
    setHasSeenBefore(!!hasSeenReady);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log('Service Worker is ready!');
        setIsReady(true);
        
        if (!hasSeenReady && standalone) {
          setShowReadyMessage(true);
          localStorage.setItem('hasSeenReady', 'true');
          
          setTimeout(() => {
            setShowReadyMessage(false);
          }, 3000);
        }
      });
    } else {
      setIsReady(true);
    }
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedStage = stages.find(stage => stage.id === selectedStageId) || stages[0];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate header visibility based on scroll position
  const headerOpacity = Math.max(0, 1 - scrollY / 300);
  const headerTranslateY = Math.min(scrollY / 2, 150);
  const showScrollButton = scrollY > 200;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-800 desert-texture">
      {/* Tribal pattern decoration - top */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-60 z-50"></div>
      
      {!isReady && !hasSeenBefore && isStandalone && (
        <div className="fixed top-4 left-2 right-2 bg-amber-400 text-amber-900 px-3 py-2 rounded-lg shadow-lg font-semibold text-sm z-50 text-center">
          ⏳ טוען את האפליקציה לעבודה אופליין...
        </div>
      )}
      {isReady && showReadyMessage && isStandalone && (
        <div className="fixed top-4 left-2 right-2 bg-green-400 text-green-900 px-3 py-2 rounded-lg shadow-lg font-semibold text-sm z-50 animate-pulse text-center">
          ✅ מוכן לעבודה אופליין!
        </div>
      )}
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-50 bg-gradient-to-br from-amber-400 to-orange-500 text-amber-950 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={3} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}
      
      {/* Header with scroll animation */}
      <div 
        className="fixed top-0 left-0 right-0 bg-gradient-to-b from-amber-950/95 to-orange-900/95 backdrop-blur-sm shadow-2xl z-40 px-4 pt-6 pb-5 border-b-4 border-amber-600/50 min-h-[240px] transition-all duration-300 ease-out"
        style={{
          opacity: headerOpacity,
          transform: `translateY(-${headerTranslateY}px)`,
          pointerEvents: headerOpacity < 0.3 ? 'none' : 'auto'
        }}
      >
        {/* Sun decoration */}
        <div className="flex justify-center mb-3">
          <div className="relative w-12 h-12 sun-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 shadow-lg shadow-orange-500/50"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 to-orange-400 flex items-center justify-center">
              <span className="text-xl">☀️</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-amber-100 mb-1 tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>
          MIDBURN
        </h1>
        <h2 className="text-lg font-semibold text-center text-amber-300 mb-5 tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          SCHEDULE
        </h2>
        
        {/* Tribal divider */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-600"></div>
          <div className="text-amber-500 text-xs">▲ ▼ ▲</div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-600"></div>
        </div>
        
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className={searchQuery ? 'invisible h-0 overflow-hidden' : ''}>
          <StageSelector 
            stages={stages}
            selectedStageId={selectedStageId}
            onSelectStage={setSelectedStageId}
          />
        </div>
      </div>
      
      {/* Spacer for fixed header */}
      <div className="h-[400px]"></div>
      
      {/* Content */}
      <div className="px-6 pt-6 pb-10">
        {searchQuery ? (
          <SearchResults 
            stages={stages}
            searchQuery={searchQuery}
          />
        ) : (
          <StageSchedule stage={selectedStage} />
        )}
      </div>
    </div>
  );
}

export default App;