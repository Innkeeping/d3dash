// src/components/SearchBar.tsx
import React, { InputHTMLAttributes, forwardRef, Ref, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Theme } from '../types';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  search: string;
  setSearch: (value: string) => void;
  theme: Theme;
  inputRef?: Ref<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = forwardRef<HTMLInputElement, SearchBarProps>(({ search, setSearch, theme, inputRef, ...rest }, ref) => {
  const themeClasses = {
    purple: 'border-purple-500/30 focus:ring-purple-500/50 text-purple-100 placeholder-purple-300/50',
    green: 'border-green-500/30 focus:ring-green-500/50 text-green-100 placeholder-green-300/50',
    teal: 'border-teal-500/30 focus:ring-teal-500/50 text-teal-100 placeholder-teal-300/50'
  };

  const internalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleFocus = () => {
      console.log('Search bar focused');
    };

    const handleBlur = () => {
      console.log('Search bar blurred');
    };

    // const handleKeyDown = (e: KeyboardEvent) => {
    //   if (e.key === 'Backspace') {
    //     console.log('Backspace key pressed in search bar');
    //     // Prevent any default behavior that might cause focus to shift
    //     e.preventDefault();
    //   }
    // };

    const currentRef = internalRef.current;

    if (currentRef) {
      currentRef.addEventListener('focus', handleFocus);
      currentRef.addEventListener('blur', handleBlur);
      // currentRef.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('focus', handleFocus);
        currentRef.removeEventListener('blur', handleBlur);
        // currentRef.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <div className="relative z-10 mb-8">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'purple' ? 'text-purple-300' : 'text-green-300'}`} />
          <input
            ref={(node) => {
              internalRef.current = node;
              if (typeof inputRef === 'function') {
                inputRef(node);
              } else if (inputRef && 'current' in inputRef) {
                (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref && 'current' in ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }
            }}
            type="text"
            placeholder="Search shortcuts..."
            className={`w-full pl-10 pr-4 py-2 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-2 backdrop-blur-sm ${themeClasses[theme]}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
});

export default SearchBar;