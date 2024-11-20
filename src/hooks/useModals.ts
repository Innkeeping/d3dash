// src/hooks/useModals.ts
import { useState, useCallback } from 'react';
import { Theme, ModalsProps, TimerUpdateHandler, ModalsState } from '../types';

const useModals = (initialTheme: Theme): ModalsProps => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isModalvateOpen, setModalvateOpen] = useState(false);
  const [isLexiconModalOpen, setLexiconModalOpen] = useState(false);
  const [isMusicModalOpen, setMusicModalOpen] = useState(false);
  const [isPomodoroModalOpen, setPomodoroModalOpen] = useState(false);
  const [isTimeZonesModalOpen, setTimeZonesModalOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [isCryptoPricesModalOpen, setCryptoPricesModalOpen] = useState(false);
  const [isDocsModalOpen, setDocsModalOpen] = useState(false);
  const [isWeb3SocialModalOpen, setWeb3SocialModalOpen] = useState(false);
  const [isWalletsModalOpen, setWalletsModalOpen] = useState(false);
  const [isRefiModalOpen, setRefiModalOpen] = useState(false);
  const [isGovernanceModalOpen, setGovernanceModalOpen] = useState(false);
  const [isBlockchainModalOpen, setBlockchainModalOpen] = useState(false);
  const [isDefiModalOpen, setDefiModalOpen] = useState(false);
  const [isLensfeedModalOpen, setLensfeedModalOpen] = useState(false);
  const [isTerminalModalOpen, setTerminalModalOpen] = useState(false);
  const [isIpfsModalOpen, setIpfsModalOpen] = useState(false);
  const [timerTimeLeft, setTimerTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const themes: Theme[] = ['purple', 'green', 'teal'];
      const currentThemeIndex = themes.indexOf(prevTheme);
      return themes[(currentThemeIndex + 1) % themes.length];
    });
  }, []);

  const openModal = useCallback((modalKey: keyof ModalsState) => {
    switch (modalKey) {
      case 'isModalvateOpen':
        setModalvateOpen(true);
        break;
      case 'isLexiconModalOpen':
        setLexiconModalOpen(true);
        break;
      case 'isMusicModalOpen':
        setMusicModalOpen(true);
        break;
      case 'isPomodoroModalOpen':
        setPomodoroModalOpen(true);
        break;
      case 'isTimeZonesModalOpen':
        setTimeZonesModalOpen(true);
        break;
      case 'isHelpModalOpen':
        setHelpModalOpen(true);
        break;
      case 'isCryptoPricesModalOpen':
        setCryptoPricesModalOpen(true);
        break;
      case 'isDocsModalOpen':
        setDocsModalOpen(true);
        break;
      case 'isWeb3SocialModalOpen':
        setWeb3SocialModalOpen(true);
        break;
      case 'isWalletsModalOpen':
        setWalletsModalOpen(true);
        break;
      case 'isRefiModalOpen':
        setRefiModalOpen(true);
        break;
      case 'isGovernanceModalOpen':
        setGovernanceModalOpen(true);
        break;
      case 'isBlockchainModalOpen':
        setBlockchainModalOpen(true);
        break;
      case 'isDefiModalOpen':
        setDefiModalOpen(true);
        break;
      case 'isLensfeedModalOpen':
        setLensfeedModalOpen(true);
        break;
      case 'isTerminalModalOpen':
        setTerminalModalOpen(true);
        break;
      case 'isIpfsModalOpen':
        setIpfsModalOpen(true);
        break;
      default:
        console.warn(`Unknown modal key: ${modalKey}`);
    }
  }, []);

  const closeModal = useCallback((modalKey: keyof ModalsState) => {
    switch (modalKey) {
      case 'isModalvateOpen':
        setModalvateOpen(false);
        break;
      case 'isLexiconModalOpen':
        setLexiconModalOpen(false);
        break;
      case 'isMusicModalOpen':
        setMusicModalOpen(false);
        break;
      case 'isPomodoroModalOpen':
        setPomodoroModalOpen(false);
        break;
      case 'isTimeZonesModalOpen':
        setTimeZonesModalOpen(false);
        break;
      case 'isHelpModalOpen':
        setHelpModalOpen(false);
        break;
      case 'isCryptoPricesModalOpen':
        setCryptoPricesModalOpen(false);
        break;
      case 'isDocsModalOpen':
        setDocsModalOpen(false);
        break;
      case 'isWeb3SocialModalOpen':
        setWeb3SocialModalOpen(false);
        break;
      case 'isWalletsModalOpen':
        setWalletsModalOpen(false);
        break;
      case 'isRefiModalOpen':
        setRefiModalOpen(false);
        break;
      case 'isGovernanceModalOpen':
        setGovernanceModalOpen(false);
        break;
      case 'isBlockchainModalOpen':
        setBlockchainModalOpen(false);
        break;
      case 'isDefiModalOpen':
        setDefiModalOpen(false);
        break;
      case 'isLensfeedModalOpen':
        setLensfeedModalOpen(false);
        break;
      case 'isTerminalModalOpen':
        setTerminalModalOpen(false);
        break;
      case 'isIpfsModalOpen':
        setIpfsModalOpen(false);
        break;
      default:
        console.warn(`Unknown modal key: ${modalKey}`);
    }
  }, []);

  const toggleModal = useCallback((modalKey: keyof ModalsState) => {
    switch (modalKey) {
      case 'isModalvateOpen':
        setModalvateOpen(prev => !prev);
        break;
      case 'isLexiconModalOpen':
        setLexiconModalOpen(prev => !prev);
        break;
      case 'isMusicModalOpen':
        setMusicModalOpen(prev => !prev);
        break;
      case 'isPomodoroModalOpen':
        setPomodoroModalOpen(prev => !prev);
        break;
      case 'isTimeZonesModalOpen':
        setTimeZonesModalOpen(prev => !prev);
        break;
      case 'isHelpModalOpen':
        setHelpModalOpen(prev => !prev);
        break;
      case 'isCryptoPricesModalOpen':
        setCryptoPricesModalOpen(prev => !prev);
        break;
      case 'isDocsModalOpen':
        setDocsModalOpen(prev => !prev);
        break;
      case 'isWeb3SocialModalOpen':
        setWeb3SocialModalOpen(prev => !prev);
        break;
      case 'isWalletsModalOpen':
        setWalletsModalOpen(prev => !prev);
        break;
      case 'isRefiModalOpen':
        setRefiModalOpen(prev => !prev);
        break;
      case 'isGovernanceModalOpen':
        setGovernanceModalOpen(prev => !prev);
        break;
      case 'isBlockchainModalOpen':
        setBlockchainModalOpen(prev => !prev);
        break;
      case 'isDefiModalOpen':
        setDefiModalOpen(prev => !prev);
        break;
      case 'isLensfeedModalOpen':
        setLensfeedModalOpen(prev => !prev);
        break;
      case 'isTerminalModalOpen':
        setTerminalModalOpen(prev => !prev);
        break;
      case 'isIpfsModalOpen':
        setIpfsModalOpen(prev => !prev);
        break;
      default:
        console.warn(`Unknown modal key: ${modalKey}`);
    }
  }, []);

  const onTimerUpdate: TimerUpdateHandler = (isRunning, timeLeft) => {
    setIsTimerRunning(isRunning);
    setTimerTimeLeft(timeLeft);
  };

  const modalsState: ModalsProps = {
    theme,
    setTheme,
    isModalvateOpen,
    isLexiconModalOpen,
    isMusicModalOpen,
    isPomodoroModalOpen,
    isTimeZonesModalOpen,
    isHelpModalOpen,
    isCryptoPricesModalOpen,
    isDocsModalOpen,
    isWeb3SocialModalOpen,
    isWalletsModalOpen,
    isRefiModalOpen,
    isGovernanceModalOpen,
    isBlockchainModalOpen,
    isDefiModalOpen,
    isLensfeedModalOpen,
    isTerminalModalOpen,
    isIpfsModalOpen,
    openModal,
    closeModal,
    toggleModal,
    toggleTheme,
    timerTimeLeft,
    setTimerTimeLeft,
    isTimerRunning,
    setIsTimerRunning,
    onTimerUpdate,
  };

  return modalsState;
};

export default useModals;