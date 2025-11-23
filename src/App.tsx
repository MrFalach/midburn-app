import { useEffect, useState } from "react";
import { StageSchedule } from "./components/StageSchedule";
import { StageSelector } from "./components/StageSelector";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { LiveNowView } from "./components/LiveNowView";
import { MapView } from "./components/MapView";
import { InstallGuide } from "./components/InstallGuide";
import { PasswordPrompt } from "./components/PasswordPrompt";
import { stages } from "./data/stages";
import { Toast } from "./components/Toast";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [hasSeenBefore, setHasSeenBefore] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(stages[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [showLiveNow, setShowLiveNow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [isParadiseUnlocked, setIsParadiseUnlocked] = useState(() => {
    return localStorage.getItem("paradiseUnlocked") === "true";
  });
  const [showLockedToast, setShowLockedToast] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    setIsStandalone(standalone);

    // Check if user dismissed the install prompt before
    const hasSeenInstallPrompt = localStorage.getItem("hasSeenInstallPrompt");

    // Show install prompt only if:
    // 1. Not in standalone mode (not installed)
    // 2. Haven't seen the prompt before
    // 3. On mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!standalone && !hasSeenInstallPrompt && isMobile) {
      // Show after 3 seconds
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    }

    const hasSeenReady = localStorage.getItem("hasSeenReady");
    setHasSeenBefore(!!hasSeenReady);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log("Service Worker is ready!");
        setIsReady(true);

        if (!hasSeenReady && standalone) {
          setShowReadyMessage(true);
          localStorage.setItem("hasSeenReady", "true");

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save paradise unlock state
  useEffect(() => {
    if (isParadiseUnlocked) {
      localStorage.setItem("paradiseUnlocked", "true");
    }
  }, [isParadiseUnlocked]);
  const selectedStage =
    stages.find((stage) => stage.id === selectedStageId) || stages[0];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate header visibility based on scroll position
  const headerOpacity = Math.max(0, 1 - scrollY / 300);
  const headerTranslateY = Math.min(scrollY / 2, 150);
  const showScrollButton = scrollY > 200;

  // Get current playing slots
  const getCurrentlyPlaying = () => {
    const results: Array<{
      stageName: string;
      date: string;
      startTime: string;
      endTime: string;
      artist: string;
    }> = [];

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    stages.forEach((stage) => {
      stage.days.forEach((day) => {
        // Parse date
        const parts = day.date.split(" ");
        if (parts.length < 2) return;
        const [dayNum, month] = parts[1].split(".").map(Number);
        const currentYear = now.getFullYear();
        const slotDate = new Date(currentYear, month - 1, dayNum);

        // Check if same day
        if (
          slotDate.getDate() === now.getDate() &&
          slotDate.getMonth() === now.getMonth() &&
          slotDate.getFullYear() === now.getFullYear()
        ) {
          day.slots.forEach((slot) => {
            const [startHours, startMinutes] = slot.startTime
              .split(":")
              .map(Number);
            const [endHours, endMinutes] = slot.endTime.split(":").map(Number);

            let startTimeInMinutes = startHours * 60 + startMinutes;
            let endTimeInMinutes = endHours * 60 + endMinutes;

            if (endTimeInMinutes < startTimeInMinutes) {
              endTimeInMinutes += 24 * 60;
              if (currentTimeInMinutes < 720) {
                const adjustedTime = currentTimeInMinutes + 24 * 60;
                if (
                  adjustedTime >= startTimeInMinutes &&
                  adjustedTime < endTimeInMinutes
                ) {
                  results.push({
                    stageName: stage.name,
                    date: day.date,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    artist: slot.artist,
                  });
                }
              }
            } else {
              if (
                currentTimeInMinutes >= startTimeInMinutes &&
                currentTimeInMinutes < endTimeInMinutes
              ) {
                results.push({
                  stageName: stage.name,
                  date: day.date,
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                  artist: slot.artist,
                });
              }
            }
          });
        }
      });
    });

    return results;
  };

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Map button */}
      <button
        onClick={() => setShowMap(true)}
        className="fixed bottom-6 left-4 z-50 bg-gradient-to-br from-amber-400 to-orange-500 text-amber-950 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
        aria-label="Open map"
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
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>
      </button>

      {/* Header with scroll animation */}
      <div
        className="fixed top-0 left-0 right-0 bg-gradient-to-b from-amber-950/95 to-orange-900/95 backdrop-blur-sm shadow-2xl z-40 px-4 pt-6 pb-5 border-b-4 border-amber-600/50 min-h-[240px] transition-all duration-300 ease-out"
        style={{
          opacity: headerOpacity,
          transform: `translateY(-${headerTranslateY}px)`,
          pointerEvents: headerOpacity < 0.3 ? "none" : "auto",
        }}
      >
        {/* Install Guide Button */}
        <button
          onClick={() => setShowInstallGuide(true)}
          className="absolute top-4 left-4 bg-amber-900/50 p-2 rounded-lg text-amber-100 hover:bg-amber-800/60 hover:text-white transition-all border border-amber-700/50"
          aria-label="Install guide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>

        {/* Sun decoration */}
        <div className="flex justify-center mb-3">
          <div className="relative w-12 h-12 sun-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 shadow-lg shadow-orange-500/50"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 to-orange-400 flex items-center justify-center">
              <span className="text-xl">☀️</span>
            </div>
          </div>
        </div>

        <h1
          className="text-3xl font-bold text-center text-amber-100 mb-1 tracking-wider"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.1em",
          }}
        >
          MIDBURN
        </h1>
        <h2
          className="text-lg font-semibold text-center text-amber-300 mb-2 tracking-widest"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          SCHEDULE
        </h2>

        <div className="flex flex-col items-center justify-center gap-1 mb-4">
          <span
            className="text-sm font-semibold text-gray-800"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            By
          </span>
          <img
            src="/midbar-camp-logo.png"
            alt="Midbar Camp"
            className="h-8 object-contain brightness-0"
          />
        </div>

        {/* Tribal divider */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-600"></div>
          <div className="text-amber-500 text-xs">▲ ▼ ▲</div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-600"></div>
        </div>

        {/* Live Now Button and Search Bar side by side */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setShowLiveNow(!showLiveNow);
              if (!showLiveNow) setSearchQuery("");
            }}
            className={`flex-1 px-4 py-3 rounded-xl text-sm transition-all border whitespace-nowrap ${
              showLiveNow
                ? "bg-green-500 text-white border-green-400 shadow-lg shadow-green-500/50"
                : "bg-amber-900/40 text-amber-100 border-amber-700/60 hover:bg-amber-900/50 hover:border-amber-700/80"
            }`}
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            {showLiveNow ? "🔴 LIVE" : "🎵 LIVE"}
          </button>

          <div className="flex-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                if (query) setShowLiveNow(false);
              }}
            />
          </div>
        </div>

        <div className={searchQuery ? "invisible h-0 overflow-hidden" : ""}>
          <StageSelector
            stages={stages}
            selectedStageId={selectedStageId}
            isParadiseUnlocked={isParadiseUnlocked}
            onLockedClick={() => setShowLockedToast(true)}
            onSelectStage={(stageId) => {
              setSelectedStageId(stageId);
              setShowLiveNow(false);
            }}
          />
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[300px]"></div>

      {/* Content */}
      <div className="px-6 pt-6 pb-10">
        {showLiveNow ? (
          <LiveNowView liveSlots={getCurrentlyPlaying()} />
        ) : searchQuery ? (
          <SearchResults stages={stages} searchQuery={searchQuery} />
        ) : (
          <StageSchedule stage={selectedStage} />
        )}
      </div>

      {/* Footer with credit - clickable */}
      <button
        onClick={() => setShowPasswordPrompt(true)}
        className="fixed bottom-2 left-0 right-0 py-3 text-center text-xs text-amber-300/80 hover:text-amber-200 transition-colors z-30 hover:scale-105 transition-all"
      >
        Made with ❤️ by Sagi Falach
      </button>

      {/* Map view */}
      {showMap && <MapView onClose={() => setShowMap(false)} />}

      {/* Install guide */}
      {showInstallGuide && (
        <InstallGuide onClose={() => setShowInstallGuide(false)} />
      )}

      {/* Install Prompt */}
      {showInstallPrompt && !isStandalone && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
            {/* Close button */}
            <button
              onClick={() => {
                setShowInstallPrompt(false);
                localStorage.setItem("hasSeenInstallPrompt", "true");
              }}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
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

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-2xl font-bold text-center text-amber-900 mb-2"
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              📱 התקן את האפליקציה!
            </h3>

            {/* Description */}
            <p className="text-center text-gray-700 mb-6 leading-relaxed">
              כדי להשתמש באפליקציה <strong>ללא אינטרנט</strong> באירוע, התקן
              אותה עכשיו למסך הבית 🏜️
            </p>

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>עובד אופליין במדבר ללא קליטה</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>גישה מהירה מהמסך הבית</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>לוחות זמנים תמיד זמינים</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowInstallPrompt(false);
                  setShowInstallGuide(true);
                  localStorage.setItem("hasSeenInstallPrompt", "true");
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                📥 הראה לי איך להתקין
              </button>
              <button
                onClick={() => {
                  setShowInstallPrompt(false);
                  localStorage.setItem("hasSeenInstallPrompt", "true");
                }}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                אולי מאוחר יותר
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password prompt */}
      {showPasswordPrompt && (
        <PasswordPrompt
          onClose={() => setShowPasswordPrompt(false)}
          onSuccess={() => setIsParadiseUnlocked(true)}
        />
      )}

      {/* Toast message for locked stage */}
      {showLockedToast && (
        <Toast
          message="הצפייה למנויים בלבד"
          onClose={() => setShowLockedToast(false)}
        />
      )}
    </div>
  );
}

export default App;
