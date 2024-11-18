// src/hooks/useKeyboardEvents.ts
import { useEffect } from 'react';

interface KeyboardEventHandlers {
  onCtrlK: () => void;
  onCtrlB: () => void;
  onEscape: () => void;
  onAltT: () => void;
  onAltM: () => void; // New handler for Alt + M
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
      } else if (event.altKey && event.key === 't') {
        event.preventDefault();
        handlers.onAltT();
      } else if (event.altKey && event.key === 'm') {
        event.preventDefault();
        handlers.onAltM();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
};