import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types';
import useClickOutside from '../hooks/useClickOutside';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen:() => void;
  theme: Theme;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  };

  const keyCommands = {
    'Ctrl+K': 'focusSearchBar',
    'Ctrl+B': 'toggleToolbar',
    'Escape': 'closeModalsOrToolbar',
    'Alt+T': 'changeTheme',
    'Alt+M': 'toggleMusicModal',
    'Alt+H': 'toggleHelpModal',
  };

  const modalDescriptions: { [key: string]: string } = {
    isCryptoPricesModalOpen: 'Open Crypto Prices',
    isTimeZonesModalOpen: 'Open Time Zones',
    isDocsModalOpen: 'Open Web3 Docs',
    isWeb3SocialModalOpen: 'Open Web3 Social',
    isLexiconModalOpen: 'Open Lexicon',
    isWalletsModalOpen: 'Open Wallets',
    isMusicModalOpen: 'Open Music',
    isHelpModalOpen: 'Open Help',
  };

  const searchTerms = {
    'price': 'isCryptoPricesModalOpen',
    'clock': 'isTimeZonesModalOpen',
    'time': 'isTimeZonesModalOpen',
    'utc': 'isTimeZonesModalOpen',
    'docs': 'isDocsModalOpen',
    'social': 'isWeb3SocialModalOpen',
    'words': 'isLexiconModalOpen',
    'dictionary': 'isLexiconModalOpen',
    'lexicon': 'isLexiconModalOpen',
    'wallet': 'isWalletsModalOpen',
    'music': 'isMusicModalOpen',
    'sound': 'isMusicModalOpen',
    'tunes': 'isMusicModalOpen',
    'help': 'isHelpModalOpen',
  } as const;

  const groupedSearchTerms = {
    'isCryptoPricesModalOpen': ['price'],
    'isTimeZonesModalOpen': ['clock', 'time', 'utc'],
    'isDocsModalOpen': ['docs'],
    'isWeb3SocialModalOpen': ['social'],
    'isLexiconModalOpen': ['words', 'dictionary', 'lexicon'],
    'isWalletsModalOpen': ['wallet'],
    'isMusicModalOpen': ['music', 'sound', 'tunes'],
    'isHelpModalOpen': ['help'],
  } as const;

  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Help</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(keyCommands).map(([key, command]) => (
            <div key={command} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30">
              <span className="font-semibold">{key}</span>
              <span>{command.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Search Commands</h3>
          <ul className="space-y-2">
            {Object.entries(groupedSearchTerms).map(([modal, terms]) => (
              <li key={modal} className="flex items-center justify-between">
                <span>{terms.join(', ')}</span>
                <span>{modalDescriptions[modal]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Toolbar Shortcuts</h3>
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <p>When the toolbar is open, you can type the corresponding number to open the respective modal:</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center justify-between">
                <span>1</span>
                <span>Networks</span>
              </li>
              <li className="flex items-center justify-between">
                <span>2</span>
                <span>Governance</span>
              </li>
              <li className="flex items-center justify-between">
                <span>3</span>
                <span>ReFi Projects</span>
              </li>
              <li className="flex items-center justify-between">
                <span>4</span>
                <span>DeFi Tools</span>
              </li>
              <li className="flex items-center justify-between">
                <span>5</span>
                <span>Web3 Docs</span>
              </li>
              <li className="flex items-center justify-between">
                <span>6</span>
                <span>GameB Console</span>
              </li>
              <li className="flex items-center justify-between">
                <span>7</span>
                <span>Take a Break</span>
              </li>
              <li className="flex items-center justify-between">
                <span>8</span>
                <span>World Clock</span>
              </li>
              <li className="flex items-center justify-between">
                <span>9</span>
                <span>Lens Feed</span>
              </li>
              <li className="flex items-center justify-between">
                <span>10</span>
                <span>Token Prices</span>
              </li>
              <li className="flex items-center justify-between">
                <span>11</span>
                <span>IPFS CID Checker</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-sm opacity-75">
          <p>You can also search for web3-related things to find more links and shortcuts.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;