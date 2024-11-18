// src/components/LinkGrid.tsx
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { DescribedShortcut, Theme } from '../types';

interface LinkGridProps {
  links: DescribedShortcut[];
  theme: Theme;
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  onNavigateToGrid?: () => void;
}

const LinkGrid = forwardRef<
  { gridItemsRef: React.RefObject<(HTMLAnchorElement | null)[]> },
  LinkGridProps
>(({ links, theme, focusedIndex, setFocusedIndex, onNavigateToGrid }, ref) => {
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

  const gridItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    gridItemsRef
  }));

  useEffect(() => {
    if (focusedIndex !== null && gridItemsRef.current[focusedIndex]) {
      gridItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    console.log('Key pressed:', event.key);

    const numRows = Math.ceil(links.length / 6);
    const numCols = 6;

    let newIndex = index;

    switch (event.key) {
      case 'ArrowUp':
        newIndex = index - numCols;
        if (newIndex < 0) {
          onNavigateToGrid?.();
          return;
        }
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

    if (newIndex >= 0 && newIndex < links.length) {
      setFocusedIndex(newIndex);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-6 relative z-10"
      role="grid"
    >
      {links.map((link, index) => (
        <a
          key={link.id}
          href={link.url}
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
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
        >
          <div className="transition-colors duration-300">
            {link.icon}
          </div>
          <span className="mt-2 text-sm font-medium">
            {link.name}
          </span>
        </a>
      ))}
    </div>
  );
});

export default LinkGrid;