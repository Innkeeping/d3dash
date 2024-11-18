// src/Modals.tsx
import React from 'react';
import PomodoroModal from './PomodoroModal';
import TimeZonesModal from './TimeZonesModal';
import CryptoPricesModal from './CryptoPricesModal';
import DocsModal from './DocsModal';
import Web3SocialModal from './Web3SocialModal';
import WalletsModal from './WalletsModal';
interface ModalsProps {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
  isWeb3SocialModalOpen: boolean;
  isWalletsModalOpen: boolean;
  onClosePomodoro: () => void;
  onCloseTimeZones: () => void;
  onCloseCryptoPrices: () => void;
  onCloseDocs: () => void;
  onCloseWeb3SocialModal: () => void;
  onCloseWalletsModal: () => void;
  theme: 'purple' | 'green' | 'teal';
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
}

const Modals: React.FC<ModalsProps> = ({
  isPomodoroModalOpen,
  isTimeZonesModalOpen,
  isCryptoPricesModalOpen,
  isDocsModalOpen,
  isWeb3SocialModalOpen,
  isWalletsModalOpen,
  onClosePomodoro,
  onCloseTimeZones,
  onCloseCryptoPrices,
  onCloseDocs,
  onCloseWeb3SocialModal,
  onCloseWalletsModal,
  theme,
  onTimerUpdate,
}) => {
  return (
    <>
      <PomodoroModal
        isOpen={isPomodoroModalOpen}
        onClose={onClosePomodoro}
        theme={theme}
        onTimerUpdate={onTimerUpdate}
      />
      <TimeZonesModal
        isOpen={isTimeZonesModalOpen}
        onClose={onCloseTimeZones}
        theme={theme}
      />
      <CryptoPricesModal
        isOpen={isCryptoPricesModalOpen}
        onClose={onCloseCryptoPrices}
        theme={theme}
      />
      <DocsModal
        isOpen={isDocsModalOpen}
        onClose={onCloseDocs}
        theme={theme}
      />
      <Web3SocialModal
        isOpen={isWeb3SocialModalOpen}
        onClose={onCloseWeb3SocialModal}
        theme={theme}
      />
      <WalletsModal
        isOpen={isWalletsModalOpen}
        onClose={onCloseWalletsModal}
        theme={theme}
      />
    </>
  );
};

export default Modals;