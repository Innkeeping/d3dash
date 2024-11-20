// src/Modals.tsx
import React from 'react';
import PomodoroModal from './PomodoroModal';
import TimeZonesModal from './TimeZonesModal';
import CryptoPricesModal from './CryptoPricesModal';
import DocsModal from './DocsModal';
import Web3SocialModal from './Web3SocialModal';
import WalletsModal from './WalletsModal';
import LexiconModal from './LexiconModal';
import MusicModal from './MusicModal';
import HelpModal from './HelpModal';
import { ModalsProps, Theme } from '../types';
import Modalvate from './Modalvate';

const Modals: React.FC<ModalsProps> = ({
  isPomodoroModalOpen,
  isTimeZonesModalOpen,
  isCryptoPricesModalOpen,
  isDocsModalOpen,
  isWeb3SocialModalOpen,
  isWalletsModalOpen,
  isLexiconModalOpen,
  isMusicModalOpen,
  isHelpModalOpen,
  isModalvateOpen,
  closeModal,
  theme,
  onTimerUpdate,
}) => {

  const handleOpenMusicModal = () => {
    // You can add any additional logic here if needed
    // For now, it's just a placeholder
  };

  const handleOpenHelpModal = () => {

  };

  return (
    <>
      <PomodoroModal
        isOpen={isPomodoroModalOpen}
        onClose={() => closeModal('isPomodoroModalOpen')}
        theme={theme}
        onTimerUpdate={onTimerUpdate}
      />
      <TimeZonesModal
        isOpen={isTimeZonesModalOpen}
        onClose={() => closeModal('isTimeZonesModalOpen')}
        theme={theme}
      />
      <CryptoPricesModal
        isOpen={isCryptoPricesModalOpen}
        onClose={() => closeModal('isCryptoPricesModalOpen')}
        theme={theme}
      />
      <DocsModal
        isOpen={isDocsModalOpen}
        onClose={() => closeModal('isDocsModalOpen')}
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
    </>
  );
};

export default Modals;