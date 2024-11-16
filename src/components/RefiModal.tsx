import React from 'react'
import { X, Heart, Leaf, Pill, Shrub, Orbit } from 'lucide-react'
import { Theme } from '../types'

interface RefiModalProps {
  isOpen: boolean;
  onClose: () => void
  theme: Theme
}

const RefiModal: React.FC<RefiModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20'
  }

  const projects = [
    {
      name: 'Giveth',
      icon: <Heart className="text-purple-400" size={24} />,
      url: 'https://giveth.io',
      description: 'Building the Future of Giving through blockchain technology',
    },
    {
      name: 'GreenPill Network',
      icon: <Pill className="text-green-400" size={24} />,
      url: 'https://greenpill.network',
      description: 'Turning degens to regens.',
    },
    {
      name: 'Letʼs GROW DAO',
      icon: <Shrub className="text-emerald-400" size={24} />,
      url: 'https://www.letsgrow.network/',
      description: 'On a mission to unite & GROW the Regen Movement',
    },
    {
      name: 'ReFi DAO',
      icon: <Orbit className="text-purple-400" size={24} />,
      url: 'https://www.refidao.com/',
      description: 'The home of the regenerative finance ecosystem.',
    },
    {
      name: 'Klima DAO',
      icon: <Leaf className="text-green-400" size={24} />,
      url: 'https://www.klimadao.finance',
      description: 'Driving climate action through tokenized carbon credits',
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-[600px] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">ReFi Projects</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
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
          <p>Regenerative Finance (ReFi) uses blockchain technology and decentralized finance to create positive environmental and social impact while generating financial returns.</p>
        </div>
      </div>
    </div>
  )
}

export default RefiModal