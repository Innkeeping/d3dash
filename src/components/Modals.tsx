// src/Modals.tsx
import React from 'react';
import PomodoroModal from './PomodoroModal';
import RefiModal from './RefiModal';
import GovernanceModal from './GovernanceModal';
import Networks from './Networks';
import DefiModal from './DefiModal';
import DocsModal from './DocsModal';
import TimeZonesModal from './TimeZonesModal';
import LensFeedModal from './LensFeedModal';
import GamebModal from './GamebModal';
import CryptoPricesModal from './CryptoPricesModal';
import IPFSModal from './IPFSModal';

interface ModalsProps {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
  onClosePomodoro: () => void;
  onCloseTimeZones: () => void;
  onCloseCryptoPrices: () => void;
  onCloseDocs: () => void;
  theme: 'purple' | 'green' | 'teal';
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
}

const Modals: React.FC<ModalsProps> = ({
  isPomodoroModalOpen,
  isTimeZonesModalOpen,
  isCryptoPricesModalOpen,
  isDocsModalOpen,
  onClosePomodoro,
  onCloseTimeZones,
  onCloseCryptoPrices,
  onCloseDocs,
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
      <RefiModal isOpen={false} onClose={() => {}} theme={theme} />
      <GovernanceModal isOpen={false} onClose={() => {}} theme={theme} />
      <Networks isOpen={false} onClose={() => {}} theme={theme} />
      <DefiModal isOpen={false} onClose={() => {}} theme={theme} />
      <DocsModal isOpen={isDocsModalOpen} onClose={onCloseDocs} theme={theme} />
      <TimeZonesModal isOpen={isTimeZonesModalOpen} onClose={onCloseTimeZones} theme={theme} />
      <LensFeedModal isOpen={false} onClose={() => {}} theme={theme} />
      <GamebModal isOpen={false} onClose={() => {}} theme={theme} iframeUrl="https://www.example.com" />
      <CryptoPricesModal isOpen={isCryptoPricesModalOpen} onClose={onCloseCryptoPrices} theme={theme} />
      <IPFSModal isOpen={false} onClose={() => {}} theme={theme} />
    </>
  );
};

export default Modals;