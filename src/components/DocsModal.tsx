import React from 'react';
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

  const docs = [
    {
      name: 'Viem',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://viem.sh/',
      description: 'A lightweight, powerful, and type-safe Ethereum JavaScript library.',
    },
    {
      name: 'Scaffold-ETH 2',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://github.com/scaffold-eth/scaffold-eth-2',
      description: 'A full-stack Ethereum development scaffold.',
    },
    {
      name: 'Foundry',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://book.getfoundry.sh/',
      description: 'A blazing fast, portable, and modular toolkit for Ethereum development.',
    },
    {
      name: 'Wagmi',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://wagmi.sh/',
      description: 'React Hooks for Ethereum.',
    },
    {
      name: 'RainbowKit',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://www.rainbowkit.com/docs/',
      description: 'Beautiful, modular, and extensible wallet connection UIs for Ethereum.',
    },
    {
      name: 'ThirdWeb',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://portal.thirdweb.com/',
      description: 'Build web3 apps with the most intuitive SDK.',
    },
    {
      name: 'Aave',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.aave.com/',
      description: 'Documentation for the Aave Protocol.',
    },
    {
      name: 'Uniswap',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://docs.uniswap.org/',
      description: 'Documentation for the Uniswap Protocol.',
    },
    {
      name: 'ENS (Ethereum Name Service)',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://docs.ens.domains/',
      description: 'Documentation for ENS.',
    },
    {
      name: 'Chainlink',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.chain.link/',
      description: 'Documentation for Chainlink.',
    },
    {
      name: 'The Graph',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://thegraph.com/docs/en/',
      description: 'Documentation for The Graph.',
    },
    {
      name: 'Alchemy',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://docs.alchemy.com/',
      description: 'Documentation for Alchemy.',
    },
    {
      name: 'Infura',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.infura.io/',
      description: 'Documentation for Infura.',
    },
    {
      name: 'MetaMask',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://docs.metamask.io/',
      description: 'Documentation for MetaMask.',
    },
    {
      name: 'Ethereum',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://ethereum.org/en/developers/docs/',
      description: 'Ethereum documentation for developers.',
    },
    {
      name: 'Solidity',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.soliditylang.org/en/latest/',
      description: 'Solidity documentation.',
    },
    {
      name: 'Hardhat',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://hardhat.org/hardhat-runner/docs/getting-started',
      description: 'Hardhat documentation.',
    },
    {
      name: 'Remix IDE',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://remix-ide.readthedocs.io/en/latest/',
      description: 'Remix documentation.',
    },
    {
      name: 'OpenZeppelin',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.openzeppelin.com/contracts/',
      description: 'OpenZeppelin Contracts documentation.',
    },
    {
      name: 'Web3.js',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://web3js.readthedocs.io/en/v1.7.0/',
      description: 'Web3.js documentation.',
    },
    {
      name: 'Ethers.js',
      icon: <Book className="text-emerald-400" size={24} />,
      url: 'https://docs.ethers.io/v5/',
      description: 'Ethers.js documentation.',
    },
    {
      name: 'IPFS',
      icon: <Book className="text-purple-400" size={24} />,
      url: 'https://docs.ipfs.tech/',
      description: 'IPFS documentation.',
    },
    {
      name: 'Reown',
      icon: <Book className="text-green-400" size={24} />,
      url: 'https://docs.reown.io/',
      description: 'Reown documentation.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Web3 Development Documentation</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {docs.map((doc) => (
            <a
              key={doc.name}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors block"
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

        <div className="mt-6 text-sm opacity-75">
          <p>Explore a variety of resources and documentation for web3 development, from smart contract development to blockchain infrastructure and tools.</p>
        </div>
      </div>
    </div>
  );
};

export default DocsModal;