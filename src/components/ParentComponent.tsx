import React, { useState } from 'react';
import GameB from './GameB';

const ParentComponent: React.FC = () => {
  const [isGameBOpen, setIsGameBOpen] = useState(false);

  const openGameB = () => setIsGameBOpen(true);
  const closeGameB = () => setIsGameBOpen(false);

  return (
    <div>
      <button onClick={openGameB}>Open GameB</button>
      <GameB isOpen={isGameBOpen} onClose={closeGameB} theme="purple" />
    </div>
  );
};

export default ParentComponent; 