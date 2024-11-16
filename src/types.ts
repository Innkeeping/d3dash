import { ReactNode } from 'react';

export interface Shortcut {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
  category: string;
}

export type Theme = 'purple' | 'green';