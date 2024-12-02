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
  'price': 'isPricesOpen',
  'clock': 'isWClockOpen',
  'time': 'isWClockOpen',
  'utc': 'isWClockOpen',
  'docs': 'isDocsOpen',
  'social': 'isSocialOpen',
  'words': 'isLexiconOpen',
  'dictionary': 'isLexiconOpen',
  'lexicon': 'isLexiconOpen',
  'wallet': 'isWalletsOpen',
  'music': 'isMusicOpen',
  'sound': 'isMusicOpen',
  'tunes': 'isMusicOpen',
  'help': 'isHelpOpen',
} as const