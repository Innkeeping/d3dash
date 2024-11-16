import React from 'react'
import { X, Network } from 'lucide-react'
import { Theme } from '../types'

interface NetworksProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const Networks: React.FC<NetworksProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  }

  const chainInfo = [
    {
      name: 'Arbitrum One',
      chainId: '42161 (0xa4b1)',
      currency: 'ETH',
      url: 'https://arbiscan.io/'
    },
    {
      name: 'Base',
      chainId: '8453 (0x2105)',
      currency: 'ETH',
      url: 'https://basescan.org/'
    },
    {
      name: 'Celo Mainnet',
      chainId: '42220 (0xa4ec)',
      currency: 'CELO',
      url: 'https://celoscan.io/'
    },
    {
      name: 'Ethereum Mainnet',
      chainId: '1 (0x1)',
      currency: 'ETH',
      url: 'https://etherscan.io/'
    },
    {
      name: 'Gnosis',
      chainId: '100 (0x64)',
      currency: 'XDAI',
      url: 'https://gnosisscan.io/'
    },
    {
      name: 'OP Mainnet',
      chainId: '10 (0xa)',
      currency: 'ETH',
      url: 'https://optimistic.etherscan.io/'
    },
    {
      name: 'Polygon Mainnet',
      chainId: '137 (0x89)',
      currency: 'POL',
      url: 'https://polygonscan.com/'
    },
    {
      name: 'Polygon zkEVM',
      chainId: '1101 (0x44d)',
      currency: 'ETH',
      url: 'https://zkevm.polygonscan.com/'
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Network Info/Scans</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {chainInfo.map((chain) => (
            <a
              key={chain.name}
              href={chain.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors block"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                <Network className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{chain.name}</h3>
                <p className="text-sm opacity-75">
                  Chain ID: {chain.chainId}, Currency: {chain.currency}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-sm opacity-75">
          <p>Information for various blockchain networks.</p>
        </div>
      </div>
    </div>
  )
}

export default Networks