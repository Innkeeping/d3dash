// src/components/CryptoPricesModal.tsx
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Theme } from '../types';

interface CryptoPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

const CryptoPricesModal: React.FC<CryptoPricesModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  };

  const tokenNameClasses = {
    purple: 'text-purple-400',
    green: 'text-green-400',
    teal: 'text-teal-400',
  };

  const tokenSymbolClasses = {
    purple: 'text-purple-500',
    green: 'text-green-500',
    teal: 'text-teal-500',
  };

  const priceClasses = 'font-bold';

  const [cryptoPrices, setCryptoPrices] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTimestamp, setLastFetchTimestamp] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const cryptoIds = ['ethereum', 'optimism', 'bitcoin', 'matic-network', 'giveth', 'golem'];

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      setLoading(true);
      setError(null);
      setLastFetchTimestamp(new Date().toISOString()); // Update timestamp immediately

      try {
        const response = await axios.get<any>(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds.join(',')}&vs_currencies=usd&include_24hr_change=false`
        );

        const cryptoData = cryptoIds.map((id) => {
          const price = response.data[id].usd;
          let symbol, name;
          switch (id) {
            case 'ethereum':
              symbol = 'ETH';
              name = 'Ethereum';
              break;
            case 'optimism':
              symbol = 'OP';
              name = 'Optimism';
              break;
            case 'bitcoin':
              symbol = 'BTC';
              name = 'Bitcoin';
              break;
            case 'matic-network':
              symbol = 'POL';
              name = 'Polygon';
              break;
            case 'giveth':
              symbol = 'GIV';
              name = 'Giveth';
              break;
            case 'golem':
              symbol = 'GLM';
              name = 'Golem';
              break;
            default:
              symbol = '';
              name = '';
          }
          return {
            id,
            symbol,
            name,
            current_price: price,
          };
        });

        setCryptoPrices(cryptoData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        setError('Failed to fetch crypto prices.');
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchCryptoPrices();

    // Set up an interval to fetch data every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(fetchCryptoPrices, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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

  const filteredCryptos = cryptoPrices.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatUTCDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date) + ' UTC';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Crypto Prices</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800/50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search cryptos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800/50 focus:outline-none focus:border-purple-400"
          />
        </div>

        {loading && (
          <div className="mt-6 text-sm opacity-75">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 text-sm opacity-75 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {lastFetchTimestamp && (
          <div className="mt-6 text-sm opacity-75">
            <p>
              Last fetch attempt: {formatUTCDate(new Date(lastFetchTimestamp))}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="space-y-4">
              {filteredCryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
                >
                  <div>
                    <h3 className={`font-semibold text-lg ${tokenNameClasses[theme]}`}>
                      {crypto.name} ({crypto.symbol.toUpperCase()})
                    </h3>
                    <p className={`text-sm opacity-75 ${priceClasses}`}>
                      Current Price: ${crypto.current_price.toFixed(4)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredCryptos.length === 0 && (
              <div className="mt-6 text-sm opacity-75">
                <p>No results found for "{searchQuery}".</p>
              </div>
            )}
          </>
        )}

        <div className="mt-6 text-sm opacity-75">
          <p>Information for selected cryptocurrencies.</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoPricesModal;