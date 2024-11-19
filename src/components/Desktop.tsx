import React, { useState, useRef, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import MainContent from './MainContent';
import { filterShortcuts, filterLinks, allLinks } from '../utils/filtering';
import { useModals } from '../hooks/useModals';
import useKeyboardEvents from '../hooks/useKeyboardEvents';
import { Heart, Book, HelpCircle } from 'lucide-react';
import { searchTerms } from '../config';
import { KeyboardEventHandlers } from '../types';
const Desktop: React.FC = () => {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<'purple' | 'green' | 'teal'>('purple');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(0);
  const [showToolbar, setShowToolbar] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isModalvateOpen, setIsModalvateOpen] = useState(false);
  const [isLexiconModalOpen, setIsLexiconModalOpen] = useState(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const {
    isPomodoroModalOpen,
    isTimeZonesModalOpen,
    isCryptoPricesModalOpen,
    isDocsModalOpen,
    isWeb3SocialModalOpen,
    isWalletsModalOpen,
    openModal,
    closeModal
  } = useModals();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const shortcutGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);
  const linkGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);

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

  const openLexiconModal = () => {
    setIsLexiconModalOpen(true);
  };

  const closeLexiconModal = () => {
    setIsLexiconModalOpen(false);
  };

  const handleOpenMusicModal = () => {
    setIsMusicModalOpen(true);
  };

  const onEscape = useCallback(() => {
    if (isCryptoPricesModalOpen) {
      closeModal('isCryptoPricesModalOpen');
    } else if (isTimeZonesModalOpen) {
      closeModal('isTimeZonesModalOpen');
    } else if (isPomodoroModalOpen) {
      closeModal('isPomodoroModalOpen');
    } else if (isDocsModalOpen) {
      closeModal('isDocsModalOpen');
    } else if (isWeb3SocialModalOpen) {
      closeModal('isWeb3SocialModalOpen');
    } else if (isWalletsModalOpen) {
      closeModal('isWalletsModalOpen');
    } else if (isMusicModalOpen) {
      setIsMusicModalOpen(false);
    } else if (isHelpModalOpen) {
      setIsHelpModalOpen(false);
    } else if (showToolbar) {
      toggleToolbar();
    }
  }, [
    isCryptoPricesModalOpen,
    isTimeZonesModalOpen,
    isPomodoroModalOpen,
    isDocsModalOpen,
    isWeb3SocialModalOpen,
    isWalletsModalOpen,
    isMusicModalOpen,
    isHelpModalOpen,
    showToolbar,
    closeModal,
    setIsMusicModalOpen,
    setIsHelpModalOpen,
    toggleToolbar,
  ]);

  const keyboardEventHandlers: KeyboardEventHandlers = {
    onCtrlK: () => {
      searchInputRef.current?.focus();
      setFocusedIndex(null);
    },
    onCtrlB: toggleToolbar,
    onEscape,
    onAltT: changeTheme,
    onAltM: () => setIsMusicModalOpen(!isMusicModalOpen),
    onAltH: () => setIsHelpModalOpen(!isHelpModalOpen),
  };
    [
      searchInputRef,
      setFocusedIndex,
      toggleToolbar,
      onEscape,
      changeTheme,
      setIsMusicModalOpen,
      setIsHelpModalOpen,
    ]


  const getKeyboardEventHandlers = useCallback(
    () => keyboardEventHandlers,
    [keyboardEventHandlers]
  );

  useKeyboardEvents(getKeyboardEventHandlers);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const matchedTerm = Object.keys(searchTerms).find(term => lowerSearch.includes(term));

    if (matchedTerm) {
      const modalOrAction = searchTerms[matchedTerm as keyof typeof searchTerms];
      if (modalOrAction === 'isLexiconModalOpen') {
        setIsLexiconModalOpen(true);
      } else if (modalOrAction === 'isWalletsModalOpen') {
        openModal('isWalletsModalOpen');
      } else if (modalOrAction === 'isMusicModalOpen') {
        setIsMusicModalOpen(true);
      } else if (modalOrAction === 'isHelpModalOpen') {
        setIsHelpModalOpen(true);
      } else {
        openModal(modalOrAction);
      }
      setSearch('');
    }
  }, [search, openModal]);

  return (
    <div
      className={`relative min-h-screen ${themeClasses[theme]} p-6 overflow-hidden ${theme}`}
    >
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgaTExMC0xMCBMMTAgaDQwIE0wIDIwIEwgNDAgMjAgaTExMC0yMCBMMTAgaDQwIE0wIDMwIEwgNDAgMzAgaTExMC0zMCBMMTAgaDQwIE0zMCAwIEwgMzA0MCBMMTAgaDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20`}></div>

      <div className="relative">
        <SearchBar
          search={search}
          setSearch={setSearch}
          theme={theme}
          inputRef={searchInputRef}
          onNavigateToLinks={navigateToLinks}
          onNavigateToGrid={navigateToGrid}
        />
        <button
          onClick={openLexiconModal}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 z-50 hover:opacity-100 transition-opacity"
        >
          <Book size={24} />
        </button>
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="absolute top-1/2 right-14 transform -translate-y-1/2 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 z-50 hover:opacity-100 transition-opacity"
        >
          <HelpCircle size={24} />
        </button>
      </div>

      <MainContent
        search={search}
        theme={theme}
        filteredShortcuts={filteredShortcuts}
        filteredLinks={filteredLinks}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        setIsTimerRunning={setIsTimerRunning}
        setTimerTimeLeft={setTimerTimeLeft}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
        isPomodoroModalOpen={isPomodoroModalOpen}
        isTimeZonesModalOpen={isTimeZonesModalOpen}
        isCryptoPricesModalOpen={isCryptoPricesModalOpen}
        isDocsModalOpen={isDocsModalOpen}
        isWeb3SocialModalOpen={isWeb3SocialModalOpen}
        isWalletsModalOpen={isWalletsModalOpen}
        isLexiconModalOpen={isLexiconModalOpen}
        isMusicModalOpen={isMusicModalOpen}
        isHelpModalOpen={isHelpModalOpen}
        setIsMusicModalOpen={setIsMusicModalOpen}
        setIsHelpModalOpen={setIsHelpModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        navigateToSearchBar={navigateToSearchBar}
        onTimerUpdate={(isRunning, timeLeft) => {
          setIsTimerRunning(isRunning);
          setTimerTimeLeft(timeLeft);
        }}
        isModalvateOpen={isModalvateOpen}
        setIsModalvateOpen={setIsModalvateOpen}
        closeLexiconModal={closeLexiconModal}
        handleOpenMusicModal={handleOpenMusicModal}
        searchBarRef={searchBarRef}
        linkGridRef={linkGridRef}
        shortcutGridRef={shortcutGridRef}
      />
    </div>
  );
};

export default Desktop;