// src/LinkGrid.tsx
import React from 'react'
import { Theme, Link } from '../types'
import { BarChart, Book, Briefcase, CircleDollarSign, Compass, DollarSign, Flower2, HardDrive, Heart, Leaf, MessageSquare, Network, Orbit, PieChart, Pill, Radio, Shrub, Users, Vote } from 'lucide-react'

interface LinkGridProps {
  links: Link[]
  theme: Theme
}

const LinkGrid: React.FC<LinkGridProps> = ({ links, theme }) => {
  const themeClasses = {
    purple: 'border-purple-500/20 hover:border-purple-500/40 text-purple-300 group-hover:text-purple-200',
    green: 'border-green-500/20 hover:border-green-500/40 text-green-300 group-hover:text-green-200',
    teal: 'border-teal-500/20 hover:border-teal-500/40 text-teal-300 group-hover:text-teal-200'
  }

  const defaultIcons: { [key: string]: React.ReactNode } = {
    'Arbitrum One': <PieChart className="text-green-400" size={24} />,
    'Base': <Compass className="text-orange-400" size={24} />,
    'Celo Mainnet': <BarChart className="text-blue-400" size={24} />,
    'Ethereum Mainnet': <Briefcase className="text-pink-400" size={24} />,
    'Gnosis': <CircleDollarSign className="text-teal-400" size={24} />,
    'OP Mainnet': <DollarSign className="text-purple-400" size={24} />,
    'Polygon Mainnet': <HardDrive className="text-cyan-400" size={24} />,
    'Polygon zkEVM': <Network className="text-purple-400" size={24} />,
    'Alchemy': <Book className="text-purple-400" size={24} />,
    'Chainlink': <Book className="text-purple-400" size={24} />,
    'Ethereum': <Book className="text-emerald-400" size={24} />,
    'ENS (Ethereum Name Service)': <Book className="text-emerald-400" size={24} />,
    'Foundry': <Book className="text-emerald-400" size={24} />,
    'Hardhat': <Book className="text-green-400" size={24} />,
    'Infura': <Book className="text-purple-400" size={24} />,
    'IPFS': <Book className="text-purple-400" size={24} />,
    'OpenZeppelin': <Book className="text-purple-400" size={24} />,
    'RainbowKit': <Book className="text-green-400" size={24} />,
    'Reown': <Book className="text-green-400" size={24} />,
    'Remix IDE': <Book className="text-emerald-400" size={24} />,
    'Solidity': <Book className="text-purple-400" size={24} />,
    'Scaffold-ETH 2': <Book className="text-green-400" size={24} />,
    'The Graph': <Book className="text-green-400" size={24} />,
    'ThirdWeb': <Book className="text-emerald-400" size={24} />,
    'Viem': <Book className="text-purple-400" size={24} />,
    'Wagmi': <Book className="text-purple-400" size={24} />,
    'Web3.js': <Book className="text-green-400" size={24} />,
    'Ethers.js': <Book className="text-emerald-400" size={24} />,
    'Snapshot': <Vote className="text-blue-400" size={24} />,
    'Tally': <Radio className="text-purple-400" size={24} />,
    'Commonwealth': <Users className="text-green-400" size={24} />,
    'Discourse': <MessageSquare className="text-orange-400" size={24} />,
    'Gardens': <Flower2 className="text-pink-400" size={24} />,
    'Giveth': <Heart className="text-purple-400" size={24} />,
    'GreenPill Network': <Pill className="text-green-400" size={24} />,
    'Letʼs GROW DAO': <Shrub className="text-emerald-400" size={24} />,
    'ReFi DAO': <Orbit className="text-purple-400" size={24} />,
    'Klima DAO': <Leaf className="text-green-400" size={24} />
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
      {links.map((link, index) => {
        const icon = link.icon ? <div dangerouslySetInnerHTML={{ __html: link.icon }} /> : defaultIcons[link.name] || null;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center p-4 rounded-lg bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm group ${themeClasses[theme]}`}
          >
            <div className="transition-colors duration-300">
              {icon}
            </div>
            <span className="mt-2 text-sm font-medium">
              {link.name}
            </span>
          </a>
        )
      })}
    </div>
  )
}

export default LinkGrid