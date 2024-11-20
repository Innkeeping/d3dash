// src/components/MainContent.tsx
import React from 'react';
// import CombinedGrid from './CombinedGrid';
import TimerDisplay from './TimerDisplay';
import { Heart, Info, Book } from 'lucide-react';
import { MainContentProps } from '../types';

const MainContent: React.FC<MainContentProps> = ({
  search,
  theme,
  focusedIndex,
  setFocusedIndex,
  isTimerRunning,
  timerTimeLeft,
  setIsTimerRunning,
  setTimerTimeLeft,
  showToolbar,
  toggleToolbar,
  navigateToSearchBar,
  onTimerUpdate,
  searchBarRef,
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

  return (
    <>
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

      <button
        onClick={openModalvate}
        className="absolute bottom-6 left-4 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 hover:opacity-100 transition-opacity z-50"
      >
        <Heart size={24} />
      </button>

      {/* <CombinedGrid
        theme={theme}
        search={search} // Pass the search prop
        onNavigateToSearchBar={navigateToSearchBar}
        searchBarRef={searchBarRef}
      /> */}

      <TimerDisplay
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        onClick={() => openModal('isPomodoroModalOpen')}
      />
    </>
  );
};

export default MainContent;