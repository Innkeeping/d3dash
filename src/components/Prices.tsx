import React, { useRef, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Theme } from '../types'

interface PricesProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
}

interface Crypto {
  id: string
  symbol: string
  name: string
  current_price: number
}

const Prices: React.FC<PricesProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  const themeClasses = {
    purple: 'border-purple-500/30 bg-purple-900/20',
    green: 'border-green-500/30 bg-green-900/20',
    teal: 'border-teal-500/30 bg-teal-900/20',
  }

  const tokenNameClasses = {
    purple: 'text-purple-400',
    green: 'text-green-400',
    teal: 'text-teal-400',
  }

  const priceClasses = 'font-bold'

  const [cryptoPrices, setCryptoPrices] = useState<Crypto[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchTimestamp, setLastFetchTimestamp] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const listItemsRef = useRef<(HTMLDivElement | null)[]>([])

  const cryptoIds = ['ethereum', 'optimism', 'bitcoin', 'matic-network', 'giveth', 'golem']

  const fetchCryptoPrices = async () => {
    setLoading(true)
    setError(null)
    setLastFetchTimestamp(new Date().toISOString())
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds.join(',')}&vs_currencies=usd&include_24hr_change=false`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      const cryptoData = cryptoIds.map((id) => {
        const price = data[id].usd
        let symbol, name
        switch (id) {
          case 'ethereum':
            symbol = 'ETH'
            name = 'Ethereum'
            break
          case 'optimism':
            symbol = 'OP'
            name = 'Optimism'
            break
          case 'bitcoin':
            symbol = 'BTC'
            name = 'Bitcoin'
            break
          case 'matic-network':
            symbol = 'POL'
            name = 'Polygon'
            break
          case 'giveth':
            symbol = 'GIV'
            name = 'Giveth'
            break
          case 'golem':
            symbol = 'GLM'
            name = 'Golem'
            break
          default:
            symbol = ''
            name = ''
        }
        return {
          id,
          symbol,
          name,
          current_price: price,
        }
      })

      setCryptoPrices(cryptoData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching crypto prices:', error)
      setError('Failed to fetch crypto prices.')
      setLoading(false)
    }
  }

  const filteredCryptos = cryptoPrices.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    fetchCryptoPrices()

    const intervalId = setInterval(fetchCryptoPrices, 300000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        const inputElement = searchInputRef.current
        if (inputElement) {
          inputElement.focus()
          setFocusedIndex(null)
        }
      }, 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= filteredCryptos.length - 1 ? 0 : prevIndex + 1
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (focusedIndex === 0) {
          setFocusedIndex(null)
          searchInputRef.current?.focus()
        } else if (focusedIndex !== null) {
          setFocusedIndex((prevIndex) =>
            prevIndex === null || prevIndex <= 0 ? filteredCryptos.length - 1 : prevIndex - 1
          )
        }
      } else if (event.key === 'Enter' && focusedIndex !== null) {
        event.preventDefault()
        // You can add additional logic here if needed
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredCryptos, focusedIndex, onClose])

  useEffect(() => {
    if (focusedIndex !== null && listItemsRef.current[focusedIndex]) {
      listItemsRef.current[focusedIndex].focus()
    }
  }, [focusedIndex])

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
    }
    return new Intl.DateTimeFormat('en-US', options).format(date) + ' UTC'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`w-[600px] max-h-[90vh] rounded-xl border ${themeClasses[theme]} backdrop-blur-md p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Token Prices</h2>
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
              {filteredCryptos.map((crypto, index) => (
                <div
                  key={crypto.id}
                  ref={(el) => (listItemsRef.current[index] = el)}
                  tabIndex={0}
                  className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors ${
                    focusedIndex === index ? 'bg-gray-800/30' : ''
                  }`}
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
  )
}

export default Prices