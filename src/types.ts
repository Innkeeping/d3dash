// types.ts
import { ReactElement, Dispatch, SetStateAction, RefObject, ComponentType } from 'react';

// Define the IconProps type and export it
export type IconProps = {
  className?: string;
  size?: string | number; // Allow string or number for size
};

// Define the IconComponent type and export it
export type IconComponent = ComponentType<IconProps>;

export interface Shortcut {
  id: string;
  name: string;
  icon: IconComponent; // Use IconComponent for icon
  url: string;
  category: string;
  type: 'shortcut'; // Add type property
}

export interface DescribedShortcut extends Shortcut {}

export type Theme = 'purple' | 'green' | 'teal';

export interface CommonLink {
  id: string; // Add id to CommonLink
  name: string;
  icon: IconComponent; // Use IconComponent for icon
  url: string;
  description: string;
  category: string; // Ensure category is always a string
  type: 'link'; // Add type property
}

export interface DescribedLink extends CommonLink {}

export interface NetworkLink extends CommonLink {
  chainId?: string;
  currency?: string;
}

export type Link = DescribedLink | NetworkLink;

export type CitiesToTimeZones = {
  [key: string]: string[];
};

export type LensPublicationStats = {
  reactions: number;
};

export type LensImageMetadataV3 = {
  __typename: 'ImageMetadataV3';
  id: string;
  content: string;
  asset: {
    image: {
      optimized: {
        uri: string;
      };
    };
  };
};

export type LensTextOnlyMetadataV3 = {
  __typename: 'TextOnlyMetadataV3';
  content: string;
};

export type LensPostMetadata = LensImageMetadataV3 | LensTextOnlyMetadataV3;

export type LensPublication = {
  stats: LensPublicationStats;
  metadata: LensPostMetadata;
};

export type LensExplorePublicationsResponse = {
  items: LensPublication[];
};

export interface ModalsState {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
  isWeb3SocialModalOpen: boolean;
  isWalletsModalOpen: boolean;
  isLexiconModalOpen: boolean;
  isMusicModalOpen: boolean;
  isHelpModalOpen: boolean;
  isModalvateOpen: boolean;
  isRefiModalOpen: boolean;
  isGovernanceModalOpen: boolean;
  isDefiModalOpen: boolean;
  isLensfeedModalOpen: boolean;
  isIpfsModalOpen: boolean;
  isGamebModalOpen: boolean;
  isNetworksModalOpen: boolean;
}

export interface ModalsProps extends ModalsState {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  openModal: (modalKey: keyof ModalsState) => void;
  closeModal: (modalKey: keyof ModalsState) => void;
  toggleModal: (modalKey: keyof ModalsState) => void;
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
  toggleTheme: () => void;
  timerTimeLeft: number;
  setTimerTimeLeft: Dispatch<SetStateAction<number>>;
  isTimerRunning: boolean;
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

export interface KeyboardEventHandlers {
  onCtrlK?: () => void;
  onCtrlB?: () => void;
  onEscape?: () => void;
  onAltT?: () => void;
  onAltM?: () => void;
  onAltH?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
}

export interface ToolbarProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  onPomodoroOpen: () => void;
  onTimeZonesOpen: () => void;
  showToolbar: boolean;
  toggleToolbar: () => void;
  openModal: (modalKey: keyof ModalsState) => void;
  closeModal: (modalKey: keyof ModalsState) => void;
  modals: ModalsProps; // Added this line
}

export interface MainContentProps {
  search: string;
  theme: Theme;
  focusedIndex: number | null;
  setFocusedIndex: Dispatch<SetStateAction<number | null>>;
  isTimerRunning: boolean;
  timerTimeLeft: number;
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
  setTimerTimeLeft: Dispatch<SetStateAction<number>>;
  showToolbar: boolean;
  toggleToolbar: () => void;
  navigateToSearchBar: () => void;
  onTimerUpdate: (isRunning: boolean, timeLeft: number) => void;
  searchBarRef: RefObject<HTMLInputElement>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  openModal: (modalKey: keyof ModalsState) => void;
  closeModal: (modalKey: keyof ModalsState) => void;
}

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchInputRef: RefObject<HTMLInputElement>; // Added this line
  theme: Theme; // Added this line
  onNavigateToGrid: () => void;
}

export type TimerUpdateHandler = (isRunning: boolean, timeLeft: number) => void;