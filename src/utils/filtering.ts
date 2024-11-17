// src/utils/filtering.ts
import { shortcuts } from '../data/shortcuts';
import linksData from '../data/links.json';
import { Link, DescribedLink, NetworkLink } from '../types';

export const filterShortcuts = (search: string) => {
  return shortcuts.filter(shortcut =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
    shortcut.category.toLowerCase().includes(search.toLowerCase())
  );
};

export const filterLinks = (search: string, allLinks: Link[]) => {
  const lowerSearch = search.toLowerCase();
  return allLinks.filter(link => {
    const lowerName = link.name.toLowerCase();

    if ('description' in link && 'category' in link) {
      const linkWithDescriptionAndCategory = link as DescribedLink;
      return (
        lowerName.includes(lowerSearch) ||
        linkWithDescriptionAndCategory.description.toLowerCase().includes(lowerSearch) ||
        (linkWithDescriptionAndCategory.category && linkWithDescriptionAndCategory.category.toLowerCase().includes(lowerSearch))
      );
    } else if ('description' in link) {
      const linkWithDescription = link as DescribedLink;
      return (
        lowerName.includes(lowerSearch) ||
        linkWithDescription.description.toLowerCase().includes(lowerSearch)
      );
    } else if ('category' in link) {
      const linkWithCategory = link as NetworkLink;
      return (
        lowerName.includes(lowerSearch) ||
        (linkWithCategory.category && linkWithCategory.category.toLowerCase().includes(lowerSearch))
      );
    } else {
      return lowerName.includes(lowerSearch);
    }
  });
};

export const allLinks: Link[] = Object.values(linksData).flat();