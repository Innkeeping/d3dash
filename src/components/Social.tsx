// src/components/Social.tsx
import React, { useState, useRef, useEffect } from 'react'
import { X, Globe, Share, MessageSquare, Users, Link, Camera, Film, Check, Mail, Terminal } from 'lucide-react'
import { Theme } from '../types'

interface SocialProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

const Social: React.FC<SocialProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const listItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const socialPlatforms = [
    {
      name: 'Lens',
      icon: <Globe className="text-purple-400" size={24} />,
      url: 'https://www.lens.xyz/',
      description: 'Lens is a decentralized social graph protocol for web3.',
    },
    {
      name: 'Farcaster',
      icon: <Share className="text-green-400" size={24} />,
      url: 'https://www.farcaster.xyz/',
      description: 'Farcaster is a decentralized social network built on the Bitcoin blockchain.',
    },
    {
      name: 'Paragraph.xyz',
      icon: <MessageSquare className="text-emerald-400" size={24} />,
      url: 'https://paragraph.xyz/',
      description: 'Paragraph is a decentralized blogging platform.',
    },
    {
      name: 'Mirror.xyz',
      icon: <Users className="text-blue-400" size={24} />,
      url: 'https://mirror.xyz/',
      description: 'Mirror is a decentralized publishing platform for writers.',
    },
    {
      name: 'Warpcast',
      icon: <Link className="text-pink-400" size={24} />,
      url: 'https://warpcast.com/',
      description: 'Warpcast is a decentralized social network built on the Farcaster protocol.',
    },
    {
      name: 'Buttrfly',
      icon: <Camera className="text-teal-400" size={24} />,
      url: 'https://buttrfly.app/',
      description: 'Buttrfly is a decentralized platform for creators to share and monetize their content.',
    },
    {
      name: 'Bloomers',
      icon: <Film className="text-orange-400" size={24} />,
      url: 'https://bloomers.tv/',
      description: 'Bloomers is a decentralized video platform for creators.',
    },
    {
      name: 'Yup',
      icon: <Check className="text-cyan-400" size={24} />,
      url: 'https://yup.io/',
      description: 'Yup is a decentralized social network for communities.',
    },
    {
      name: 'Phaver',
      icon: <Mail className="text-lime-400" size={24} />,
      url: 'https://phaver.com/',
      description: 'Phaver is a decentralized social network for communities.',
    },
    {
      name: 'Hey',
      icon: <Terminal className="text-violet-400" size={24} />,
      url: 'https://hey.xyz/',
      description: 'Hey is a decentralized social network on Lens.',
    },
    {
      name: 'Tape',
      icon: <MessageSquare className="text-indigo-400" size={24} />,
      url: 'https://tape.xyz/',
      description: 'Tape is a decentralized platform for sharing stories and content.',
    },
    {
      name: 'Lenspeer',
      icon: <Users className="text-fuchsia-400" size={24} />,
      url: 'https://lenspeer.com/',
      description: 'Lenspeer is a decentralized social network for communities.',
    },
  ]

  const filteredSocialPlatforms = socialPlatforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
      setFocusedIndex(null)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    };

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= filteredSocialPlatforms.length - 1 ? 0 : prevIndex + 1
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (focusedIndex === 0) {
          setFocusedIndex(null);
          searchInputRef.current?.focus();
        } else if (focusedIndex === null) {
          // Do nothing
        } else {
          setFocusedIndex((prevIndex) =>
            prevIndex === null || prevIndex <= 0 ? filteredSocialPlatforms.length - 1 : prevIndex - 1
          )
        }
      } else if (event.key === 'Enter' && focusedIndex !== null) {
        event.preventDefault()
        const link = listItemsRef.current[focusedIndex]
        if (link) {
          link.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredSocialPlatforms, focusedIndex, onClose])

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
          <h2 className="text-2xl font-bold">Web3 Social Platforms</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search social platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="space-y-4">
          {filteredSocialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors ${
                focusedIndex === index ? 'bg-gray-800/30' : ''
              }`}
              ref={(el) => (listItemsRef.current[index] = el)}
              tabIndex={0}
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                {platform.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{platform.name}</h3>
                <p className="text-sm opacity-75">{platform.description}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredSocialPlatforms.length === 0 && (
          <div className="mt-6 text-sm opacity-75">
            <p>No results found for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Explore a variety of Web3 social platforms for decentralized communication and content sharing.</p>
        </div>
      </div>
    </div>
  )
}

export default Social