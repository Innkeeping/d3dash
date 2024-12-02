import React, { useRef, useEffect } from 'react'
import { X, Radio, Vote, Users, MessageSquare, Flower2 } from 'lucide-react'
import { Theme } from '../types'

interface GovProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

const Gov: React.FC<GovProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  }

  const tools = [
    {
      name: 'Snapshot',
      icon: <Vote className="text-blue-400" size={24} />,
      url: 'https://snapshot.org',
      description: 'Gasless, off-chain voting system for DAOs',
    },
    {
      name: 'Tally',
      icon: <Radio className="text-purple-400" size={24} />,
      url: 'https://www.tally.xyz',
      description: 'DAO governance dashboard and voting interface',
    },
    {
      name: 'Commonwealth',
      icon: <Users className="text-green-400" size={24} />,
      url: 'https://commonwealth.im',
      description: 'Discussion forum and governance platform for Web3 communities',
    },
    {
      name: 'Discourse',
      icon: <MessageSquare className="text-orange-400" size={24} />,
      url: 'https://www.discourse.org',
      description: 'Community discussion and governance forum',
    },
    {
      name: 'Gardens',
      icon: <Flower2 className="text-pink-400" size={24} />,
      url: 'https://www.gardens.fund/',
      description: 'Gardens is a coordination platform',
    },
  ]

  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Governance Tools</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                {tool.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{tool.name}</h3>
                <p className="text-sm opacity-75">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-sm opacity-75">
          <p>DAO governance tools enable decentralized decision-making, proposal creation, voting, and community discussions in Web3 organizations.</p>
        </div>
      </div>
    </div>
  )
}

export default Gov