// src/Desktop.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import MainContent from './MainContent';
import { filterShortcuts, filterLinks, allLinks } from '../utils/filtering';
import useModals from '../hooks/useModals';
import useKeyboardEvents from '../hooks/useKeyboardEvents';
import { searchTerms } from '../config';
import { KeyboardEventHandlers, TimerUpdateHandler } from '../types';
import Toolbar from './Toolbar';
import Modals from './Modals';
import { ModalsProps, DescribedShortcut, Link, ModalsState, Theme } from '../types';

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(0);
  const [showToolbar, setShowToolbar] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);


  const modals = useModals('purple');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const shortcutGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);
  const linkGridRef = useRef<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> } | null>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const filteredShortcuts = filterShortcuts(search);
  const filteredLinks = filterLinks(search, allLinks) as (DescribedShortcut | Link)[];
  const filteredDescribedLinks = filteredLinks.filter(
    (link): link is DescribedShortcut => 'id' in link
  );

  const themeClasses = {
    purple: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    green: 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900',
    teal: 'bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900',
  };

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
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
    modals.toggleModal('isModalvateOpen');
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

  const onTimerUpdate: TimerUpdateHandler = (isRunning, timeLeft) => {
    setIsTimerRunning(isRunning);
    setTimerTimeLeft(timeLeft);
  };

  return (
    <div
      className={`relative min-h-screen ${themeClasses[modals.theme]} p-6 overflow-hidden ${modals.theme}`}
    >
      <SearchBar
        search={search}
        setSearch={setSearch}
        theme={modals.theme}
        inputRef={searchInputRef}
        onNavigateToLinks={navigateToLinks}
        onNavigateToGrid={navigateToGrid}
      />
      <MainContent
        search={search}
        theme={modals.theme}
        filteredShortcuts={filteredShortcuts}
        filteredLinks={filteredDescribedLinks}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        setIsTimerRunning={setIsTimerRunning}
        setTimerTimeLeft={setTimerTimeLeft}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
        navigateToSearchBar={navigateToSearchBar}
        onNavigateToGrid={navigateToGrid}
        onTimerUpdate={onTimerUpdate}
        searchBarRef={searchBarRef}
        linkGridRef={linkGridRef}
        shortcutGridRef={shortcutGridRef}
        setTheme={modals.setTheme}
        openModal={modals.openModal}
        closeModal={modals.closeModal}
      />
      <Toolbar
        theme={modals.theme}
        setTheme={modals.setTheme}
        onPomodoroOpen={() => modals.toggleModal('isPomodoroModalOpen')}
        onTimeZonesOpen={() => modals.toggleModal('isTimeZonesModalOpen')}
        showToolbar={showToolbar}
        toggleToolbar={toggleToolbar}
        openModal={modals.openModal}
        closeModal={modals.closeModal}
        modals={modals}
      />
      <Modals
        {...modals}
        theme={modals.theme}
        onTimerUpdate={modals.onTimerUpdate}
      />
    </div>
  );
};

export default Desktop;