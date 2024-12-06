import { useEffect } from 'react'
import { KeyboardEventHandlers } from '../types'

const useKeyboardEvents = (
  getHandlers: () => KeyboardEventHandlers,
  searchInputRef: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    const handlers = getHandlers()

    const handleKeyDown = (event: KeyboardEvent) => {
      let shouldPreventDefault = false

      if (event.ctrlKey && event.key === 'k') {
        handlers.onCtrlK?.()
        shouldPreventDefault = true
      } else if (event.ctrlKey && event.key === 'b') {
        handlers.onCtrlB?.()
        shouldPreventDefault = true
      } else if (event.key === 'Escape') {
        handlers.onEscape?.()
        shouldPreventDefault = true
      } else if (event.key === 'ArrowUp') {
        handlers.onArrowUp?.()
        shouldPreventDefault = true
      } else if (event.key === 'ArrowDown') {
        handlers.onArrowDown?.()
        shouldPreventDefault = true
      } else if (event.altKey && event.key === 't') {
        handlers.onAltT?.()
      } else if (event.altKey && event.key === 'm') {
        handlers.onAltM?.()
      } else if (event.altKey && event.key === 'h') {
        handlers.onAltH?.()
      }

      if (shouldPreventDefault) {
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [getHandlers, searchInputRef]) // Remove modals from dependencies
}

export default useKeyboardEvents