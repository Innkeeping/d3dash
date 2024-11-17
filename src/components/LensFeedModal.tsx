// src/components/LensFeedModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Theme, LensPublication, LensImageMetadataV3, LensPostMetadata } from '../types';
import { fetchUserFeed } from '../utils/fetchUserFeed';

interface LensFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const LensFeedModal: React.FC<LensFeedModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20'
  };

  const [feedItems, setFeedItems] = useState<LensPublication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const items = await fetchUserFeed();
        setFeedItems(items);
      } catch (err) {
        setError("Failed to fetch feed.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

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

  const isImageMetadata = (metadata: LensPostMetadata): metadata is LensImageMetadataV3 => {
    return metadata.__typename === 'ImageMetadataV3';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lens User Feed</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {loading && <div className="text-sm opacity-75">Loading feed...</div>}

        {error && <div className="text-sm text-red-500">{error}</div>}

        {feedItems.length > 0 && (
          <div className="space-y-4">
            {feedItems.map((item) => (
              <div
                key={item.metadata.id}
                className="flex flex-col p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
              >
                {isImageMetadata(item.metadata) && (
                  <div className="mb-4">
                    <img
                      src={item.metadata.asset.image.optimized.uri}
                      alt={`Post ${item.metadata.id}`}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold">{item.metadata.content}</p>
                  <p className="text-sm opacity-75 mt-2">Reactions: {item.stats.reactions}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {feedItems.length === 0 && !loading && !error && (
          <div className="text-sm opacity-75">
            <p>No posts found.</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Explore recent publications from the Lens network.</p>
        </div>
      </div>
    </div>
  );
};

export default LensFeedModal;