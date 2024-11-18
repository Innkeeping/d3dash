// src/components/PomodoroModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { Theme } from '../types';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
}

const PomodoroModal: React.FC<PomodoroModalProps> = ({ isOpen, onClose, theme, onTimerUpdate }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState<'work' | 'break'>('work');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (interval) clearInterval(interval);
      setShowNotification(true);
      setNotificationMessage(currentMode === 'work' ? 'Work Time Over!' : 'Break Time Over!');
      setTimeout(() => setShowNotification(false), 3000);
      toggleMode();
    }


    onTimerUpdate(isRunning, timeLeft);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, currentMode, onTimerUpdate]);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(currentMode === 'work' ? 25 * 60 : 5 * 60);
    setShowNotification(false);
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === 'work' ? 'break' : 'work');
    setTimeLeft(currentMode === 'work' ? 5 * 60 : 25 * 60);
    setIsRunning(false);
    setShowNotification(false);
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
      <div
        ref={modalRef}
        className={`w-96 rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 relative`}
      >
        {showNotification && (
          <div className="absolute top-0 left-0 w-full bg-green-500 text-white p-3 text-center rounded-t-lg">
            {notificationMessage}
          </div>
        )}
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