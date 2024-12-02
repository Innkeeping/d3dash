// src/utils/filtering.ts
import { Shortcut, CommonLink, IconProps } from '../types'
import { ComponentType } from 'react'
import {
  Github,
  DollarSign,
  Package,
  PieChart,
  Compass,
  BarChart,
  Briefcase,
  CircleDollarSign,
  HardDrive,
  Network,
  Book,
  BookOpen,
  Terminal,
  Globe,
  Wallet,
  Radio,
  Heart,
  Gem,
  Users,
  MessageSquare,
  Flower,
  Pill,
  Shrub,
  Orbit,
  Leaf,
  Newspaper,
  Coins,
  Boxes,
  Blocks,
  Code,
} from 'lucide-react'


export type FetchedItem = {
  id: string
  name: string
  icon: string;
  url: string
  category: string
  type: 'shortcut' | 'link'
  description?: string
  chainId?: string
  currency?: string
};

const iconMap: { [key: string]: ComponentType<IconProps> } = {
  Github,
  DollarSign,
  Package,
  PieChart,
  Compass,
  BarChart,
  Briefcase,
  CircleDollarSign,
  HardDrive,
  Network,
  Book,
  BookOpen,
  Terminal,
  Globe,
  Wallet,
  Radio,
  Heart,
  Gem,
  Users,
  MessageSquare,
  Flower,
  Pill,
  Shrub,
  Orbit,
  Leaf,
  Newspaper,
  Coins,
  Boxes,
  Blocks,
  Code
}

export const fetchShortcutsAndLinks = async (): Promise<(Shortcut | CommonLink)[]> => {
  try {
    const response = await fetch('/d3dash/data/shortcuts.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: FetchedItem[] = await response.json()
    console.log('Fetched data:', data)

    return data.map(item => {
      const iconComponent = iconMap[item.icon] || (() => null)
      if (item.type === 'link') {
        return {
          id: item.id,
          name: item.name,
          icon: iconComponent,
          url: item.url,
          description: item.description || '',
          category: item.category,
          type: item.type,
          chainId: item.chainId,
          currency: item.currency
        } as CommonLink;
      } else if (item.type === 'shortcut') {
        return {
          id: item.id,
          name: item.name,
          icon: iconComponent,
          url: item.url,
          category: item.category,
          type: item.type,
          chainId: item.chainId,
          currency: item.currency
        } as Shortcut;
      }

      console.warn('Unexpected item type:', item)
      return null
    }).filter((item): item is Shortcut | CommonLink => item !== null)
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
};

export const filterItems = (search: string, items: (Shortcut | CommonLink)[]): (Shortcut | CommonLink)[] => {
  const lowerSearch = search.toLowerCase()
  return items.filter(item => {
    const lowerName = item.name.toLowerCase()
    const lowerCategory = item.category.toLowerCase()

    if (item.type === 'shortcut') {
      return lowerName.includes(lowerSearch) || lowerCategory.includes(lowerSearch)
    } else if (item.type === 'link') {
      const lowerDescription = item.description?.toLowerCase() || ''
      return lowerName.includes(lowerSearch) || lowerDescription.includes(lowerSearch) || lowerCategory.includes(lowerSearch)
    }
    return false
  })
}