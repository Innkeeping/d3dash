import React, { useState, useRef, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import MainContent from './MainContent';
import { fetchShortcutsAndLinks, filterItems } from '../utils/filtering';
import useModals from '../hooks/useModals';
import useKeyboardEvents from '../hooks/useKeyboardEvents';
import { searchTerms } from '../config';
import { CommonLink, KeyboardEventHandlers, Shortcut, TimerUpdateHandler } from '../types';
import Toolbar from './Toolbar';
import Modals from './Modals';
import { ModalsProps, DescribedShortcut, Link, ModalsState, Theme } from '../types';
import CombinedGrid from './CombinedGrid';

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const modals = useModals('purple');

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const combinedGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);

  const [items, setItems] = useState<(Shortcut | CommonLink)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShortcutsAndLinks();
      setItems(data);
    };

    fetchData();
  }, []);

  const filteredItems = filterItems(search, items);

  const themeClasses = {
    purple: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    green: 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900',
    teal: 'bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900',
  };

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  const navigateToSearchBar = () => {
    searchInputRef.current?.focus();
    setFocusedIndex(null);
  };

  const navigateToGrid = () => {
    if (combinedGridRef.current && combinedGridRef.current.gridItemsRef.current) {
      const firstItem = combinedGridRef.current.gridItemsRef.current[0];
      if (firstItem) {
        firstItem.focus();
        setFocusedIndex(0);
      }
    }
  };

  const openModalvate = () => {
    modals.toggleModal('isModalvateOpen');
  };

  const openHelpModal = () => {
    modals.toggleModal('isHelpModalOpen');
  };

  const openLexiconModal = () => {
    modals.toggleModal('isLexiconModalOpen');
  };

  const handleOpenMusicModal = () => {
    modals.toggleModal('isMusicModalOpen');
  };

  const onEscape = useCallback(() => {
    const modalKeys = Object.keys(modals) as (keyof ModalsState)[];
    modalKeys.forEach(key => {
      if (key.startsWith('is') && key.endsWith('ModalOpen') && modals[key]) {
        modals.closeModal(key);
      }
    });
  }, [modals]);

  const keyboardEventHandlers: KeyboardEventHandlers = {
    onCtrlK: () => {
      searchInputRef.current?.focus();
      setFocusedIndex(null);
    },
    onCtrlB: toggleToolbar,
    onEscape,
    onAltT: modals.toggleTheme,
    onAltM: handleOpenMusicModal,
    onAltH: () => modals.toggleModal('isHelpModalOpen'),
  };

  const getKeyboardEventHandlers = useCallback(
    () => keyboardEventHandlers,
    [keyboardEventHandlers]
  );

  useKeyboardEvents(getKeyboardEventHandlers, modals);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const matchedTerm = Object.keys(searchTerms).find(term => lowerSearch.includes(term));

    if (matchedTerm) {
      const modalOrAction = searchTerms[matchedTerm as keyof typeof searchTerms];
      modals.openModal(modalOrAction);
      setSearch('');
    }
  }, [search, modals.openModal]);

  useEffect(() => {
    // Focus the search bar on page load
    searchInputRef.current?.focus();
    setFocusedIndex(null);
  }, []);

  const onTimerUpdate: TimerUpdateHandler = (isRunning, timeLeft) => {
    setIsTimerRunning(isRunning);
    setTimerTimeLeft(timeLeft);
    modals.onTimerUpdate(isRunning, timeLeft);
  };

  return (
    <div
      className={`relative min-h-screen ${themeClasses[modals.theme]} text-white overflow-hidden p-8`} // Added padding here
    >
      <SearchBar
        search={search}
        setSearch={setSearch}
        searchInputRef={searchInputRef}
        theme={modals.theme}
        onNavigateToGrid={navigateToGrid}
      />
      <MainContent
        search={search}
        theme={modals.theme}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        setIsTimerRunning={setIsTimerRunning}
        setTimerTimeLeft={setTimerTimeLeft}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
        navigateToSearchBar={navigateToSearchBar}
        onTimerUpdate={onTimerUpdate}
        searchBarRef={searchBarRef}
        setTheme={modals.setTheme}
        openModal={modals.toggleModal}
        closeModal={modals.closeModal}
      />
      <Toolbar
        theme={modals.theme}
        setTheme={modals.setTheme}
        onPomodoroOpen={() => modals.toggleModal('isPomodoroModalOpen')}
        onTimeZonesOpen={() => modals.toggleModal('isTimeZonesModalOpen')}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
        openModal={modals.toggleModal}
        closeModal={modals.closeModal}
        modals={modals}
      />
      <Modals
        {...modals}
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        setIsTimerRunning={setIsTimerRunning}
        setTimerTimeLeft={setTimerTimeLeft}
      />
      <CombinedGrid
        ref={combinedGridRef}
        theme={modals.theme}
        search={search}
        onNavigateToSearchBar={navigateToSearchBar}
        searchBarRef={searchBarRef}
      />
    </div>
  );
};

export default Desktop;