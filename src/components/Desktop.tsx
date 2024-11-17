// src/Desktop.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ShortcutGrid from './ShortcutGrid';
import LinkGrid from './LinkGrid';
import Toolbar from './Toolbar';
import TimeZonesModal from './TimeZonesModal';
import { shortcuts } from '../data/shortcuts';
import linksData from '../data/links.json';
import { Theme, Link, DescribedLink, NetworkLink } from '../types';
import { Timer } from 'lucide-react'; // Import the Tomato icon
import PomodoroModal from './PomodoroModal';

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<Theme>('purple');
  const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(0);
  const [isTimeZonesModalOpen, setIsTimeZonesModalOpen] = useState(false);

  const allLinks: Link[] = Object.values(linksData).flat();

  const filteredShortcuts = shortcuts.filter(shortcut =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
    shortcut.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLinks = allLinks.filter(link => {
    const lowerSearch = search.toLowerCase();
    const lowerName = link.name.toLowerCase();

    if ('description' in link && 'category' in link) {
      const linkWithDescriptionAndCategory = link as DescribedLink;
      return (
        lowerName.includes(lowerSearch) ||
        linkWithDescriptionAndCategory.description.toLowerCase().includes(lowerSearch) ||
        (linkWithDescriptionAndCategory.category && linkWithDescriptionAndCategory.category.toLowerCase().includes(lowerSearch))
      );
    } else if ('description' in link) {
      const linkWithDescription = link as DescribedLink;
      return (
        lowerName.includes(lowerSearch) ||
        linkWithDescription.description.toLowerCase().includes(lowerSearch)
      );
    } else if ('category' in link) {
      const linkWithCategory = link as NetworkLink;
      return (
        lowerName.includes(lowerSearch) ||
        (linkWithCategory.category && linkWithCategory.category.toLowerCase().includes(lowerSearch))
      );
    } else {
      return lowerName.includes(lowerSearch);
    }
  });

  const themeClasses = {
    purple: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    green: 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900',
    teal: 'bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900',
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const searchTerms = ['clock', 'time', 'utc'];
    if (searchTerms.some(term => search.toLowerCase().includes(term))) {
      setIsTimeZonesModalOpen(true);
      setSearch(''); // Reset the search query
    }
  }, [search]);

  return (
    <div className={`relative min-h-screen ${themeClasses[theme]} p-6 overflow-hidden`}>
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgaTExMC0xMCBMMTAgaDQwIE0wIDIwIEwgNDAgMjAgaTExMC0yMCBMMTAgaDQwIE0wIDMwIEwgNDAgMzAgaTExMC0zMCBMMTAgaDQwIE0zMCAwIEwgMzA0MCBMMTAgaDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20`}></div>

      <SearchBar search={search} setSearch={setSearch} theme={theme} />
      <ShortcutGrid shortcuts={filteredShortcuts} theme={theme} />
      {search && <LinkGrid links={filteredLinks} theme={theme} />}

      {isTimerRunning && (
        <div className="absolute top-4 left-4 bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
          <Timer size={24} className="text-red-500" />
          <span className="text-white font-mono">{formatTime(timerTimeLeft)}</span>
        </div>
      )}

      <Toolbar
        theme={theme}
        setTheme={setTheme}
        onPomodoroOpen={() => setIsPomodoroModalOpen(true)}
        onTimeZonesOpen={() => setIsTimeZonesModalOpen(true)} // Pass the onTimeZonesOpen prop
      />

      <PomodoroModal
        isOpen={isPomodoroModalOpen}
        onClose={() => setIsPomodoroModalOpen(false)}
        theme={theme}
        onTimerUpdate={(isRunning, timeLeft) => {
          setIsTimerRunning(isRunning);
          setTimerTimeLeft(timeLeft);
        }}
      />

      <TimeZonesModal
        isOpen={isTimeZonesModalOpen}
        onClose={() => setIsTimeZonesModalOpen(false)}
        theme={theme}
      />
    </div>
  );
};

export default Desktop;