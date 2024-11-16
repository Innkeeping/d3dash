import React from 'react'
import { X, Network } from 'lucide-react'
import { Theme } from '../types'

interface DexModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const DexModal: React.FC<DexModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  }

  const dexInfo = [
    {
      name: 'Uniswap',
      url: 'https://uniswap.org/'
    },
    {
      name: '1inch',
      url: 'https://1inch.exchange/'
    },
    {
      name: 'Balancer',
      url: 'https://balancer.exchange/'
    },
    {
      name: 'Jumper.Exchange',
      url: 'https://jumper.exchange/'
    },
    {
      name: 'QuickSwap',
      url: 'https://quickswap.exchange/'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Decentralized Exchanges</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {dexInfo.map((dex) => (
            <a
              key={dex.name}
              href={dex.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors block"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                <Network className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{dex.name}</h3>
                <p className="text-sm opacity-75">Visit {dex.name}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-sm opacity-75">
          <p>Links to popular decentralized exchanges.</p>
        </div>
      </div>
    </div>
  )
}

export default DexModal