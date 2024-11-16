import React, { useState } from 'react'
import SearchBar from './SearchBar'
import ShortcutGrid from './ShortcutGrid'
import Toolbar from './Toolbar'
import { shortcuts } from '../data/shortcuts'
import { Theme } from '../types'

const Desktop: React.FC = () => {
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState<Theme>('purple')

  const filteredShortcuts = shortcuts.filter(shortcut =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
    shortcut.category.toLowerCase().includes(search.toLowerCase())
  )

  const themeClasses = {
    purple: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
    green: 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900',
    teal: 'bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900'
  }

  return (
    <div className={`relative min-h-screen ${themeClasses[theme]} p-6 overflow-hidden`}>

      <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20`}></div>

      <SearchBar search={search} setSearch={setSearch} theme={theme} />
      <ShortcutGrid shortcuts={filteredShortcuts} theme={theme} />
      <Toolbar theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default Desktop