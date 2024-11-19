// src/config.ts
export const keyCommands = {
  'Ctrl+K': 'focusSearchBar',
  'Ctrl+B': 'toggleToolbar',
  'Escape': 'closeModalsOrToolbar',
  'Alt+T': 'changeTheme',
  'Alt+M': 'toggleMusicModal',
  'Alt+H': 'toggleHelpModal',
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
  'music': 'isMusicModalOpen',
  'sound': 'isMusicModalOpen',
  'tunes': 'isMusicModalOpen',
  'help': 'isHelpModalOpen',
} as const;