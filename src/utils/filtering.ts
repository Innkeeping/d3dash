// src/utils/filtering.ts
import { Shortcut, CommonLink, IconProps, IconComponent } from '../types';
import { ComponentType } from 'react';
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
} from 'lucide-react';

// Define a type for the fetched data
export type FetchedItem = {
  id: string;
  name: string;
  icon: string; // Use string for icon key
  url: string;
  category: string;
  type: 'shortcut' | 'link';
  description?: string; // Optional for links
  chainId?: string; // Optional for network links
  currency?: string; // Optional for network links
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

  // Add other mappings here
};

export const fetchShortcutsAndLinks = async (): Promise<(Shortcut | CommonLink)[]> => {
  try {
    const response = await fetch('/d3dash/data/shortcuts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FetchedItem[] = await response.json(); // Use type annotation here
    console.log('Fetched data:', data); // Debugging log

    return data.map(item => {
      const iconComponent = iconMap[item.icon] || (() => null); // Default to a no-op component if icon not found
      if (item.type === 'link') {
        return {
          id: item.id,
          name: item.name,
          icon: iconComponent,
          url: item.url,
          description: item.description || '', // Ensure description is a string, default to empty if undefined
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
      // Handle unexpected types gracefully
      console.warn('Unexpected item type:', item);
      return null;
    }).filter((item): item is Shortcut | CommonLink => item !== null);
  } catch (error) {
    console.error('Error fetching data:', error); // Debugging log
    return [];
  }
};

export const filterItems = (search: string, items: (Shortcut | CommonLink)[]): (Shortcut | CommonLink)[] => {
  const lowerSearch = search.toLowerCase();
  return items.filter(item => {
    const lowerName = item.name.toLowerCase();
    const lowerCategory = item.category.toLowerCase();

    if (item.type === 'shortcut') {
      return lowerName.includes(lowerSearch) || lowerCategory.includes(lowerSearch);
    } else if (item.type === 'link') {
      const lowerDescription = item.description?.toLowerCase() || '';
      return lowerName.includes(lowerSearch) || lowerDescription.includes(lowerSearch) || lowerCategory.includes(lowerSearch);
    }
    return false;
  });
};