// MusicNoteIndicator.tsx
import React from 'react';
import { Music } from 'lucide-react';

interface MusicNoteIndicatorProps {
  isPlaying: boolean;
  onOpen: () => void;
}

const MusicNoteIndicator: React.FC<MusicNoteIndicatorProps> = ({ isPlaying, onOpen }) => {
  if (!isPlaying) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/20 rounded-full p-3 shadow-lg cursor-pointer"
      onClick={onOpen}
    >
      <Music size={16} color="white" />
    </div>
  );
};

export default MusicNoteIndicator;