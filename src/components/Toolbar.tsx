// src/Toolbar.tsx
import React, { useState, useEffect } from 'react';
import { Network, Radio, Heart, Coins, Book, Terminal, Palette, Coffee, Clock, Glasses, DollarSign, MessageCircle, Music, HelpCircle, Folder, Circle } from 'lucide-react';
import { Theme, ModalsState, ModalsProps } from '../types';
import PomodoroModal from './PomodoroModal';
import RefiModal from './RefiModal';
import Networks from './Networks';
import Defi from './Defi';
import Docs from './Docs';
import TimeZonesModal from './TimeZonesModal';
import Lens from './Lens';
import GamebModal from './GamebModal';
import Prices from './Prices';
import IPFSModal from './IPFSModal';
import Web3SocialModal from './Web3SocialModal';
import WalletsModal from './WalletsModal';
import LexiconModal from './LexiconModal';
import MusicModal from './MusicModal';
import Help from './Help';
import Modalvate from './Modalvate';
import Gov from './Gov';

interface ToolbarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onPomodoroOpen: () => void;
  onTimeZonesOpen: () => void;
  showToolbar: boolean;
  toggleToolbar: () => void;
  openModal: (modalKey: keyof ModalsState) => void;
  closeModal: (modalKey: keyof ModalsState) => void;
  modals: ModalsProps;
}

const Toolbar: React.FC<ToolbarProps> = ({ theme, setTheme, onPomodoroOpen, onTimeZonesOpen, showToolbar, toggleToolbar, openModal, closeModal, modals }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [firstKeyPress, setFirstKeyPress] = useState<number | null>(null);
  const [keyPressTimeout, setKeyPressTimeout] = useState<NodeJS.Timeout | null>(null);

  const themes: Theme[] = ['purple', 'green', 'teal'];

  const handleMenuItemClick = (id: string) => {
    setActiveMenu(id);

    if (id === 'theme') {
      const currentThemeIndex = themes.indexOf(theme);
      setTheme(themes[(currentThemeIndex + 1) % themes.length]);
    } else if (id === 'break') {
      onPomodoroOpen(); // Open Pomodoro Modal
    } else if (id === 'timezones') {
      onTimeZonesOpen();
    } else {
      const modalKey = `is${id.charAt(0).toUpperCase() + id.slice(1)}Open` as keyof ModalsState;
      console.log(`Opening modal with key: ${modalKey}`); // Debug statement
      if (modals.isOpen[modalKey] !== undefined) {
        openModal(modalKey);
      } else {
        console.error(`Modal key ${modalKey} not found in modals state`);
        console.log(`Available modal keys:`, Object.keys(modals.isOpen));
      }
    }
  };

  const toolbarItems = [
    { id: 'networks', icon: <Network size={20} />, label: 'Networks' },
    { id: 'gov', icon: <Radio size={20} />, label: 'Governance' },
    { id: 'refi', icon: <Heart size={20} />, label: 'ReFi Projects' },
    { id: 'defi', icon: <Coins size={20} />, label: 'DeFi Tools' },
    { id: 'docs', icon: <Book size={20} />, label: 'Web3 Docs' },
    { id: 'gameb', icon: <Terminal size={20} />, label: 'GameB Console' },
    { id: 'break', icon: <Coffee size={20} />, label: 'Take a Break' },
    { id: 'timezones', icon: <Clock size={20} />, label: 'World Clock' },
    { id: 'lens', icon: <Glasses size={20} />, label: 'Lens Feed' },
    { id: 'prices', icon: <DollarSign size={20} />, label: 'Token Prices' },
    { id: 'ipfs', icon: <Network size={20} />, label: 'IPFS CID Checker' },
    { id: 'web3social', icon: <MessageCircle size={20} />, label: 'Web3 Social' },
    { id: 'wallets', icon: <Folder size={20} />, label: 'Wallets' },
    { id: 'lexicon', icon: <Book size={20} />, label: 'Lexicon' },
    { id: 'music', icon: <Music size={20} />, label: 'Music' },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Help' },
    { id: 'modalvate', icon: <Circle size={20} />, label: 'Modalvate' },
    { id: 'theme', icon: <Palette size={20} />, label: 'Theme' },
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showToolbar) return; // Do nothing if the toolbar is not shown

      // Check if the event target is an input, textarea, or contenteditable element
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return;
      }

      const key = event.key;

      const index = parseInt(key, 10);

      if (!isNaN(index)) {
        if (firstKeyPress !== null) {
          // If there's already a first key press, combine it with the current key press
          const fullIndex = parseInt(firstKeyPress.toString() + key, 10);

          if (fullIndex >= 1 && fullIndex <= toolbarItems.length) {
            handleMenuItemClick(toolbarItems[fullIndex - 1].id);
          }

          // Reset the first key press
          setFirstKeyPress(null);
        } else {
          // Set the first key press
          setFirstKeyPress(index);

          // Set a timeout to reset the first key press if no second key press is detected
          const timeout = setTimeout(() => {
            if (index >= 1 && index <= toolbarItems.length) {
              handleMenuItemClick(toolbarItems[index - 1].id);
            }
            setFirstKeyPress(null);
          }, 300); // 300ms delay to wait for a second key press

          setKeyPressTimeout(timeout);
        }
      } else {
        // Reset the first key press if a non-numeric key is pressed
        setFirstKeyPress(null);
        if (keyPressTimeout) {
          clearTimeout(keyPressTimeout);
          setKeyPressTimeout(null);
        }
      }
    };

    // Use event capturing to intercept key events before they reach the input fields
    document.addEventListener('keydown', handleKeyPress, true);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true);
      if (keyPressTimeout) {
        clearTimeout(keyPressTimeout);
      }
    };
  }, [showToolbar, toolbarItems, firstKeyPress, keyPressTimeout, openModal]);

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {showToolbar && (
        <div className="absolute bottom-14 right-0 flex flex-col items-end space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:bottom-6 md:right-14">
          {toolbarItems.map(item => (
            <div key={item.id} className="relative group">
              <span className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-full px-2 py-1 text-xs bg-gray-900/90 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -ml-2 md:left-1/2 md:-translate-x-1/2 md:translate-y-0 md:-mt-6">
                {item.label}
              </span>
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={`p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 transition-colors duration-300 ${theme}`}
              >
                {item.icon}
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={toggleToolbar}
        className={`p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 transition-colors duration-300 ${theme}`}
      >
        <span className="sr-only">Toggle Toolbar</span>
        ☰
      </button>
      <PomodoroModal
        isOpen={modals.isOpen.isPomodoroModalOpen || false}
        onClose={() => closeModal('isPomodoroModalOpen')}
        theme={theme}
        onTimerUpdate={modals.onTimerUpdate}
        isTimerRunning={modals.isTimerRunning}
        timerTimeLeft={modals.timerTimeLeft}
        setIsTimerRunning={modals.setIsTimerRunning}
        setTimerTimeLeft={modals.setTimerTimeLeft}
      />
      <RefiModal isOpen={modals.isOpen.isRefiOpen} onClose={() => closeModal('isRefiOpen')} theme={theme} />
      <Gov isOpen={modals.isOpen.isGovOpen} onClose={() => closeModal('isGovOpen')} theme={theme} />
      <Networks isOpen={modals.isOpen.isNetworksOpen} onClose={() => closeModal('isNetworksOpen')} theme={theme} />
      <Defi isOpen={modals.isOpen.isDefiOpen} onClose={() => closeModal('isDefiOpen')} theme={theme} />
      <Docs isOpen={modals.isOpen.isDocsOpen} onClose={() => closeModal('isDocsOpen')} theme={theme} />
      <TimeZonesModal isOpen={modals.isOpen.isTimeZonesOpen} onClose={() => closeModal('isTimeZonesOpen')} theme={theme} />
      <Lens isOpen={modals.isOpen.isLensOpen} onClose={() => closeModal('isLensOpen')} theme={theme} />
      <GamebModal isOpen={modals.isOpen.isGamebOpen} onClose={() => closeModal('isGamebOpen')} theme={theme} iframeUrl="https://innkeeping.github.io/gameB/" />
      <Prices isOpen={modals.isOpen.isPricesOpen} onClose={() => closeModal('isPricesOpen')} theme={theme} />
      <IPFSModal isOpen={modals.isOpen.isIpfsOpen} onClose={() => closeModal('isIpfsOpen')} theme={theme} />
      <Web3SocialModal isOpen={modals.isOpen.isWeb3SocialOpen} onClose={() => closeModal('isWeb3SocialOpen')} theme={theme} />
      <WalletsModal isOpen={modals.isOpen.isWalletsOpen} onClose={() => closeModal('isWalletsOpen')} theme={theme} />
      <LexiconModal isOpen={modals.isOpen.isLexiconOpen} onClose={() => closeModal('isLexiconOpen')} theme={theme} />
      <MusicModal
        isOpen={modals.isOpen.isMusicOpen}
        onClose={() => closeModal('isMusicOpen')}
        theme={theme}
        onOpen={() => console.log('MusicModal opened')} // Provide the onOpen prop
      />
      <Help isOpen={modals.isOpen.isHelpOpen} onClose={() => closeModal('isHelpOpen')} theme={theme} />
      <Modalvate isOpen={modals.isOpen.isModalvateOpen} onClose={() => closeModal('isModalvateOpen')} theme={theme} />
    </div>
  );
};

export default Toolbar;