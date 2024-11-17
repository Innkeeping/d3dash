// src/components/Modals.tsx
import React from 'react';
import TimeZonesModal from './TimeZonesModal';
import CryptoPricesModal from './CryptoPricesModal';
import PomodoroModal from './PomodoroModal';

interface ModalsProps {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  onClosePomodoro: () => void;
  onCloseTimeZones: () => void;
  onCloseCryptoPrices: () => void;
  theme: 'purple' | 'green' | 'teal';
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
}

const Modals: React.FC<ModalsProps> = ({
  isPomodoroModalOpen,
  isTimeZonesModalOpen,
  isCryptoPricesModalOpen,
  onClosePomodoro,
  onCloseTimeZones,
  onCloseCryptoPrices,
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
    </>
  );
};

export default Modals;