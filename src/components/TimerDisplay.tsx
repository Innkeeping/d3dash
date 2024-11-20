// src/components/TimerDisplay.tsx
import React from 'react';
import { Timer } from 'lucide-react';

interface TimerDisplayProps {
  isTimerRunning: boolean;
  timerTimeLeft: number;
  onClick?: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ isTimerRunning, timerTimeLeft, onClick }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    isTimerRunning && (
      <div
        className="absolute top-4 left-4 bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 cursor-pointer z-50" // Add z-50 for higher z-index
        onClick={onClick}
      >
        <Timer size={24} className="text-red-500" />
        <span className="text-white font-mono">{formatTime(timerTimeLeft)}</span>
      </div>
    )
  );
};

export default TimerDisplay;