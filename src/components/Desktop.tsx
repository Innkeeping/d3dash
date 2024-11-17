// src/Desktop.tsx
import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import ShortcutGrid from './ShortcutGrid';
import LinkGrid from './LinkGrid';
import Toolbar from './Toolbar';
import { filterShortcuts, filterLinks, allLinks } from '../utils/filtering';
import { useModals } from '../hooks/useModals';
import { useKeyboardEvents } from '../hooks/useKeyboardEvents';
import TimerDisplay from './TimerDisplay';
import Modals from './Modals';

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<'purple' | 'green' | 'teal'>('purple');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(0);
  const [showToolbar, setShowToolbar] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const { isPomodoroModalOpen, isTimeZonesModalOpen, isCryptoPricesModalOpen, openModal, closeModal } = useModals();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filteredShortcuts = filterShortcuts(search);
  const filteredLinks = filterLinks(search, allLinks);

  const themeClasses = {
    purple: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    green: 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900',
    teal: 'bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900',
  };

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  useKeyboardEvents({
    onCtrlK: () => {
      searchInputRef.current?.focus();
      setFocusedIndex(null); // Reset focus index when search bar is focused
    },
    onCtrlB: toggleToolbar,
    onEscape: () => {
      if (isCryptoPricesModalOpen) {
        closeModal('isCryptoPricesModalOpen');
      } else if (isTimeZonesModalOpen) {
        closeModal('isTimeZonesModalOpen');
      } else if (isPomodoroModalOpen) {
        closeModal('isPomodoroModalOpen');
      } else if (showToolbar) {
        toggleToolbar();
      }
    },
  });

  useEffect(() => {
    const searchTerms = ['clock', 'time', 'utc', 'price'];
    const lowerSearch = search.toLowerCase();
    const matchedTerm = searchTerms.find(term => lowerSearch.includes(term));

    if (matchedTerm) {
      if (matchedTerm === 'price') {
        openModal('isCryptoPricesModalOpen');
      } else if (matchedTerm === 'clock' || matchedTerm === 'time' || matchedTerm === 'utc') {
        openModal('isTimeZonesModalOpen');
      }
      setSearch('');
    }
  }, [search, openModal]);

  return (
    <div className={`relative min-h-screen ${themeClasses[theme]} p-6 overflow-hidden`}>
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgaTExMC0xMCBMMTAgaDQwIE0wIDIwIEwgNDAgMjAgaTExMC0yMCBMMTAgaDQwIE0wIDMwIEwgNDAgMzAgaTExMC0zMCBMMTAgaDQwIE0zMCAwIEwgMzA0MCBMMTAgaDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20`}></div>

      <SearchBar search={search} setSearch={setSearch} theme={theme} inputRef={searchInputRef} />
      <ShortcutGrid shortcuts={filteredShortcuts} theme={theme} />
      {search && <LinkGrid links={filteredLinks} theme={theme} />}

      <TimerDisplay
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        onClick={() => openModal('isPomodoroModalOpen')}
      />

      <Toolbar
        theme={theme}
        setTheme={setTheme}
        onPomodoroOpen={() => openModal('isPomodoroModalOpen')}
        onTimeZonesOpen={() => openModal('isTimeZonesModalOpen')}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
      />

      <Modals
        isPomodoroModalOpen={isPomodoroModalOpen}
        isTimeZonesModalOpen={isTimeZonesModalOpen}
        isCryptoPricesModalOpen={isCryptoPricesModalOpen}
        onClosePomodoro={() => closeModal('isPomodoroModalOpen')}
        onCloseTimeZones={() => closeModal('isTimeZonesModalOpen')}
        onCloseCryptoPrices={() => closeModal('isCryptoPricesModalOpen')}
        theme={theme}
        onTimerUpdate={(isRunning, timeLeft) => {
          setIsTimerRunning(isRunning);
          setTimerTimeLeft(timeLeft);
        }}
      />
    </div>
  );
};

export default Desktop;