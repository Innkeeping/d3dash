import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types';

interface ModalvateProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const Modalvate: React.FC<ModalvateProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  const [randomStatement, setRandomStatement] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await fetch('https://bafybeigsudocl4hqg5cprsqptrotnqxuz6pwko34nemjzt5coya76s5oou.ipfs.w3s.link/love.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.statements && data.statements.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.statements.length);
          setRandomStatement(data.statements[randomIndex]);
        } else {
          throw new Error('No statements found in the JSON data');
        }
      } catch (error) {
        setFetchError('Failed to fetch statements');
        console.error('Error fetching statements:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (isOpen) {
      fetchStatements();
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
        className={`max-w-md rounded-lg border ${themeClasses[theme]} backdrop-blur-md p-6`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Love from IPFS</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="text-lg opacity-90">
          {isFetching ? (
            <p>Loading...</p>
          ) : fetchError ? (
            <p>{fetchError}</p>
          ) : (
            randomStatement
          )}
        </div>
      </div>
    </div>
  );
};

export default Modalvate;