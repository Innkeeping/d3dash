export const keyCommands = {
  'Ctrl+K': 'focusSearchBar',
  'Ctrl+B': 'toggleToolbar',
  'Escape': 'closeModalsOrToolbar',
  'Alt+T': 'changeTheme',
};


export const searchTerms = {
  'price': 'isCryptoPricesModalOpen',
  'clock': 'isTimeZonesModalOpen',
  'time': 'isTimeZonesModalOpen',
  'utc': 'isTimeZonesModalOpen',
  'docs': 'isDocsModalOpen',
  'social': 'isWeb3SocialModalOpen',
  'words': 'isLexiconModalOpen',
  'dictionary': 'isLexiconModalOpen',
  'lexicon': 'isLexiconModalOpen',
  'wallet': 'isWalletsModalOpen',
} as const;