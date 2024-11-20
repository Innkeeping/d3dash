// src/Toolbar.tsx
import React, { useState, useEffect } from 'react';
import { Network, Radio, Heart, Coins, Book, Terminal, Palette, Coffee, Clock, Glasses, DollarSign } from 'lucide-react';
import { Theme, ModalsState, ModalsProps } from '../types';
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
      const modalKey = `is${id.charAt(0).toUpperCase() + id.slice(1)}ModalOpen` as keyof ModalsState;
      console.log(`Opening modal with key: ${modalKey}`); // Debug statement
      openModal(modalKey);
    }
  };

  const toolbarItems = [
    { id: 'blockchain', icon: <Network size={20} />, label: 'Networks' },
    { id: 'governance', icon: <Radio size={20} />, label: 'Governance' },
    { id: 'refi', icon: <Heart size={20} />, label: 'ReFi Projects' },
    { id: 'defi', icon: <Coins size={20} />, label: 'DeFi Tools' },
    { id: 'docs', icon: <Book size={20} />, label: 'Web3 Docs' },
    { id: 'terminal', icon: <Terminal size={20} />, label: 'GameB Console' },
    { id: 'break', icon: <Coffee size={20} />, label: 'Take a Break' },
    { id: 'timezones', icon: <Clock size={20} />, label: 'World Clock' },
    { id: 'lensfeed', icon: <Glasses size={20} />, label: 'Lens Feed' },
    { id: 'cryptoPrices', icon: <DollarSign size={20} />, label: 'Token Prices' },
    { id: 'ipfs', icon: <Network size={20} />, label: 'IPFS CID Checker' },
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
        isOpen={modals.isPomodoroModalOpen}
        onClose={() => closeModal('isPomodoroModalOpen')}
        theme={theme}
        onTimerUpdate={modals.onTimerUpdate}
      />
      <RefiModal isOpen={modals.isRefiModalOpen} onClose={() => closeModal('isRefiModalOpen')} theme={theme} />
      <GovernanceModal isOpen={modals.isGovernanceModalOpen} onClose={() => closeModal('isGovernanceModalOpen')} theme={theme} />
      <Networks isOpen={modals.isBlockchainModalOpen} onClose={() => closeModal('isBlockchainModalOpen')} theme={theme} />
      <DefiModal isOpen={modals.isDefiModalOpen} onClose={() => closeModal('isDefiModalOpen')} theme={theme} />
      <DocsModal isOpen={modals.isDocsModalOpen} onClose={() => closeModal('isDocsModalOpen')} theme={theme} />
      <TimeZonesModal isOpen={modals.isTimeZonesModalOpen} onClose={() => closeModal('isTimeZonesModalOpen')} theme={theme} />
      <LensFeedModal isOpen={modals.isLensfeedModalOpen} onClose={() => closeModal('isLensfeedModalOpen')} theme={theme} />
      <GamebModal isOpen={modals.isTerminalModalOpen} onClose={() => closeModal('isTerminalModalOpen')} theme={theme} iframeUrl="https://www.example.com" />
      <CryptoPricesModal isOpen={modals.isCryptoPricesModalOpen} onClose={() => closeModal('isCryptoPricesModalOpen')} theme={theme} />
      <IPFSModal isOpen={modals.isIpfsModalOpen} onClose={() => closeModal('isIpfsModalOpen')} theme={theme} />
    </div>
  );
};

export default Toolbar;