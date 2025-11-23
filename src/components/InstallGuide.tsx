import { useState } from "react";

interface InstallGuideProps {
  onClose: () => void;
}

export function InstallGuide({ onClose }: InstallGuideProps) {
  const [selectedOS, setSelectedOS] = useState<"ios" | "android" | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // iOS steps - תוסיף את התמונות שלך
  const iosSteps = [
    {
      image: "/install-ios-1.png",
      title: "שלב 1",
      description: "לחץ על כפתור השיתוף בתחתית המסך",
    },
    {
      image: "/install-ios-2.png",
      title: "שלב 2",
      description: 'לחץ על כפתור עם 3 נקודות',
    },
    {
      image: "/install-ios-3.png",
      title: "שלב 3",
      description: 'לחץ Add to Home Screen'
    },
    {
      image: "/install-ios-4.png",
      title: "שלב 4",
      description: 'לחץ על Add',
    },
  ];

  // Android steps - תוכל להוסיף תמונות גם לזה
  const androidSteps = [
    {
      image: null,
      title: "שלב 1",
      description: "לחץ על תפריט (3 נקודות) בפינה הימנית העליונה",
    },
    {
      image: null,
      title: "שלב 2",
      description: 'בחר "התקן אפליקציה" או "הוסף למסך הבית"',
    },
    {
      image: null,
      title: "שלב 3",
      description: "אשר את ההתקנה והאפליקציה תתווסף למסך הבית!",
    },
  ];

  const steps = selectedOS === "ios" ? iosSteps : androidSteps;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white hover:scale-110 transition-transform"
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
          <h2
            className="text-xl font-bold text-center text-white"
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            📥 מדריך התקנה
          </h2>
          <p className="text-center text-amber-100 text-sm mt-1">
            לשימוש אופליין ללא חיבור אינטרנט
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {!selectedOS ? (
            /* OS Selection */
            <div className="space-y-4">
              <p className="text-center text-gray-700 mb-6">
                בחר את סוג המכשיר שלך:
              </p>
              <button
                onClick={() => setSelectedOS("ios")}
                className="w-full p-4 bg-white rounded-xl border-2 border-gray-300 hover:border-amber-500 hover:shadow-lg transition-all flex items-center justify-center gap-3"
              >
                <span className="text-4xl">🍎</span>
                <span className="font-bold text-lg text-black ">
                  iPhone / iPad
                </span>
              </button>
              <button
                onClick={() => setSelectedOS("android")}
                className="w-full p-4 bg-white rounded-xl border-2 border-gray-300 hover:border-amber-500 hover:shadow-lg transition-all flex items-center justify-center gap-3"
              >
                <span className="text-4xl">🤖</span>
                <span className="font-bold text-lg text-black">Android</span>
              </button>
            </div>
          ) : (
            /* Steps */
            <div>
              {/* Back button */}
              <button
                onClick={() => {
                  setSelectedOS(null);
                  setCurrentStep(0);
                }}
                className="mb-4 text-amber-700 hover:text-amber-900 flex items-center gap-1 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                חזרה
              </button>

              {/* Step indicator */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? "w-8 bg-amber-600"
                        : index < currentStep
                        ? "w-2 bg-amber-400"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Current step */}
              <div className="text-center">
                <h3
                  className="text-2xl font-bold text-amber-900 mb-2"
                  style={{ fontFamily: "'Righteous', sans-serif" }}
                >
                  {steps[currentStep].title}
                </h3>

                {steps[currentStep].image && (
                  <div className="my-6 bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={steps[currentStep].image}
                      alt={steps[currentStep].title}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    ← הקודם
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    הבא →
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    ✓ סיימתי
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
