import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import MusicNoteIndicator from './MusicNoteIndicator';
import { Theme } from '../types';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  theme: Theme;
}

const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose, onOpen, theme }) => {
  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [musicEmbedLinks, setMusicEmbedLinks] = useState([
    {
      id: '04697c8a-c967-44dd-a8ff-8531c7ef5194',
      src: 'https://embed.sound.xyz/v1/release/04697c8a-c967-44dd-a8ff-8531c7ef5194?referral_source=embed-sound'
    },
    {
      id: 'f93872e9-b6f1-49fa-becd-ab5433c39d7d',
      src: 'https://embed.sound.xyz/v1/release/f93872e9-b6f1-49fa-becd-ab5433c39d7d?referral_source=embed-sound'
    },
    {
      id: '96cc4612-b6ca-4dc4-b728-a5a427bd608b',
      src: 'https://embed.sound.xyz/v1/release/96cc4612-b6ca-4dc4-b728-a5a427bd608b?referral_source=embed-sound'
    }
  ]);

  const [newLink, setNewLink] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [newItemId, setNewItemId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
    }
  }, [isOpen]);

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

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear the success message after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  useEffect(() => {
    if (newItemId) {
      const timeout = setTimeout(() => {
        setNewItemId(null);
      }, 3000); // Remove highlight after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [newItemId]);

  const extractSrcFromIframe = (iframeCode: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(iframeCode, 'text/html');
    const iframe = doc.querySelector('iframe');
    return iframe ? iframe.getAttribute('src') : null;
  };

  const handleAddLink = (event: React.FormEvent) => {
    event.preventDefault();
    if (newLink.trim()) {
      const src = extractSrcFromIframe(newLink.trim());
      if (src) {
        try {
          new URL(src);
          const newEmbed = {
            id: Date.now().toString(), // Use a unique ID
            src: src
          };
          setMusicEmbedLinks([...musicEmbedLinks, newEmbed]);
          setNewLink('');
          setError('');
          setSuccessMessage('Embed link added successfully!');
          setNewItemId(newEmbed.id);
        } catch (e) {
          setError('Invalid URL. Please enter a valid embed link.');
        }
      } else {
        setError('Invalid iframe code. Please enter a valid iframe embed code.');
      }
    } else {
      setError('Please enter a valid embed link.');
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          ref={modalRef}
          className={`w-[800px] max-h-[160vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-2 overflow-y-auto transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* <div className="mb-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search music..."
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
            />
          </div> */}

          <div className="h-[275px] overflow-y-auto">
            {musicEmbedLinks.map((music) => (
              <div
                key={music.id}
                className={`p-4 rounded-lg hover:bg-gray-800/30 transition-colors ${
                  music.id === newItemId ? 'bg-green-900/30' : ''
                }`}
              >
                <iframe
                  src={music.src}
                  style={{ borderRadius: '8px' }}
                  width="100%"
                  height="260px"
                  allow="clipboard-write"
                  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            ))}
          </div>

          {musicEmbedLinks.length === 0 && (
            <div className="mt-6 text-sm opacity-75">
              <p>No music embed links available.</p>
            </div>
          )}

          <div className="mt-6">
            <form onSubmit={handleAddLink}>
              <div className="flex items-center">
                <textarea
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="Paste embed code here"
                  className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
                  rows={3}
                />
                <button type="submit" className="ml-2 p-1 bg-teal-700/50 border border-purple-700 text-white rounded-lg">
                  {loading ? 'Loading...' : 'Add Link'}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-red-500 text-sm">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="mt-2 text-green-500 text-sm">
                  {successMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <MusicNoteIndicator isPlaying={isPlaying} onOpen={onOpen} />
    </>
  );
};

export default MusicModal;