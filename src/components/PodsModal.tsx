import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types';
import RSSFeed from './RSSFeed'; // Import the RSSFeed component

interface PodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const PodsModal: React.FC<PodsModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Add event listener for clicks outside the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">GreenPill Network RSS Feed</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <RSSFeed
          url="https://rss-proxy.netlify.app/api/pods-rss/greenpill"
          id="greenpill-feed"
          header={<p className="text-sm opacity-75">Latest news from GreenPill Network:</p>}
        />
      </div>
    </div>
  );
};

export default PodsModal;