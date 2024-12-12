import { useEffect } from'react';

const useClickOutside = (ref: React.RefObject<HTMLElement>, onClose: () => void) => {
  useEffect(() => {
    const handleMouseDownOutside = (event: MouseEvent) => {
      if (ref.current &&!ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDownOutside);

    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside);
    };
  }, [ref, onClose]);
};

export default useClickOutside;