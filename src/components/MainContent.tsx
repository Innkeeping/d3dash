import React, { useRef } from 'react';
import ShortcutGrid from './ShortcutGrid';
import LinkGrid from './LinkGrid';
import TimerDisplay from './TimerDisplay';
import Toolbar from './Toolbar';
import Modals from './Modals';
import { Heart } from 'lucide-react';
import Modalvate from './Modalvate';
import LexiconModal from './LexiconModal';
import MusicModal from './MusicModal';
import HelpModal from './HelpModal';

interface ModalsState {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
  isWeb3SocialModalOpen: boolean;
  isWalletsModalOpen: boolean;
  isLexiconModalOpen: boolean;
  isMusicModalOpen: boolean;
  isHelpModalOpen: boolean;
}

interface MainContentProps {
  search: string;
  theme: 'purple' | 'green' | 'teal';
  filteredShortcuts: any[];
  filteredLinks: any[];
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  isTimerRunning: boolean;
  timerTimeLeft: number;
  setIsTimerRunning: (isRunning: boolean) => void;
  setTimerTimeLeft: (timeLeft: number) => void;
  showToolbar: boolean;
  toggleToolbar: () => void;
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
  isWeb3SocialModalOpen: boolean;
  isWalletsModalOpen: boolean;
  isLexiconModalOpen: boolean;
  isMusicModalOpen: boolean;
  isHelpModalOpen: boolean;
  setIsMusicModalOpen: (isOpen: boolean) => void;
  setIsHelpModalOpen: (isOpen: boolean) => void;
  openModal: (modalKey: keyof ModalsState) => void;
  closeModal: (modalKey: keyof ModalsState) => void;
  navigateToSearchBar: () => void;
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
  isModalvateOpen: boolean;
  setIsModalvateOpen: (isOpen: boolean) => void;
  closeLexiconModal: () => void;
  handleOpenMusicModal: () => void;
  searchBarRef: React.RefObject<HTMLInputElement>;
  linkGridRef: React.RefObject<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> }>;
  shortcutGridRef: React.RefObject<{ gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> }>;
}

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
  isPomodoroModalOpen,
  isTimeZonesModalOpen,
  isCryptoPricesModalOpen,
  isDocsModalOpen,
  isWeb3SocialModalOpen,
  isWalletsModalOpen,
  isLexiconModalOpen,
  isMusicModalOpen,
  isHelpModalOpen,
  setIsMusicModalOpen,
  setIsHelpModalOpen,
  openModal,
  closeModal,
  navigateToSearchBar,
  onTimerUpdate,
  isModalvateOpen,
  setIsModalvateOpen,
  closeLexiconModal,
  handleOpenMusicModal,
  searchBarRef,
  linkGridRef,
  shortcutGridRef,
}) => {
  const openModalvate = () => {
    setIsModalvateOpen(true);
  };

  const closeModalvate = () => {
    setIsModalvateOpen(false);
  };

  return (
    <>
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
          links={filteredLinks}
          theme={theme}
          ref={linkGridRef}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
          onNavigateToGrid={navigateToSearchBar}
        />
      )}

      <TimerDisplay
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        onClick={() => openModal('isPomodoroModalOpen')}
      />

      <Toolbar
        theme={theme}
        setTheme={() => {}}
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
        isWeb3SocialModalOpen={isWeb3SocialModalOpen}
        isWalletsModalOpen={isWalletsModalOpen}
        isLexiconModalOpen={isLexiconModalOpen}
        isMusicModalOpen={isMusicModalOpen}
        onCloseLexiconModal={closeLexiconModal}
        onCloseMusicModal={() => setIsMusicModalOpen(false)}
        onClosePomodoro={() => closeModal('isPomodoroModalOpen')}
        onCloseTimeZones={() => closeModal('isTimeZonesModalOpen')}
        onCloseCryptoPrices={() => closeModal('isCryptoPricesModalOpen')}
        onCloseDocs={() => closeModal('isDocsModalOpen')}
        onCloseWeb3SocialModal={() => closeModal('isWeb3SocialModalOpen')}
        onCloseWalletsModal={() => closeModal('isWalletsModalOpen')}
        theme={theme}
        onTimerUpdate={onTimerUpdate}
      />

      <button
        onClick={openModalvate}
        className="absolute bottom-6 left-4 p-2 bg-white bg-opacity-10 rounded-full text-white opacity-10 z-50 hover:opacity-100 transition-opacity"
      >
        <Heart size={24} />
      </button>

      <Modalvate isOpen={isModalvateOpen} onClose={closeModalvate} theme={theme} />

      <LexiconModal
        isOpen={isLexiconModalOpen}
        onClose={closeLexiconModal}
        theme={theme}
      />

      <MusicModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
        onOpen={handleOpenMusicModal}
        theme={theme}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        theme={theme}
      />
    </>
  );
};

export default MainContent;