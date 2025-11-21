import { useEffect, useState } from 'react';
import { StageSchedule } from './components/StageSchedule';
import { stages } from './data/stages';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [hasSeenBefore, setHasSeenBefore] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // בדוק אם האפליקציה רצה ב-standalone mode (הורדה למסך הבית)
    const standalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    setIsStandalone(standalone);

    // בדוק אם זו הפעם הראשונה
    const hasSeenReady = localStorage.getItem('hasSeenReady');
    setHasSeenBefore(!!hasSeenReady);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log('Service Worker is ready!');
        setIsReady(true);
        
        // הצג הודעה רק אם זו הפעם הראשונה וב-standalone mode
        if (!hasSeenReady && standalone) {
          setShowReadyMessage(true);
          localStorage.setItem('hasSeenReady', 'true');
          
          // הסתר את ההודעה אחרי 3 שניות
          setTimeout(() => {
            setShowReadyMessage(false);
          }, 3000);
        }
      });
    } else {
      setIsReady(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600 p-4 py-8">
      {!isReady && !hasSeenBefore && isStandalone && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg shadow-lg font-semibold text-sm z-50">
          ⏳ טוען את האפליקציה לעבודה אופליין...
        </div>
      )}
      {isReady && showReadyMessage && isStandalone && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-green-900 px-4 py-2 rounded-lg shadow-lg font-semibold text-sm z-50 animate-pulse">
          ✅ מוכן לעבודה אופליין!
        </div>
      )}
      <StageSchedule stage={stages[0]} />
    </div>
  );
}

export default App;