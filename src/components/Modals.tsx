// src/Modals.tsx
import React from 'react';
import PomodoroModal from './PomodoroModal';
import TimeZonesModal from './TimeZonesModal';
import Web3SocialModal from './Web3SocialModal';
import WalletsModal from './WalletsModal';
import LexiconModal from './LexiconModal';
import MusicModal from './MusicModal';
import HelpModal from './HelpModal';
import Modalvate from './Modalvate';
import { ModalsProps } from '../types';
// import CryptoPricesModal from './CryptoPricesModal';
// import DocsModal from './DocsModal';
// import RefiModal from './RefiModal';
import GovernanceModal from './GovernanceModal';
// import DefiModal from './DefiModal';
import LensFeedModal from './LensFeedModal';
import IPFSModal from './IPFSModal';
import GamebModal from './GamebModal';

const Modals: React.FC<ModalsProps> = ({
  isPomodoroModalOpen,
  isTimeZonesModalOpen,
  isWeb3SocialModalOpen,
  isWalletsModalOpen,
  isLexiconModalOpen,
  isMusicModalOpen,
  isHelpModalOpen,
  isModalvateOpen,
  // isCryptoPricesModalOpen,
  // isDocsModalOpen,
  // isRefiModalOpen,
  isGovernanceModalOpen,
  // isDefiModalOpen,
  isLensfeedModalOpen,
  isGamebModalOpen,
  isIpfsModalOpen,
  closeModal,
  theme,
  setTheme,
  openModal,
  toggleModal,
  toggleTheme,
  timerTimeLeft,
  setTimerTimeLeft,
  isTimerRunning,
  setIsTimerRunning,
  onTimerUpdate,
}) => {

  const handleOpenMusicModal = () => {
    // You can add any additional logic here if needed
    // For now, it's just a placeholder
  };

  const handleOpenHelpModal = () => {
    // You can add any additional logic here if needed
    // For now, it's just a placeholder
  };

  // Define the iframeUrl for GamebModal
  const gamebIframeUrl = 'https://innkeeping.github.io/gameB/';

  return (
    <>
      <PomodoroModal
        isOpen={isPomodoroModalOpen}
        onClose={() => closeModal('isPomodoroModalOpen')}
        theme={theme}
        onTimerUpdate={onTimerUpdate}
        isTimerRunning={isTimerRunning}
        timerTimeLeft={timerTimeLeft}
        setIsTimerRunning={setIsTimerRunning}
        setTimerTimeLeft={setTimerTimeLeft}
      />
      <TimeZonesModal
        isOpen={isTimeZonesModalOpen}
        onClose={() => closeModal('isTimeZonesModalOpen')}
        theme={theme}
      />
      <Web3SocialModal
        isOpen={isWeb3SocialModalOpen}
        onClose={() => closeModal('isWeb3SocialModalOpen')}
        theme={theme}
      />
      <WalletsModal
        isOpen={isWalletsModalOpen}
        onClose={() => closeModal('isWalletsModalOpen')}
        theme={theme}
      />
      <LexiconModal
        isOpen={isLexiconModalOpen}
        onClose={() => closeModal('isLexiconModalOpen')}
        theme={theme}
      />
      <MusicModal
        isOpen={isMusicModalOpen}
        onClose={() => closeModal('isMusicModalOpen')}
        onOpen={handleOpenMusicModal}
        theme={theme}
      />
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => closeModal('isHelpModalOpen')}
        onOpen={handleOpenHelpModal}
        theme={theme}
      />
      <Modalvate
        isOpen={isModalvateOpen}
        onClose={() => closeModal('isModalvateOpen')}
        theme={theme}
      />
      {/* <CryptoPricesModal
        isOpen={isCryptoPricesModalOpen}
        onClose={() => closeModal('isCryptoPricesModalOpen')}
        theme={theme}
      /> */}
      {/* <DocsModal
        isOpen={isDocsModalOpen}
        onClose={() => closeModal('isDocsModalOpen')}
        theme={theme}
      /> */}
      {/* <RefiModal
        isOpen={isRefiModalOpen}
        onClose={() => closeModal('isRefiModalOpen')}
        theme={theme}
      /> */}
      <GovernanceModal
        isOpen={isGovernanceModalOpen}
        onClose={() => closeModal('isGovernanceModalOpen')}
        theme={theme}
      />
      {/* <DefiModal
        isOpen={isDefiModalOpen}
        onClose={() => closeModal('isDefiModalOpen')}
        theme={theme}
      /> */}
      <LensFeedModal
        isOpen={isLensfeedModalOpen}
        onClose={() => closeModal('isLensfeedModalOpen')}
        theme={theme}
      />
      <GamebModal
        isOpen={isGamebModalOpen}
        onClose={() => closeModal('isGamebModalOpen')}
        theme={theme}
        iframeUrl={gamebIframeUrl}
      />
      <IPFSModal
        isOpen={isIpfsModalOpen}
        onClose={() => closeModal('isIpfsModalOpen')}
        theme={theme}
      />
    </>
  );
};

export default Modals;