import React from 'react'
import { Search } from 'lucide-react'
import { Theme } from '../types'

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void
  theme: Theme
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, theme }) => {
  const themeClasses = {
    purple: 'border-purple-500/30 focus:ring-purple-500/50 text-purple-100 placeholder-purple-300/50',
    green: 'border-green-500/30 focus:ring-green-500/50 text-green-100 placeholder-green-300/50',
    teal: 'border-teal-500/30 focus:ring-teal-500/50 text-teal-100 placeholder-teal-300/50'
  }

  return (
    <div className="relative z-10 mb-8">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'purple' ? 'text-purple-300' : 'text-green-300'}`} />
          <input
            type="text"
            placeholder="Search shortcuts..."
            className={`w-full pl-10 pr-4 py-2 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 backdrop-blur-sm ${themeClasses[theme]}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar