// src/Toolbar.tsx
import React, { useState } from 'react';
import { Network, Radio, Heart, Coins, Book, Terminal, Palette, Coffee, Clock, Glasses, DollarSign } from 'lucide-react';
import { Theme } from '../types';
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
}

const Toolbar: React.FC<ToolbarProps> = ({ theme, setTheme, onPomodoroOpen, onTimeZonesOpen, showToolbar, toggleToolbar }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showRefi, setShowRefi] = useState(false);
  const [showGovernance, setShowGovernance] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);
  const [showDefi, setShowDefi] = useState(false);
  const [showTimeZones, setShowTimeZones] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showLensFeed, setShowLensFeed] = useState(false);
  const [showGameb, setShowGameb] = useState(false);
  const [showCryptoPrices, setShowCryptoPrices] = useState(false);
  const [showIPFSModal, setShowIPFSModal] = useState(false);

  const themes: Theme[] = ['purple', 'green', 'teal'];

  const handleMenuItemClick = (id: string) => {
    setActiveMenu(id);

    if (id === 'theme') {
      const currentThemeIndex = themes.indexOf(theme);
      setTheme(themes[(currentThemeIndex + 1) % themes.length]);
    } else if (id === 'break') {
      onPomodoroOpen(); // Open Pomodoro Modal
    } else if (id === 'refi') {
      setShowRefi(true);
    } else if (id === 'dao') {
      setShowGovernance(true);
    } else if (id === 'blockchain') {
      setShowNetworks(true);
    } else if (id === 'defi') {
      setShowDefi(true);
    } else if (id === 'docs') {
      setShowDocs(true);
    } else if (id === 'timezones') {
      onTimeZonesOpen();
    } else if (id === 'lensfeed') {
      setShowLensFeed(true);
    } else if (id === 'terminal') {
      setShowGameb(true);
    } else if (id === 'cryptoprices') {
      setShowCryptoPrices(true);
    } else if (id === 'ipfs') {
      setShowIPFSModal(true);
    }
  };

  const toolbarItems = [
    { id: 'blockchain', icon: <Network size={20} />, label: 'Networks' },
    { id: 'dao', icon: <Radio size={20} />, label: 'Governance' },
    { id: 'refi', icon: <Heart size={20} />, label: 'ReFi Projects' },
    { id: 'defi', icon: <Coins size={20} />, label: 'DeFi Tools' },
    { id: 'docs', icon: <Book size={20} />, label: 'Web3 Docs' },
    { id: 'terminal', icon: <Terminal size={20} />, label: 'GameB Console' },
    { id: 'theme', icon: <Palette size={20} />, label: 'Theme' },
    { id: 'break', icon: <Coffee size={20} />, label: 'Take a Break' },
    { id: 'timezones', icon: <Clock size={20} />, label: 'World Clock' },
    { id: 'lensfeed', icon: <Glasses size={20} />, label: 'Lens Feed' },
    { id: 'cryptoprices', icon: <DollarSign size={20} />, label: 'Token Prices' },
    { id: 'ipfs', icon: <Network size={20} />, label: 'IPFS CID Checker' },
  ];

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <button
        onClick={toggleToolbar}
        className={`p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 transition-colors duration-300`}
      >
        <span className="sr-only">Toggle Toolbar</span>
        ☰
      </button>
      {showToolbar && (
        <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-2">
          {toolbarItems.map(item => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 transition-colors duration-300"
              >
                {item.icon}
                <span className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 mr-2 px-2 py-1 text-xs bg-gray-900/90 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -ml-2">
                  {item.label}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
      <PomodoroModal
        isOpen={false}
        onClose={() => {}}
        theme={theme}
        onTimerUpdate={() => {}}
      />
      <RefiModal isOpen={showRefi} onClose={() => setShowRefi(false)} theme={theme} />
      <GovernanceModal isOpen={showGovernance} onClose={() => setShowGovernance(false)} theme={theme} />
      <Networks isOpen={showNetworks} onClose={() => setShowNetworks(false)} theme={theme} />
      <DefiModal isOpen={showDefi} onClose={() => setShowDefi(false)} theme={theme} />
      <DocsModal isOpen={showDocs} onClose={() => setShowDocs(false)} theme={theme} />
      <TimeZonesModal isOpen={showTimeZones} onClose={() => setShowTimeZones(false)} theme={theme} />
      <LensFeedModal isOpen={showLensFeed} onClose={() => setShowLensFeed(false)} theme={theme} />
      <GamebModal isOpen={showGameb} onClose={() => setShowGameb(false)} theme={theme} iframeUrl="https://www.example.com" />
      <CryptoPricesModal isOpen={showCryptoPrices} onClose={() => setShowCryptoPrices(false)} theme={theme} />
      <IPFSModal isOpen={showIPFSModal} onClose={() => setShowIPFSModal(false)} theme={theme} />
    </div>
  );
};

export default Toolbar;