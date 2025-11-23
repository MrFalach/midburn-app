import type { Stage } from "../types/schedule";
import { useRef, useEffect, useState } from "react";

interface StageSelectorProps {
  stages: Stage[];
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
  isParadiseUnlocked?: boolean;
  onLockedClick?: () => void;
}

export function StageSelector({
  stages,
  selectedStageId,
  onSelectStage,
  isParadiseUnlocked = false,
  onLockedClick,
}: StageSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  // Scroll to selected stage when it changes
  useEffect(() => {
    if (selectedButtonRef.current && scrollContainerRef.current) {
      const button = selectedButtonRef.current;
      const container = scrollContainerRef.current;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
        behavior: "smooth",
      });
    }
  }, [selectedStageId]);

  return (
    <div className="relative">
      {/* Left arrow indicator */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-2 w-8 flex items-center justify-start pointer-events-none z-10">
          <div className="text-gray-900 animate-pulse bg-amber-100/80 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Right arrow indicator */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-2 w-8 flex items-center justify-end pointer-events-none z-10">
          <div className="text-gray-900 animate-pulse bg-amber-100/80 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 px-6"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {stages.map((stage) => {
          const isDisabled = stage.id === "paradise" && !isParadiseUnlocked;

          return (
            <button
              key={stage.id}
              ref={selectedStageId === stage.id ? selectedButtonRef : null}
              onClick={() => {
                console.log('clicked locked!')
                if (isDisabled && onLockedClick) {
                  onLockedClick();
                } else if (!isDisabled) {
                  onSelectStage(stage.id);
                }
              }}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm transition-all snap-center relative ${
                isDisabled
                  ? "bg-gray-300/50 text-gray-500 cursor-not-allowed opacity-50"
                  : selectedStageId === stage.id
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 text-amber-950 shadow-lg scale-105"
                  : "bg-amber-100/90 text-amber-900 hover:bg-amber-200 active:scale-95"
              }`}
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              {stage.name}
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-0.5 bg-red-600 transform rotate-[-20deg] shadow-lg"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
