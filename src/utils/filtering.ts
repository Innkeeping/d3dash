// src/utils/filtering.ts
import { shortcuts } from '../data/shortcuts';
import { links } from '../data/links.tsx'; // Adjust the path as necessary
import { Link, DescribedLink, NetworkLink, DescribedShortcut } from '../types';

export const filterShortcuts = (search: string) => {
  return shortcuts.filter(shortcut =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
    shortcut.category.toLowerCase().includes(search.toLowerCase())
  );
};

export const filterLinks = (search: string, allLinks: DescribedShortcut[]) => {
  const lowerSearch = search.toLowerCase();
  return allLinks.filter(link => {
    const lowerName = link.name.toLowerCase();
    const lowerDescription = link.description.toLowerCase();
    const lowerCategory = link.category.toLowerCase();

    return (
      lowerName.includes(lowerSearch) ||
      lowerDescription.includes(lowerSearch) ||
      lowerCategory.includes(lowerSearch)
    );
  });
};

export const allLinks: DescribedShortcut[] = links;