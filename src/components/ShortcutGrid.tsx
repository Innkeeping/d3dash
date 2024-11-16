import React from 'react'
import { Shortcut, Theme } from '../types'

interface ShortcutGridProps {
  shortcuts: Shortcut[]
  theme: Theme
}

const ShortcutGrid: React.FC<ShortcutGridProps> = ({ shortcuts, theme }) => {
  const themeClasses = {
    purple: 'border-purple-500/20 hover:border-purple-500/40 text-purple-300 group-hover:text-purple-200',
    green: 'border-green-500/20 hover:border-green-500/40 text-green-300 group-hover:text-green-200',
    teal: 'border-teal-500/20 hover:border-teal-500/40 text-teal-300 group-hover:text-teal-200'
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
      {shortcuts.map((shortcut) => (
        <a
          key={shortcut.id}
          href={shortcut.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col items-center p-4 rounded-lg bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm group ${themeClasses[theme]}`}
        >
          <div className="transition-colors duration-300">
            {shortcut.icon}
          </div>
          <span className="mt-2 text-sm font-medium">
            {shortcut.name}
          </span>
        </a>
      ))}
    </div>
  )
}

export default ShortcutGrid