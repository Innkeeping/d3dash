import React, { useRef, useEffect, useState } from 'react';
import { X, Clock } from 'lucide-react';
import { Theme } from '../types';

interface TimeZonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const TimeZonesModal: React.FC<TimeZonesModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeZones = [
    { label: 'UTC (GMT)', value: 'UTC' },
    { label: 'Pacific/Auckland', value: 'Pacific/Auckland' },
    { label: 'Europe/London', value: 'Europe/London' },
    { label: 'Europe/Berlin', value: 'Europe/Berlin' },
    { label: 'America/New_York', value: 'America/New_York' },
    { label: 'America/Los_Angeles', value: 'America/Los_Angeles' },
    { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
    { label: 'Asia/Shanghai', value: 'Asia/Shanghai' },
    { label: 'Asia/Kolkata', value: 'Asia/Kolkata' },
    { label: 'Australia/Sydney', value: 'Australia/Sydney' },
    { label: 'America/Sao_Paulo', value: 'America/Sao_Paulo' },
    { label: 'America/Mexico_City', value: 'America/Mexico_City' },
    { label: 'America/Toronto', value: 'America/Toronto' },
    { label: 'Europe/Moscow', value: 'Europe/Moscow' },
    { label: 'Asia/Dubai', value: 'Asia/Dubai' },
    { label: 'America/Vancouver', value: 'America/Vancouver' },
    { label: 'America/Chicago', value: 'America/Chicago' },
    { label: 'Europe/Paris', value: 'Europe/Paris' },
    { label: 'Asia/Seoul', value: 'Asia/Seoul' },
    { label: 'America/Denver', value: 'America/Denver' },
  ];

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timeZone,
      hour12: false,
    });
  };

  const formatTimeZoneOffset = (timeZone: string) => {
    const date = new Date();
    const options = { timeZone: timeZone, timeZoneName: 'shortOffset' } as const;
    const formatted = date.toLocaleTimeString('en-US', options);
    const offset = formatted.split(' ').pop();
    return offset || '';
  };

  useEffect(() => {
    // Add event listener for clicks outside the modal
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">World Clock</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {timeZones.map((tz) => (
            <div
              key={tz.value}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                <Clock className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{tz.label}</h3>
                <p className="text-sm opacity-75">
                  {formatTime(currentTime, tz.value)} {tz.value !== 'UTC' && formatTimeZoneOffset(tz.value)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm opacity-75">
          <p>Current time in various time zones with UTC at the top and relative offsets from UTC.</p>
        </div>
      </div>
    </div>
  );
};

export default TimeZonesModal;