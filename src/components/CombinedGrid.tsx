import React,
{ useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Shortcut, CommonLink, Theme } from '../types'
import { fetchShortcutsAndLinks, filterItems } from '../utils/filtering'

interface CombinedGridProps {
  theme: Theme
  search: string
  onNavigateToSearchBar?: () => void
  searchBarRef: React.RefObject<HTMLInputElement>
}

const CombinedGrid = forwardRef<
  { gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> },
  CombinedGridProps
>(({ theme, search, onNavigateToSearchBar, searchBarRef }, ref) => {
  const themeClasses = {
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      text: 'text-purple-300 group-hover:text-purple-200',
      outline: 'outline-purple-500',
      icon: 'text-purple-400'
    },
    green: {
      border: 'border-green-500/20 hover:border-green-500/40',
      text: 'text-green-300 group-hover:text-green-200',
      outline: 'outline-green-500',
      icon: 'text-green-400'
    },
    teal: {
      border: 'border-teal-500/20 hover:border-teal-500/40',
      text: 'text-teal-300 group-hover:text-teal-200',
      outline: 'outline-teal-500',
      icon: 'text-teal-400'
    }
  }

  const [items, setItems] = useState<(Shortcut | CommonLink)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [arrowKeyPressed, setArrowKeyPressed] = useState<boolean>(false)
  const gridItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const gridContainerRef = useRef<HTMLDivElement | null>(null)

  useImperativeHandle(ref, () => ({
    gridItemsRef
  }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShortcutsAndLinks()

        setItems(data);
      } catch (error) {

      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (gridContainerRef.current) {
      gridContainerRef.current.focus();
    }
  }, [])

  useEffect(() => {
    if (focusedIndex !== null && gridItemsRef.current[focusedIndex]) {
      gridItemsRef.current[focusedIndex].focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (focusedIndex === null) return

    const numRows = Math.ceil(getDisplayedItems().length / 6)
    const numCols = 6

    let newIndex = focusedIndex

    switch (event.key) {
      case 'ArrowUp':
        newIndex = focusedIndex - numCols
        if (newIndex < 0) {
          onNavigateToSearchBar?.()
          if (searchBarRef.current) {
            searchBarRef.current.focus()
            const end = searchBarRef.current.value.length
            searchBarRef.current.setSelectionRange(end, end)
            searchBarRef.current.focus()
          }
          return
        }
        break
      case 'ArrowDown':
        newIndex = focusedIndex + numCols
        break
      case 'ArrowLeft':
        newIndex = focusedIndex - 1
        break
      case 'ArrowRight':
        newIndex = focusedIndex + 1
        break
      default:
        return
    }

    if (newIndex >= 0 && newIndex < getDisplayedItems().length) {
      setFocusedIndex(newIndex)
      setArrowKeyPressed(true)
    }
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  const handleBlur = () => {
    setFocusedIndex(null)
    setArrowKeyPressed(false)
  }

  const getDisplayedItems = (): (Shortcut | CommonLink)[] => {
    if (search.trim() === '') {
      return items.filter(item => item.type === 'shortcut')
    }
    return filterItems(search, items)
  }

  return (
    <div
      ref={gridContainerRef}
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10"
      role="grid"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        if (focusedIndex === null) {
          setFocusedIndex(0);
        }
      }}
      onBlur={handleBlur}
    >
      {getDisplayedItems().map((item, index) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col items-center p-4 rounded-lg bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm group ${themeClasses[theme].border} ${themeClasses[theme].text} ${
            focusedIndex === index && arrowKeyPressed ? `outline outline-2 ${themeClasses[theme].outline}` : ''
          }`}
          tabIndex={focusedIndex === index ? 0 : -1}
          role="gridcell"
          ref={(el) => (gridItemsRef.current[index] = el)}
          onClick={() => {
            setFocusedIndex(index)
            setArrowKeyPressed(true)
          }}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
        >
          <div className="transition-colors duration-300">

            <item.icon className={themeClasses[theme].icon} size={24} />
          </div>
          <span className="mt-2 text-sm font-medium">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  )
})

export default CombinedGrid