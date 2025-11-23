import { useState } from 'react';

interface PasswordPromptProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function PasswordPrompt({ onClose, onSuccess }: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === '1122') {
      onSuccess();
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setPassword('');
    }
  };

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      setPassword(password + num);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center text-amber-900 mb-2" style={{ fontFamily: "'Righteous', sans-serif" }}>
          🔐 הזן קוד
        </h3>
        <p className="text-center text-gray-600 text-sm mb-6">
          הזן קוד סודי לפתיחת במות נסתרת
        </p>

        {/* Password display */}
        <div className={`flex justify-center gap-3 mb-6 transition-all ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold transition-all ${
                password.length > i
                  ? error
                    ? 'bg-red-400 text-white'
                    : 'bg-amber-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {password.length > i ? '•' : ''}
            </div>
          ))}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="h-14 bg-white rounded-lg text-2xl font-bold text-gray-800 hover:bg-amber-100 active:scale-95 transition-all shadow-md"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="h-14 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
            </svg>
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="h-14 bg-white rounded-lg text-2xl font-bold text-gray-800 hover:bg-amber-100 active:scale-95 transition-all shadow-md"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={password.length !== 4}
            className="h-14 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        </div>

        {error && (
          <p className="text-center text-red-600 text-sm font-semibold">
            קוד שגוי, נסה שוב
          </p>
        )}
      </div>
    </div>
  );
}