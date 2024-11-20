// src/components/TimeZonesModal.tsx
import React, { useRef, useEffect, useState } from 'react';
import { X, Clock } from 'lucide-react';
import { Theme } from '../types';
import { timeZonesWithCities } from '../data/timeZonesWithCities';

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
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

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
    return offset ? offset.replace('GMT', 'UTC') : '';
  };

  const getTimeZoneOffset = (timeZone: string) => {
    const date = new Date();
    const options = { timeZone: timeZone, timeZoneName: 'shortOffset' } as const;
    const formatted = date.toLocaleTimeString('en-US', options);
    const offset = formatted.split(' ').pop();
    if (!offset) return 0;

    const [sign, hours, minutes] = offset.match(/([+-])(\d{2}):(\d{2})/)?.slice(1) || ['+', '0', '0'];
    const totalMinutes = (parseInt(hours) * 60 + parseInt(minutes)) * (sign === '+' ? 1 : -1);
    return totalMinutes;
  };

  const sortedTimeZones = [...timeZonesWithCities].sort((a, b) => {
    return getTimeZoneOffset(a.value) - getTimeZoneOffset(b.value);
  });

  const normalizeOffset = (offset: string) => {
    return offset
      .replace(/GMT/g, 'UTC')
      .replace(/\s+/g, '')
      .toLowerCase();
  };

  const extractOffsetFromQuery = (query: string) => {
    const match = query.match(/(UTC|GMT)\s*([+-]?\d+)/i);
    if (match) {
      return normalizeOffset(match[1] + match[2]);
    }
    return normalizeOffset(query);
  };

  const formatOffsetForComparison = (offset: string) => {
    return offset.replace(/UTC([+-])(\d+)/, 'UTC$1$2');
  };

  const filteredTimeZones = sortedTimeZones.filter(tz => {
    const labelMatch = tz.label.toLowerCase().includes(normalizeOffset(searchQuery));
    const cityMatch = tz.cities.some(city =>
      city.toLowerCase().includes(normalizeOffset(searchQuery))
    );
    const countryMatch = tz.country && tz.country.toLowerCase().includes(normalizeOffset(searchQuery));
    const timezoneMatch = tz.timezone && normalizeOffset(tz.timezone).includes(normalizeOffset(searchQuery));
    const offsetMatch = formatTimeZoneOffset(tz.value)
      .toLowerCase()
      .includes(formatOffsetForComparison(extractOffsetFromQuery(searchQuery)));

    return labelMatch || cityMatch || countryMatch || timezoneMatch || offsetMatch;
  });

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

        <div className="mb-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search time zones, cities, or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-4">
          {filteredTimeZones.length > 0 ? (
            filteredTimeZones.map((tz) => (
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
                  {tz.cities.length > 0 && (
                    <p className="text-xs opacity-50">
                      Cities: {tz.cities.join(', ')}
                    </p>
                  )}
                  {tz.country && (
                    <p className="text-xs opacity-50">
                      Country: {tz.country}
                    </p>
                  )}
                  {tz.timezone && (
                    <p className="text-xs opacity-50">
                      Timezone: {tz.timezone.replace('GMT', 'UTC')}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No time zones, cities, or countries found for "{searchQuery}"
            </div>
          )}
        </div>

        <div className="mt-6 text-sm opacity-75">
          <p>Current time in various time zones with UTC at the top and relative offsets from UTC.</p>
        </div>
      </div>
    </div>
  );
};

export default TimeZonesModal;