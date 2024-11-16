import React, { useState } from 'react'
import {
  Terminal, Settings, Wallet, Palette,
  Coffee, Network, Heart, Radio, Coins
} from 'lucide-react'
import { Theme } from '../types'
import PomodoroModal from './PomodoroModal'
import RefiModal from './RefiModal'
import GovernanceModal from './GovernanceModal'
import Networks from './Networks'
import DefiModal from './DefiModal' // Import DefiModal

interface ToolbarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ theme, setTheme }) => {
  const [showToolbar, setShowToolbar] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showPomodoro, setShowPomodoro] = useState(false)
  const [showRefi, setShowRefi] = useState(false)
  const [showGovernance, setShowGovernance] = useState(false)
  const [showNetworks, setShowNetworks] = useState(false)
  const [showDefi, setShowDefi] = useState(false) // State for DefiModal

  const themeClasses = {
    purple: 'border-purple-500/30 text-purple-300 hover:text-purple-100',
    green: 'border-green-500/30 text-green-300 hover:text-green-100'
  };

  const toolbarItems = [
    { id: 'wallet', icon: <Wallet size={20} />, label: 'Connect Wallet' },
    { id: 'blockchain', icon: <Network size={20} />, label: 'Networks' },
    { id: 'dao', icon: <Radio size={20} />, label: 'Governance' },
    { id: 'refi', icon: <Heart size={20} />, label: 'ReFi Projects' },
    { id: 'defi', icon: <Coins size={20} />, label: 'DeFi Tools' }, // Defi Tools
    { id: 'terminal', icon: <Terminal size={20} />, label: 'Dev Console' },
    { id: 'theme', icon: <Palette size={20} />, label: 'Theme' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    { id: 'break', icon: <Coffee size={20} />, label: 'Take a Break' },
  ];

  const handleItemClick = (id: string) => {
    if (id === 'theme') {
      setTheme(theme === 'purple' ? 'green' : 'purple')
    } else if (id === 'break') {
      setShowPomodoro(true)
    } else if (id === 'refi') {
      setShowRefi(true)
    } else if (id === 'dao') {
      setShowGovernance(true)
    } else if (id === 'blockchain') {
      setShowNetworks(true);
    } else if (id === 'defi') { // Handle Defi Tools
      setShowDefi(true);
    }
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <>
      <div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-20"
        onMouseEnter={() => setShowToolbar(true)}
        onMouseLeave={() => setShowToolbar(false)}
      >
        <div className={`transition-transform duration-300 ${showToolbar ? 'translate-x-0' : 'translate-x-14'}`}>
          <div className={`flex flex-col items-center gap-2 p-2 bg-gray-900/90 border-l border-y rounded-l-xl backdrop-blur-sm ${themeClasses[theme]}`}>
            {toolbarItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative ${
                    activeMenu === item.id ? (theme === 'purple' ? 'bg-purple-900/50' : 'bg-green-900/50') : ''
                  }`}
                >
                  {item.icon}
                  <span className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 mr-2 px-2 py-1 text-xs bg-gray-900/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -ml-2">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PomodoroModal isOpen={showPomodoro} onClose={() => setShowPomodoro(false)} theme={theme} />
      <RefiModal isOpen={showRefi} onClose={() => setShowRefi(false)} theme={theme} />
      <GovernanceModal isOpen={showGovernance} onClose={() => setShowGovernance(false)} theme={theme} />
      <Networks isOpen={showNetworks} onClose={() => setShowNetworks(false)} theme={theme} />
      <DefiModal isOpen={showDefi} onClose={() => setShowDefi(false)} theme={theme} /> {/* DefiModal */}
    </>
  );
};

export default Toolbar;