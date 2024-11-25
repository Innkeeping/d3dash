import { useState, useCallback } from 'react';
import { ModalsState, Theme, ModalsProps, TimerUpdateHandler } from '../types';

const useModals = (initialTheme: Theme): ModalsProps => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isOpen, setIsOpen] = useState<ModalsState>({
    isWClockOpen: false,
    isSocialOpen: false,
    isWalletsOpen: false,
    isLexiconOpen: false,
    isMusicOpen: false,
    isHelpOpen: false,
    isModalvateOpen: false,
    isPricesOpen: false,
    isGovOpen: false,
    isDocsOpen: false,
    isLensOpen: false,
    isGameBOpen: false,
    isIpfsoOpen: false,
    isDefiOpen: false,
    isRefiOpen: false,
    isNetworksOpen: false,
    isPomodoroOpen: false,
  });

  const [timerTimeLeft, setTimerTimeLeft] = useState<number>(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const openModal = useCallback((modalKey: keyof ModalsState) => {
    setIsOpen(prev => ({ ...prev, [modalKey]: true }));
  }, []);

  const closeModal = useCallback((modalKey: keyof ModalsState) => {
    setIsOpen(prev => ({ ...prev, [modalKey]: false }));
  }, []);

  const toggleModal = useCallback((modalKey: keyof ModalsState) => {
    setIsOpen(prev => ({ ...prev, [modalKey]: !prev[modalKey] }));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'purple' ? 'green' : prev === 'green' ? 'teal' : 'purple'));
  }, []);

  const onTimerUpdate = useCallback((isRunning: boolean, timeLeft: number) => {
    setIsTimerRunning(isRunning);
    setTimerTimeLeft(timeLeft);
  }, []);

  return {
    theme,
    setTheme,
    openModal,
    closeModal,
    toggleModal,
    toggleTheme,
    onTimerUpdate,
    timerTimeLeft,
    setTimerTimeLeft,
    isTimerRunning,
    setIsTimerRunning,
    isOpen,
  };
};

export default useModals;