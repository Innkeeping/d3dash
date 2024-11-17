import React, { useState, useEffect, useRef } from 'react';
import { Theme, Link } from '../types';
import { BarChart, Book, Briefcase, CircleDollarSign, Compass, DollarSign, Flower2, HardDrive, Heart, Leaf, MessageSquare, Network, Orbit, PieChart, Pill, Radio, Shrub, Users, Vote } from 'lucide-react';

interface LinkGridProps {
  links: Link[];
  theme: Theme;
}

const LinkGrid: React.FC<LinkGridProps> = ({ links, theme }) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const gridItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const themeClasses = {
    purple: {
      base: 'border-purple-500/20 hover:border-purple-500/40 text-purple-300 group-hover:text-purple-200',
      focus: 'border-2 border-purple-500'
    },
    green: {
      base: 'border-green-500/20 hover:border-green-500/40 text-green-300 group-hover:text-green-200',
      focus: 'border-2 border-green-500'
    },
    teal: {
      base: 'border-teal-500/20 hover:border-teal-500/40 text-teal-300 group-hover:text-teal-200',
      focus: 'border-2 border-teal-500'
    }
  };

  const defaultIcons: { [key: string]: React.ReactNode } = {
    'Arbitrum One': <PieChart className="text-green-400" size={24} />,
    'Base': <Compass className="text-orange-400" size={24} />,
    'Celo Mainnet': <BarChart className="text-blue-400" size={24} />,
    'Ethereum Mainnet': <Briefcase className="text-pink-400" size={24} />,
    'Gnosis': <CircleDollarSign className="text-teal-400" size={24} />,
    'OP Mainnet': <DollarSign className="text-purple-400" size={24} />,
    'Polygon Mainnet': <HardDrive className="text-cyan-400" size={24} />,
    'Polygon zkEVM': <Network className="text-purple-400" size={24} />,
    'Alchemy': <Book className="text-purple-400" size={24} />,
    'Chainlink': <Book className="text-purple-400" size={24} />,
    'Ethereum': <Book className="text-emerald-400" size={24} />,
    'ENS (Ethereum Name Service)': <Book className="text-emerald-400" size={24} />,
    'Foundry': <Book className="text-emerald-400" size={24} />,
    'Hardhat': <Book className="text-green-400" size={24} />,
    'Infura': <Book className="text-purple-400" size={24} />,
    'IPFS': <Book className="text-purple-400" size={24} />,
    'OpenZeppelin': <Book className="text-purple-400" size={24} />,
    'RainbowKit': <Book className="text-green-400" size={24} />,
    'Reown': <Book className="text-green-400" size={24} />,
    'Remix IDE': <Book className="text-emerald-400" size={24} />,
    'Solidity': <Book className="text-purple-400" size={24} />,
    'Scaffold-ETH 2': <Book className="text-green-400" size={24} />,
    'The Graph': <Book className="text-green-400" size={24} />,
    'ThirdWeb': <Book className="text-emerald-400" size={24} />,
    'Viem': <Book className="text-purple-400" size={24} />,
    'Wagmi': <Book className="text-purple-400" size={24} />,
    'Web3.js': <Book className="text-green-400" size={24} />,
    'Ethers.js': <Book className="text-emerald-400" size={24} />,
    'Snapshot': <Vote className="text-blue-400" size={24} />,
    'Tally': <Radio className="text-purple-400" size={24} />,
    'Commonwealth': <Users className="text-green-400" size={24} />,
    'Discourse': <MessageSquare className="text-orange-400" size={24} />,
    'Gardens': <Flower2 className="text-pink-400" size={24} />,
    'Giveth': <Heart className="text-purple-400" size={24} />,
    'GreenPill Network': <Pill className="text-green-400" size={24} />,
    'Letʼs GROW DAO': <Shrub className="text-emerald-400" size={24} />,
    'ReFi DAO': <Orbit className="text-purple-400" size={24} />,
    'Klima DAO': <Leaf className="text-green-400" size={24} />,
    'Aave': <PieChart className="text-green-400" size={24} />,
    'Balancer': <Compass className="text-orange-400" size={24} />,
    'Compound': <BarChart className="text-blue-400" size={24} />,
    'Curve': <Briefcase className="text-pink-400" size={24} />,
    'Rari Capital': <CircleDollarSign className="text-teal-400" size={24} />,
    'Uniswap': <DollarSign className="text-purple-400" size={24} />,
    'Yearn': <HardDrive className="text-cyan-400" size={24} />,
    '1inch': <Network className="text-purple-400" size={24} />,
    'Jumper.Exchange': <Network className="text-purple-400" size={24} />,
    'QuickSwap': <Network className="text-purple-400" size={24} />
  };

  useEffect(() => {
    if (gridItemsRef.current[focusedIndex]) {
      gridItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const numRows = Math.ceil(links.length / 6); // Assuming 6 columns in the largest grid
    const numCols = 6;

    let newIndex = index;

    switch (event.key) {
      case 'ArrowUp':
        newIndex = index - numCols;
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

    // Ensure the new index is within bounds
    if (newIndex >= 0 && newIndex < links.length) {
      setFocusedIndex(newIndex);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-6 relative z-10">
      {links.map((link, index) => {
        const icon = defaultIcons[link.name] || <Book className="text-gray-400" size={24} />;
        const isFocused = index === focusedIndex;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center p-4 rounded-lg bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm group ${themeClasses[theme].base} ${isFocused ? themeClasses[theme].focus : ''}`}
            onFocus={() => handleFocus(index)}
            ref={(ref) => {
              gridItemsRef.current[index] = ref;
            }}
            data-testid={`link-${index}`}
            style={{ outline: 'none' }}
            tabIndex={isFocused ? 0 : -1}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={() => handleFocus(index)}
          >
            <div className="h-6 w-6 flex items-center justify-center mb-2">
              {icon}
            </div>
            <span className="mt-2 text-sm font-medium">
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default LinkGrid;