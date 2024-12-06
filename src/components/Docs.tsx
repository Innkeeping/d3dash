import React, { useState, useRef, useEffect } from 'react'
import { X, Book } from 'lucide-react'
import { DocsProps } from '../types'
import docsData from '../data/docs.json'

const Docs: React.FC<DocsProps> = ({ isOpen, onClose, theme }) => {
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

  const docs = docsData.map(doc => ({
    ...doc,
    icon: <Book className="text-purple-400" size={24} />
  }))

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
          setFocusedIndex(null)
        }
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
        onClose()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= filteredDocs.length - 1 ? 0 : prevIndex + 1
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (focusedIndex === 0) {
          setFocusedIndex(null)
          searchInputRef.current?.focus();
        } else if (focusedIndex === null) {

        } else {
          setFocusedIndex((prevIndex) =>
            prevIndex === null || prevIndex <= 0 ? filteredDocs.length - 1 : prevIndex - 1
          )
        }
      } else if (event.key === 'Enter' && focusedIndex !== null) {
        event.preventDefault()
        const link = listItemsRef.current[focusedIndex]
        if (link) {
          link.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredDocs, focusedIndex, onClose])

  useEffect(() => {
    if (focusedIndex !== null && listItemsRef.current[focusedIndex]) {
      listItemsRef.current[focusedIndex].focus()
    }
  }, [focusedIndex])


  useEffect(() => {
    if (isOpen) {
      console.log('Docs opened')
    } else {
      console.log('Docs closed')
    }
  }, [isOpen])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto ${theme}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Web3 Development Documentation</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-theme bg-theme focus:outline-none focus:border-theme"
          />
        </div>

        <div className="space-y-4">
          {filteredDocs.map((doc, index) => (
            <a
              key={doc.name}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors ${
                focusedIndex === index ? 'bg-gray-800/30' : ''
              }`}
              ref={(el) => (listItemsRef.current[index] = el)}
              tabIndex={0}
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                {doc.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{doc.name}</h3>
                <p className="text-sm opacity-75">{doc.description}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="mt-6 text-sm opacity-75">
            <p>No results found for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Explore a variety of resources for web3 development, from smart contract development to blockchain infrastructure and tools.</p>
        </div>
      </div>
    </div>
  )
}

export default Docs