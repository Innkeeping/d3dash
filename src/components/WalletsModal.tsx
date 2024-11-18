import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types';
import walletsData from '../data/wallets.json';
interface WalletsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const WalletsModal: React.FC<WalletsModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const filteredWallets = walletsData.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
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
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Wallets</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search wallets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="space-y-4">
          {filteredWallets.map((wallet) => (
            <a
              key={wallet.name}
              href={wallet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                <img src={`https://via.placeholder.com/24`} alt={`${wallet.name} logo`} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{wallet.name}</h3>
                <p className="text-sm opacity-75">{wallet.description}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredWallets.length === 0 && (
          <div className="mt-6 text-sm opacity-75">
            <p>No results found for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Information for various cryptocurrency wallets.</p>
        </div>
      </div>
    </div>
  );
};

export default WalletsModal;