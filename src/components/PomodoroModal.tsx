import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { Theme } from '../types';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const PomodoroModal: React.FC<PomodoroModalProps> = ({ isOpen, onClose, theme }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(currentMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === 'work' ? 'break' : 'work');
    setTimeLeft(currentMode === 'work' ? 5 * 60 : 25 * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-96 rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pomodoro Timer</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`p-3 rounded-lg hover:bg-gray-800/50 ${isRunning ? 'text-red-400' : 'text-green-400'}`}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-lg hover:bg-gray-800/50"
            >
              <RotateCcw size={24} />
            </button>
          </div>
          <button
            onClick={toggleMode}
            className={`px-4 py-2 rounded-lg ${
              currentMode === 'work' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
            }`}
          >
            {currentMode === 'work' ? 'Switch to Break' : 'Switch to Work'}
          </button>
        </div>

        <div className="text-sm opacity-75">
          <h3 className="font-semibold mb-2">About Pomodoro Technique:</h3>
          <p>The Pomodoro Technique is a time management method that uses a timer to break work into focused intervals, traditionally 25 minutes in length, separated by short breaks.</p>
          <ul className="list-disc list-inside mt-2">
            <li>Work for 25 minutes</li>
            <li>Take a 5-minute break</li>
            <li>After 4 pomodoros, take a longer break</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PomodoroModal;