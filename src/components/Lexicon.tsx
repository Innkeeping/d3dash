// src/components/Lexicon.tsx
import React, { useState, useRef, useEffect } from 'react'
import { X, Book } from 'lucide-react'
import { Theme } from '../types'
import web3_lexicon from '../data/lexicon.json'
import useClickOutside from '../hooks/useClickOutside'

interface LexiconProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

const Lexicon: React.FC<LexiconProps> = ({ isOpen, onClose, theme }) => {
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
  const listItemsRef = useRef<(HTMLDivElement | null)[]>([])

  const filteredTerms = web3_lexicon.filter((term) =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
      setFocusedIndex(null)
    }
  }, [isOpen])

  useClickOutside(modalRef, onClose)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= filteredTerms.length - 1 ? 0 : prevIndex + 1
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (focusedIndex === 0) {
          setFocusedIndex(null)
          searchInputRef.current?.focus()
        } else if (focusedIndex === null) {

        } else {
          setFocusedIndex((prevIndex) =>
            prevIndex === null || prevIndex <= 0 ? filteredTerms.length - 1 : prevIndex - 1
          )
        }
      } else if (event.key === 'Enter' && focusedIndex !== null) {
        event.preventDefault()
        const link = listItemsRef.current[focusedIndex]
        if (link) {
          link.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredTerms, focusedIndex, onClose])

  useEffect(() => {
    if (focusedIndex !== null && listItemsRef.current[focusedIndex]) {
      listItemsRef.current[focusedIndex].focus()
    }
  }, [focusedIndex])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto ${theme}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Web3 Lexicon</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-theme bg-theme focus:outline-none focus:border-theme text-theme"
          />
        </div>

        <div className="space-y-4">
          {filteredTerms.map((term, index) => (
            <div
              key={term.term}
              ref={(el) => (listItemsRef.current[index] = el)}
              tabIndex={0}
              className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors ${
                focusedIndex === index ? 'bg-gray-800/30' : ''
              }`}
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                <Book className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{term.term}</h3>
                <p className="text-sm opacity-75">{term.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="mt-6 text-sm opacity-75">
            <p>No results found for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Explore a variety of Web3, DeFi, blockchain, and decentralized governance terms.</p>
        </div>
      </div>
    </div>
  )
}

export default Lexicon