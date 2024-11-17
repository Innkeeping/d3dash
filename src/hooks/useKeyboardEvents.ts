// src/hooks/useKeyboardEvents.ts
import { useEffect } from 'react';

interface KeyboardEventHandlers {
  onCtrlK: () => void;
  onCtrlB: () => void;
  onEscape: () => void;
}

export const useKeyboardEvents = (handlers: KeyboardEventHandlers) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        handlers.onCtrlK();
      } else if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        handlers.onCtrlB();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        handlers.onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
};