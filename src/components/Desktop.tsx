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
import { Heart } from 'lucide-react';
import Modalvate from './Modalvate';

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<'purple' | 'green' | 'teal'>('purple');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(0);
  const [showToolbar, setShowToolbar] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isModalvateOpen, setIsModalvateOpen] = useState(false);

  const {
    isPomodoroModalOpen,
    isTimeZonesModalOpen,
    isCryptoPricesModalOpen,
    isDocsModalOpen,
    isWeb3SocialModalOpen, // Add state for Web3SocialModal
    openModal,
    closeModal
  } = useModals();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const shortcutGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);
  const linkGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);

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

  const themes: ('purple' | 'green' | 'teal')[] = ['purple', 'green', 'teal'];

  const changeTheme = () => {
    const currentThemeIndex = themes.indexOf(theme);
    setTheme(themes[(currentThemeIndex + 1) % themes.length]);
  };

  const searchBarRef = useRef<HTMLInputElement>(null);

  useKeyboardEvents({
    onCtrlK: () => {
      searchInputRef.current?.focus();
      setFocusedIndex(null);
    },
    onCtrlB: toggleToolbar,
    onEscape: () => {
      if (isCryptoPricesModalOpen) {
        closeModal('isCryptoPricesModalOpen');
      } else if (isTimeZonesModalOpen) {
        closeModal('isTimeZonesModalOpen');
      } else if (isPomodoroModalOpen) {
        closeModal('isPomodoroModalOpen');
      } else if (isDocsModalOpen) {
        closeModal('isDocsModalOpen');
      } else if (showToolbar) {
        toggleToolbar();
      }
    },
    onAltT: changeTheme,
  });

  useEffect(() => {
    const searchTerms = ['clock', 'time', 'utc', 'price', 'docs', 'social']; // Add 'social' to the search terms
    const lowerSearch = search.toLowerCase();
    const matchedTerm = searchTerms.find(term => lowerSearch.includes(term));

    if (matchedTerm) {
      switch (matchedTerm) {
        case 'price':
          openModal('isCryptoPricesModalOpen');
          break;
        case 'clock':
        case 'time':
        case 'utc':
          openModal('isTimeZonesModalOpen');
          break;
        case 'docs':
          openModal('isDocsModalOpen');
          break;
        case 'social':
          openModal('isWeb3SocialModalOpen'); // Open the Web3SocialModal
          break;
        default:
          break;
      }
      setSearch('');
    }
  }, [search, openModal]);

  const navigateToLinks = () => {
    if (filteredLinks.length > 0) {
      setFocusedIndex(0);
      if (linkGridRef.current && linkGridRef.current.gridItemsRef.current) {
        const firstLink = linkGridRef.current.gridItemsRef.current[0];
        if (firstLink) {
          firstLink.focus();
        }
      }
    }
  };

  const navigateToSearchBar = () => {
    searchInputRef.current?.focus();
    setFocusedIndex(null);
  };

  const navigateToGrid = () => {
    if (shortcutGridRef.current && shortcutGridRef.current.gridItemsRef.current) {
      const firstShortcut = shortcutGridRef.current.gridItemsRef.current[0];
      if (firstShortcut) {
        firstShortcut.focus();
        setFocusedIndex(0);
      }
    }
  };

  const handleLastRowDown = () => {
    navigateToLinks();
  };

  const openModalvate = () => {
    setIsModalvateOpen(true);
  };

  const closeModalvate = () => {
    setIsModalvateOpen(false);
  };

  return (
    <div className={`relative min-h-screen ${themeClasses[theme]} p-6 overflow-hidden`}>
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgaTExMC0xMCBMMTAgaDQwIE0wIDIwIEwgNDAgMjAgaTExMC0yMCBMMTAgaDQwIE0wIDMwIEwgNDAgMzAgaTExMC0zMCBMMTAgaDQwIE0zMCAwIEwgMzA0MCBMMTAgaDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20`}></div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        theme={theme}
        inputRef={searchInputRef}
        onNavigateToLinks={navigateToLinks}
        onNavigateToGrid={navigateToGrid}
      />
      <ShortcutGrid
        shortcuts={filteredShortcuts}
        theme={theme}
        onNavigateToSearchBar={navigateToSearchBar}
        ref={shortcutGridRef}
        onLastRowDown={handleLastRowDown}
        searchBarRef={searchBarRef}
      />
      {search && (
        <LinkGrid
          links={filteredLinks}
          theme={theme}
          ref={linkGridRef}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
          onNavigateToGrid={navigateToGrid}
        />
      )}

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
        isDocsModalOpen={isDocsModalOpen}
        isWeb3SocialModalOpen={isWeb3SocialModalOpen} // Add prop for Web3SocialModal
        onClosePomodoro={() => closeModal('isPomodoroModalOpen')}
        onCloseTimeZones={() => closeModal('isTimeZonesModalOpen')}
        onCloseCryptoPrices={() => closeModal('isCryptoPricesModalOpen')}
        onCloseDocs={() => closeModal('isDocsModalOpen')}
        onCloseWeb3SocialModal={() => closeModal('isWeb3SocialModalOpen')} // Add prop to close Web3SocialModal
        theme={theme}
        onTimerUpdate={(isRunning, timeLeft) => {
          setIsTimerRunning(isRunning);
          setTimerTimeLeft(timeLeft);
        }}
      />

      <button
        onClick={openModalvate}
        className="absolute bottom-6 left-4 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 z-50 hover:opacity-100 transition-opacity"
      >
        <Heart size={24} />
      </button>

      <Modalvate isOpen={isModalvateOpen} onClose={closeModalvate} theme={theme} />
    </div>
  );
};

export default Desktop;