// GameB.tsx
import React from 'react';
import { Theme } from '../types';
import { X } from 'lucide-react';

interface GameBProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const GameB: React.FC<GameBProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`w-[900px] h-full rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-600 rounded-full p-2 hover:bg-gray-500 transition duration-200"
          aria-label="Close"
        >
          <X size={24} className="text-white" />
        </button>
        <div className="w-full h-full">
          <iframe
            src="https://innkeeping.github.io/gameB/"
            className="w-full h-full border-0"
            title="GameB Content"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default GameB;