// GameB.tsx
import React, { useRef, useEffect } from 'react'
import { Theme } from '../types'

interface GameBProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

const GameB: React.FC<GameBProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  }

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
    };
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[900px] h-full rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6`}
      >
        <div className="w-full h-full">
          <iframe
            src="https://innkeeping.github.io/gameB/"
            className="w-full h-full border-0"
            title="GameB Content"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default GameB