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

  const selectedStage = stages.find(stage => stage.id === selectedStageId) || stages[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-600">
      {!isReady && !hasSeenBefore && isStandalone && (
        <div className="fixed top-2 left-2 right-2 bg-amber-400 text-amber-900 px-3 py-2 rounded-lg shadow-lg font-semibold text-sm z-50 text-center">
          ⏳ טוען את האפליקציה לעבודה אופליין...
        </div>
      )}
      {isReady && showReadyMessage && isStandalone && (
        <div className="fixed top-2 left-2 right-2 bg-green-400 text-green-900 px-3 py-2 rounded-lg shadow-lg font-semibold text-sm z-50 animate-pulse text-center">
          ✅ מוכן לעבודה אופליין!
        </div>
      )}
      
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-amber-900 via-orange-900 to-amber-800 shadow-lg z-40 px-3 py-3">
        <h1 className="text-xl font-bold text-center text-amber-100 mb-2">
          🔥 Midburn Schedule
        </h1>
        
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        {!searchQuery && (
          <StageSelector 
            stages={stages}
            selectedStageId={selectedStageId}
            onSelectStage={setSelectedStageId}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="p-3">
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