// src/components/Refi.tsx
import React, { useState, useRef, useEffect } from 'react'
import { X, Heart, Leaf, Pill, Shrub, Orbit, Newspaper } from 'lucide-react'
import { Theme } from '../types'

interface RefiProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

const Refi: React.FC<RefiProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const listItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

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
      name: "Let's GROW DAO",
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
    {
      name: 'CarbonCopy.News',
      icon: <Newspaper className="text-teal-400" size={24} />,
      url: 'https://carboncopy.news/',
      description: 'CARBON Copy is the preeminent source of ReFi news, information, and analysis',
    },
  ]

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus()
        setFocusedIndex(null)
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpen])

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
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= filteredProjects.length - 1 ? 0 : prevIndex + 1
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (focusedIndex === 0) {
          setFocusedIndex(null)
          searchInputRef.current?.focus()
        } else if (focusedIndex === null) {
        } else {
          setFocusedIndex((prevIndex) =>
            prevIndex === null || prevIndex <= 0 ? filteredProjects.length - 1 : prevIndex - 1
          )
        }
      } else if (event.key === 'Enter' && focusedIndex !== null) {
        event.preventDefault()
        const link = listItemsRef.current[focusedIndex];
        if (link) {
          link.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredProjects, focusedIndex, onClose])

  useEffect(() => {
    if (focusedIndex !== null && listItemsRef.current[focusedIndex]) {
      listItemsRef.current[focusedIndex].focus()
    }
  }, [focusedIndex])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">ReFi Projects</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="space-y-4">
          {filteredProjects.map((project, index) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors ${
                focusedIndex === index ? 'bg-gray-800/30' : ''
              }`}
              ref={(el) => (listItemsRef.current[index] = el)}
              tabIndex={0}
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

        {filteredProjects.length === 0 && (
          <div className="mt-6 text-sm opacity-75">
            <p>No results found for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Regenerative Finance (ReFi) uses blockchain technology and decentralized finance to create positive environmental and social impact while generating financial returns.</p>
        </div>
      </div>
    </div>
  )
}

export default Refi