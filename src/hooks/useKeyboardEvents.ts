import { useEffect } from 'react'
import { KeyboardEventHandlers, ModalsState } from '../types'

const useKeyboardEvents = (
  getHandlers: () => KeyboardEventHandlers,
  modals: ModalsState,
  searchInputRef: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    const handlers = getHandlers()

    const handleKeyDown = (event: KeyboardEvent) => {
      let shouldPreventDefault = false

      if (event.ctrlKey && event.key === 'k') {
        handlers.onCtrlK?.()
        shouldPreventDefault = true;
      } else if (event.ctrlKey && event.key === 'b') {
        if (searchInputRef.current && searchInputRef.current === document.activeElement) {
          handlers.onCtrlB?.()
        }
        shouldPreventDefault = true;
      } else if (event.key === 'Escape') {
        handlers.onEscape?.()
        shouldPreventDefault = true;
      } else if (event.key === 'ArrowUp') {
        handlers.onArrowUp?.()
        shouldPreventDefault = true;
      } else if (event.key === 'ArrowDown') {
        handlers.onArrowDown?.()
        shouldPreventDefault = true;
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
    };
  }, [getHandlers, modals, searchInputRef])
}

export default useKeyboardEvents