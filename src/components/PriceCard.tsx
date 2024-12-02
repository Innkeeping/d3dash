// src/PriceCard.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Theme } from '../types'

interface PriceCardProps {
  theme: Theme
  toggleVisibility: () => void
}

const PriceCard: React.FC<PriceCardProps> = ({ theme, toggleVisibility }) => {
  const [ethPrice, setEthPrice] = useState<number | null>(null)
  const [opPrice, setOpPrice] = useState<number | null>(null)
  const [btcPrice, setBtcPrice] = useState<number | null>(null)

  const themeClasses: { [key in Theme]: string } = {
    purple: 'border-purple-500/20 hover:border-purple-500/40 text-purple-300 group-hover:text-purple-200',
    green: 'border-green-500/20 hover:border-green-500/40 text-green-300 group-hover:text-green-200',
    teal: 'border-teal-500/20 hover:border-teal-500/40 text-teal-300 group-hover:text-teal-200'
  }

  const priceClasses: { [key in Theme]: { eth: string, op: string, btc: string } } = {
    purple: {
      eth: 'text-purple-300',
      op: 'text-green-300',
      btc: 'text-teal-300'
    },
    green: {
      eth: 'text-green-300',
      op: 'text-teal-300',
      btc: 'text-purple-300'
    },
    teal: {
      eth: 'text-teal-300',
      op: 'text-purple-300',
      btc: 'text-green-300'
    }
  }

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,optimism,bitcoin&vs_currencies=usd');
        setEthPrice(response.data.ethereum.usd)
        setOpPrice(response.data.optimism.usd)
        setBtcPrice(response.data.bitcoin.usd)
      } catch (error) {
        console.error('Error fetching prices:', error)
      }
    }


    fetchPrices()


    const intervalId = setInterval(fetchPrices, 60000)


    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      className={`bg-gray-800/30 border hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm p-2 rounded-lg ${themeClasses[theme]} flex items-center space-x-4 cursor-pointer mr-12`}
      onClick={toggleVisibility}
    >
      <div>
        {ethPrice !== null ? (
          <div>
            <h2 className="text-sm font-semibold">ETH</h2>
            <p className={`text-md font-bold ${priceClasses[theme].eth}`}>${ethPrice.toLocaleString()}</p>
          </div>
        ) : (
          <div>Loading ETH...</div>
        )}
      </div>
      <div>
        {opPrice !== null ? (
          <div>
            <h2 className="text-sm font-semibold">OP</h2>
            <p className={`text-md font-bold ${priceClasses[theme].op}`}>${opPrice.toLocaleString()}</p>
          </div>
        ) : (
          <div>Loading OP...</div>
        )}
      </div>
      <div>
        {btcPrice !== null ? (
          <div>
            <h2 className="text-sm font-semibold">BTC</h2>
            <p className={`text-md font-bold ${priceClasses[theme].btc}`}>${btcPrice.toLocaleString()}</p>
          </div>
        ) : (
          <div>Loading BTC...</div>
        )}
      </div>
    </div>
  )
}

export default PriceCard