import { useState, useCallback } from 'react';
import { Theme, ModalsProps, TimerUpdateHandler, ModalsState } from '../types';

const useModals = (initialTheme: Theme): ModalsProps => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Initialize isOpen state with all modal keys set to false
  const [isOpen, setIsOpen] = useState<ModalsState>({
    isTimeZonesOpen: false,
    isWeb3SocialOpen: false,
    isWalletsOpen: false,
    isLexiconOpen: false,
    isMusicOpen: false,
    isHelpOpen: false,
    isModalvateOpen: false,
    isPricesOpen: false,
    isGovOpen: false,
    isDocsOpen: false,
    isLensfeedOpen: false,
    isGamebOpen: false,
    isIpfsOpen: false,
    isDefiOpen: false,
    isRefiOpen: false,
    isNetworksOpen: false,
    isLensOpen: false,
  });

  const [timerTimeLeft, setTimerTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const setOpen = (modalKey: keyof ModalsState, open: boolean) => {
    setIsOpen((prevIsOpen) => ({
      ...prevIsOpen,
      [modalKey]: open,
    }));
  };

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const themes: Theme[] = ['purple', 'green', 'teal'];
      const currentThemeIndex = themes.indexOf(prevTheme);
      return themes[(currentThemeIndex + 1) % themes.length];
    });
  }, []);

  const openModal = useCallback((modalKey: keyof ModalsState) => {
    setOpen(modalKey, true);
  }, []);

  const closeModal = useCallback((modalKey: keyof ModalsState) => {
    setOpen(modalKey, false);
  }, []);

  const toggleModal = useCallback((modalKey: keyof ModalsState) => {
    setIsOpen((prevIsOpen) => ({
      ...prevIsOpen,
      [modalKey]: !prevIsOpen[modalKey],
    }));
  }, []);

  const onTimerUpdate: TimerUpdateHandler = useCallback((isRunning, timeLeft) => {
    setIsTimerRunning(isRunning);
    setTimerTimeLeft(timeLeft);
  }, []);

  const modalsState: ModalsProps = {
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
    isOpen, // Include the isOpen property
  };

  return modalsState;
};

export default useModals;