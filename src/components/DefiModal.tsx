import React from 'react'
import { X, DollarSign, PieChart, BarChart, Compass, Briefcase, HardDrive, CircleDollarSign } from 'lucide-react'
import { Theme } from '../types'

interface DefiModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const DefiModal: React.FC<DefiModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20'
  }

  const defiProjects = [
    {
      name: 'Uniswap',
      icon: <DollarSign className="text-purple-400" size={24} />,
      url: 'https://uniswap.org',
      description: 'A decentralized exchange (DEX) for ERC-20 tokens',
    },
    {
      name: 'Aave',
      icon: <PieChart className="text-green-400" size={24} />,
      url: 'https://aave.com',
      description: 'A decentralized lending and borrowing protocol',
    },
    {
      name: 'Compound',
      icon: <BarChart className="text-blue-400" size={24} />,
      url: 'https://compound.finance',
      description: 'A decentralized lending protocol on Ethereum',
    },
    {
      name: 'Balancer',
      icon: <Compass className="text-orange-400" size={24} />,
      url: 'https://balancer.fi',
      description: 'A decentralized exchange and automated market maker',
    },
    {
      name: 'Curve',
      icon: <Briefcase className="text-pink-400" size={24} />,
      url: 'https://curve.fi',
      description: 'A decentralized exchange for stablecoins',
    },
    {
      name: 'Yearn',
      icon: <HardDrive className="text-cyan-400" size={24} />,
      url: 'https://yearn.finance',
      description: 'A suite of DeFi tools for managing decentralized assets',
    },
    {
      name: 'Rari Capital',
      icon: <CircleDollarSign className="text-teal-400" size={24} />,
      url: 'https://rari.capital',
      description: 'A decentralized lending and borrowing protocol with smart yield farming',
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">DeFi Projects</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {defiProjects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors block"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                {project.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm opacity-75">{project.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-sm opacity-75">
          <p>DeFi projects use blockchain technology to create financial applications that operate without centralized intermediaries.</p>
        </div>
      </div>
    </div>
  )
}

export default DefiModal