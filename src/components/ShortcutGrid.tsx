// src/ShortcutGrid.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Shortcut, Theme } from '../types';

interface ShortcutGridProps {
  shortcuts: Shortcut[];
  theme: Theme;
}

const ShortcutGrid: React.FC<ShortcutGridProps> = ({ shortcuts, theme }) => {
  const themeClasses = {
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      text: 'text-purple-300 group-hover:text-purple-200',
      outline: 'outline-purple-500'
    },
    green: {
      border: 'border-green-500/20 hover:border-green-500/40',
      text: 'text-green-300 group-hover:text-green-200',
      outline: 'outline-green-500'
    },
    teal: {
      border: 'border-teal-500/20 hover:border-teal-500/40',
      text: 'text-teal-300 group-hover:text-teal-200',
      outline: 'outline-teal-500'
    }
  };

  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const gridItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (gridItemsRef.current[focusedIndex]) {
      gridItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    console.log('Key pressed:', event.key); // Debugging: Log the key pressed

    const numRows = Math.ceil(shortcuts.length / 6); // Assuming 6 columns in the largest grid
    const numCols = 6;

    let newIndex = index;

    switch (event.key) {
      case 'ArrowUp':
        newIndex = index - numCols;
        break;
      case 'ArrowDown':
        newIndex = index + numCols;
        break;
      case 'ArrowLeft':
        newIndex = index - 1;
        break;
      case 'ArrowRight':
        newIndex = index + 1;
        break;
      default:
        return;
    }

    // Ensure the new index is within bounds
    if (newIndex >= 0 && newIndex < shortcuts.length) {
      setFocusedIndex(newIndex);
    }
  };

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10"
      role="grid"
    >
      {shortcuts.map((shortcut, index) => (
        <a
          key={shortcut.id}
          href={shortcut.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col items-center p-4 rounded-lg bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm group ${themeClasses[theme].border} ${themeClasses[theme].text} ${
            focusedIndex === index ? `outline outline-2 ${themeClasses[theme].outline}` : ''
          }`}
          tabIndex={focusedIndex === index ? 0 : -1}
          role="gridcell"
          ref={(el) => (gridItemsRef.current[index] = el)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onClick={() => setFocusedIndex(index)}
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
  );
};

export default ShortcutGrid;