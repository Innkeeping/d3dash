// src/types.ts
import { ReactNode } from 'react';

export interface Shortcut {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
  category: string;
}

export type Theme = 'purple' | 'green' | 'teal';

// Define a type for links with a description
export interface DescribedLink {
  name: string;
  icon: string;
  url: string;
  description: string;
  category?: string; // Make category optional
}

// Define a type for links without a description
export interface NetworkLink {
  name: string;
  icon?: string; // Make icon optional
  url: string;
  chainId?: string;
  currency?: string;
  category?: string; // Make category optional
}

// Union type for links
export type Link = DescribedLink | NetworkLink;

export type CitiesToTimeZones = {
  [key: string]: string[];
};
