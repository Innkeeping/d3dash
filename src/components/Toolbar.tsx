import React, { useEffect, useState } from 'react'
import { Network, Radio, Heart, Coins, Book, Terminal, Palette, Coffee, Clock, Glasses, DollarSign } from 'lucide-react'
import { ToolbarProps, Theme, ModalsState } from '../types'

const Toolbar: React.FC<ToolbarProps> = ({ theme, setTheme, showToolbar, toggleToolbar, openModal, toggleModal }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [firstKeyPress, setFirstKeyPress] = useState<number | null>(null)
  const [keyPressTimeout, setKeyPressTimeout] = useState<NodeJS.Timeout | null>(null)


  const themes: Theme[] = ['purple', 'green', 'teal']

  const handleMenuItemClick = (id: string) => {
    setActiveMenu(id);

    if (id === 'theme') {
      const currentThemeIndex = themes.indexOf(theme);
      setTheme(themes[(currentThemeIndex + 1) % themes.length])
    } else if (id === 'break') {
      toggleModal('isPomodoroOpen')
    } else if (id === 'timezones') {
      openModal('isWClockOpen')
    } else {
      const modalKey = `is${id.charAt(0).toUpperCase() + id.slice(1)}Open` as keyof ModalsState['isOpen']
      console.log(`Opening modal with key: ${modalKey}`)
      openModal(modalKey)
    }
  };

  const toolbarItems = [
    { id: 'networks', icon: <Network size={20} />, label: 'Networks' },
    { id: 'gov', icon: <Radio size={20} />, label: 'Governance' },
    { id: 'refi', icon: <Heart size={20} />, label: 'ReFi Projects' },
    { id: 'defi', icon: <Coins size={20} />, label: 'DeFi Tools' },
    { id: 'docs', icon: <Book size={20} />, label: 'Web3 Docs' },
    { id: 'gameB', icon: <Terminal size={20} />, label: 'GameB Console' },
    { id: 'wClock', icon: <Clock size={20} />, label: 'World Clock' },
    { id: 'lens', icon: <Glasses size={20} />, label: 'Lens Feed' },
    { id: 'prices', icon: <DollarSign size={20} />, label: 'Token Prices' },
    { id: 'ipfs', icon: <Network size={20} />, label: 'IPFS CID Checker' },
    // { id: 'social', icon: <MessageCircle size={20} />, label: 'Web3 Social' },
    // { id: 'wallets', icon: <Folder size={20} />, label: 'Wallets' },
    // { id: 'lexicon', icon: <Book size={20} />, label: 'Lexicon' },
    // { id: 'music', icon: <Music size={20} />, label: 'Music' },
    // { id: 'help', icon: <HelpCircle size={20} />, label: 'Help' },
    // { id: 'modalvate', icon: <Circle size={20} />, label: 'Modalvate' },
    { id: 'break', icon: <Coffee size={20} />, label: 'Take a Break' },
    { id: 'theme', icon: <Palette size={20} />, label: 'Theme' },
  ]

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showToolbar) return;

      const target = event.target as HTMLElement;
      if (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return
      }

      const key = event.key

      const index = parseInt(key, 10)

      if (!isNaN(index)) {
        if (firstKeyPress !== null) {

          const fullIndex = parseInt(firstKeyPress.toString() + key, 10)

          if (fullIndex >= 1 && fullIndex <= toolbarItems.length) {
            handleMenuItemClick(toolbarItems[fullIndex - 1].id)
          }

          setFirstKeyPress(null)
        } else {

          setFirstKeyPress(index)


          const timeout = setTimeout(() => {
            if (index >= 1 && index <= toolbarItems.length) {
              handleMenuItemClick(toolbarItems[index - 1].id)
            }
            setFirstKeyPress(null)
          }, 300);

          setKeyPressTimeout(timeout)
        }
      } else {
        setFirstKeyPress(null)
        if (keyPressTimeout) {
          clearTimeout(keyPressTimeout)
          setKeyPressTimeout(null)
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress, true)

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true)
      if (keyPressTimeout) {
        clearTimeout(keyPressTimeout);
      }
    }
  }, [showToolbar, toolbarItems, firstKeyPress, keyPressTimeout, openModal])

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {showToolbar && (
        <div className="absolute bottom-14 right-0 flex flex-col items-end space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:bottom-6 md:right-14">
          {toolbarItems.map(item => (
            <div key={item.id} className="relative group">
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full px-2 py-1 text-xs bg-gray-900/90 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -ml-2 md:left-1/2 md:-translate-x-1/2 md:translate-y-6 md:-mt-6">
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
    </div>
  )
}

export default Toolbar