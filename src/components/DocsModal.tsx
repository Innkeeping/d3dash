import React, { useState, useRef, useEffect } from 'react';
import { X, Book } from 'lucide-react';
import { Theme } from '../types';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  };

  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const docs = [
    {
      name: 'Alchemy',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.alchemy.com/',
      description: 'A web3 developer platform providing powerful tools for building blockchain applications.',
    },
    {
      name: 'Chainlink',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.chain.link/',
      description: 'A decentralized oracle network that provides real-world data to smart contracts.',
    },
    {
      name: 'Ethereum',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://ethereum.org/en/developers/docs/',
      description: 'Ethereum resources for developers, covering smart contracts, wallets, and more.',
    },
    {
      name: 'ENS (Ethereum Name Service)',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://docs.ens.domains/',
      description: 'A decentralized domain name system for Ethereum.',
    },
    {
      name: 'Foundry',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://book.getfoundry.sh/',
      description: 'A fast, portable, and modular toolkit for Ethereum development.',
    },
    {
      name: 'Hardhat',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://hardhat.org/hardhat-runner/docs/getting-started',
      description: 'A development environment for Ethereum with local blockchain development, testing, and deployment.',
    },
    {
      name: 'Infura',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.infura.io/',
      description: 'Blockchain infrastructure for dapps, providing access to Ethereum and other blockchains.',
    },
    {
      name: 'IPFS',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.ipfs.tech/',
      description: 'A decentralized file system for building distributed applications.',
    },
    {
      name: 'OpenZeppelin',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.openzeppelin.com/contracts/',
      description: 'A library of secure and community-audited smart contracts for Ethereum.',
    },
    {
      name: 'RainbowKit',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://www.rainbowkit.com/docs/',
      description: 'Beautiful, modular, and extensible wallet connection UIs for Ethereum dapps.',
    },
    {
      name: 'Reown',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://docs.reown.io/',
      description: 'A platform for building and managing decentralized applications.',
    },
    {
      name: 'Remix IDE',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://remix-ide.readthedocs.io/en/latest/',
      description: 'An in-browser Solidity IDE for writing, testing, and deploying smart contracts.',
    },
    {
      name: 'Solidity',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.soliditylang.org/en/latest/',
      description: 'The programming language for writing smart contracts on Ethereum.',
    },
    {
      name: 'Scaffold-ETH 2',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://github.com/scaffold-eth/scaffold-eth-2',
      description: 'A full-stack Ethereum development scaffold to build and deploy dapps quickly.',
    },
    {
      name: 'The Graph',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://thegraph.com/docs/en/',
      description: 'A decentralized indexing protocol for building subgraphs to query blockchain data.',
    },
    {
      name: 'ThirdWeb',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://portal.thirdweb.com/',
      description: 'A platform for building web3 apps with the most intuitive SDK and tools.',
    },
    {
      name: 'Viem',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://viem.sh/',
      description: 'A lightweight, powerful, and type-safe Ethereum JavaScript library for building dapps.',
    },
    {
      name: 'Wagmi',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://wagmi.sh/',
      description: 'React Hooks for Ethereum that simplifies building dapps.',
    },
    {
      name: 'Web3.js',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://web3js.readthedocs.io/en/v1.7.0/',
      description: 'A JavaScript library for interacting with the Ethereum blockchain and smart contracts.',
    },
    {
      name: 'Ethers.js',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://docs.ethers.io/v5/',
      description: 'A JavaScript library for interacting with the Ethereum blockchain and smart contracts, providing a simple and powerful API.',
    },
  ];

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h2 className="text-2xl font-bold">Web3 Development Documentation</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="space-y-4">
          {filteredDocs.map((doc) => (
            <a
              key={doc.name}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-gray-800/50">
                {doc.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{doc.name}</h3>
                <p className="text-sm opacity-75">{doc.description}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="mt-6 text-sm opacity-75">
            <p>No results found for "{searchQuery}".</p>
          </div>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Explore a variety of resources for web3 development, from smart contract development to blockchain infrastructure and tools.</p>
        </div>
      </div>
    </div>
  );
};

export default DocsModal;