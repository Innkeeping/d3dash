// src/components/IPFS.tsx
import React, { useState, useRef, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Theme } from '../types'

interface IPFSProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

const IPFS: React.FC<IPFSProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20 text-purple-300',
    green: 'border-green-500/30 bg-green-900/20 text-green-300',
    teal: 'border-teal-500/30 bg-teal-900/20 text-teal-300'
  }

  const dropdownClasses = {
    purple: 'border-purple-500/30 focus:border-purple-500',
    green: 'border-green-500/30 focus:border-green-500',
    teal: 'border-teal-500/30 focus:border-teal-500'
  }

  const buttonClasses = {
    purple: 'bg-purple-500 hover:bg-purple-600 border-purple-600',
    green: 'bg-green-500 hover:bg-green-600 border-green-600',
    teal: 'bg-teal-500 hover:bg-teal-600 border-teal-600'
  }

  const [cid, setCid] = useState('')
  const [selectedGateway, setSelectedGateway] = useState('https://w3s.link/ipfs/')
  const [isLoading, setIsLoading] = useState(false)

  const gateways = [
    { label: 'w3s.link', value: 'https://w3s.link/ipfs/' },
    { label: 'ipfs.io', value: 'https://ipfs.io/ipfs/' },
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

  const handleGatewayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGateway(e.target.value)
  }

  const handleCidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCid(e.target.value)
  }

  const handleCheck = () => {
    if (cid) {
      setIsLoading(true)
      const url = `${selectedGateway}${cid}`
      window.open(url, '_blank')
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[800px] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Check IPFS CID</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className={`block ${themeClasses[theme]} text-sm font-bold mb-2`} htmlFor="gateway">
              Select Gateway
            </label>
            <select
              id="gateway"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${dropdownClasses[theme]}`}
              value={selectedGateway}
              onChange={handleGatewayChange}
            >
              {gateways.map((gateway) => (
                <option key={gateway.value} value={gateway.value}>
                  {gateway.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className={`block ${themeClasses[theme]} text-sm font-bold mb-2`} htmlFor="cid">
              CID
            </label>
            <input
              id="cid"
              type="text"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${themeClasses[theme]}`}
              value={cid}
              onChange={handleCidChange}
            />
          </div>

          <button
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${buttonClasses[theme]}`}
            onClick={handleCheck}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Check'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default IPFS