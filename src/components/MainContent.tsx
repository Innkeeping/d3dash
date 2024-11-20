import React from 'react';
import ShortcutGrid from './ShortcutGrid';
import LinkGrid from './LinkGrid';
import TimerDisplay from './TimerDisplay';
import { Heart, Info, Book } from 'lucide-react';
import { MainContentProps, DescribedShortcut, Link } from '../types';

const MainContent: React.FC<MainContentProps> = ({
  search,
  theme,
  filteredShortcuts,
  filteredLinks,
  focusedIndex,
  setFocusedIndex,
  isTimerRunning,
  timerTimeLeft,
  setIsTimerRunning,
  setTimerTimeLeft,
  showToolbar,
  toggleToolbar,
  navigateToSearchBar,
  onNavigateToGrid,
  onTimerUpdate,
  searchBarRef,
  linkGridRef,
  shortcutGridRef,
  setTheme,
  openModal,
  closeModal,
}) => {
  const openModalvate = () => {
    openModal('isModalvateOpen');
  };

  const openHelpModal = () => {
    openModal('isHelpModalOpen');
  };

  const openLexiconModal = () => {
    openModal('isLexiconModalOpen');
  };

  // Filter filteredLinks to include only DescribedShortcut objects
  const filteredDescribedLinks = filteredLinks.filter(
    (link): link is DescribedShortcut => 'id' in link
  );

  return (
    <>
      {/* Info and Book buttons with responsive classes */}
      <div className="absolute md:top-6 md:right-1/4 lg:right-1/5 xl:right-1/6 md:flex hidden justify-center md:mt-0 lg:mt-2 z-50 space-x-2">
        <button
          onClick={openHelpModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Info size={24} />
        </button>
        <button
          onClick={openLexiconModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Book size={24} />
        </button>
      </div>

      {/* Mobile version of the Info and Book buttons */}
      <div className="md:hidden flex justify-center mt-2">
        <button
          onClick={openHelpModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Info size={24} />
        </button>
        <button
          onClick={openLexiconModal}
          className="p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity"
        >
          <Book size={24} />
        </button>
      </div>

      {/* Heart button on both mobile and larger screens */}
      <button
        onClick={openModalvate}
        className="absolute bottom-6 left-4 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity z-50"
      >
        <Heart size={24} />
      </button>

      <ShortcutGrid
        shortcuts={filteredShortcuts}
        theme={theme}
        onNavigateToSearchBar={navigateToSearchBar}
        ref={shortcutGridRef}
        onLastRowDown={navigateToSearchBar}
        searchBarRef={searchBarRef}
      />

      {search && (
        <LinkGrid
          links={filteredDescribedLinks}
          theme={theme}
          ref={linkGridRef}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
          onNavigateToGrid={onNavigateToGrid}
        />
      )}

      <TimerDisplay
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        onClick={() => openModal('isPomodoroModalOpen')}
      />
    </>
  );
};

export default MainContent;