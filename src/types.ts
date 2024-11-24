// types.ts
import { ReactElement, Dispatch, SetStateAction, RefObject, ComponentType } from 'react';

export type IconProps = {
  className?: string;
  size?: string | number;
};

export type IconComponent = ComponentType<IconProps>;

export interface Shortcut {
  id: string;
  name: string;
  icon: IconComponent;
  url: string;
  category: string;
  type: 'shortcut';
}

export interface DescribedShortcut extends Shortcut {}

export type Theme = 'purple' | 'green' | 'teal';

export interface CommonLink {
  id: string;
  name: string;
  icon: IconComponent;
  url: string;
  description: string;
  category: string;
  type: 'link';
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
  isTimeZonesOpen: boolean;
  isWeb3SocialOpen: boolean;
  isWalletsOpen: boolean;
  isLexiconOpen: boolean;
  isMusicOpen: boolean;
  isHelpOpen: boolean;
  isModalvateOpen: boolean;
  isPricesOpen: boolean;
  isGovOpen: boolean;
  isDocsOpen: boolean;
  isLensfeedOpen: boolean;
  isGamebOpen: boolean;
  isIpfsOpen: boolean;
  isDefiOpen: boolean;
  isRefiOpen: boolean;
  isNetworksOpen: boolean;
  isLensOpen: boolean;
  closeModal: (modalKey: keyof ModalsState) => void;
  theme: Theme;
}

export type TimerUpdateHandler = (isRunning: boolean, timeLeft: number) => void;

export interface ModalsProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  openModal: (modalKey: keyof ModalsState) => void;
  closeModal: (modalKey: keyof ModalsState) => void;
  toggleModal: (modalKey: keyof ModalsState) => void;
  toggleTheme: () => void;
  onTimerUpdate: TimerUpdateHandler;
  timerTimeLeft: number;
  setTimerTimeLeft: Dispatch<SetStateAction<number>>;
  isTimerRunning: boolean;
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
  isOpen: ModalsState;
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
  toggleModal: (modalKey: keyof ModalsState) => void;
  toggleTheme: () => void;
  isOpen: ModalsState; // Include isOpen here
  timerTimeLeft: number;
  setTimerTimeLeft: Dispatch<SetStateAction<number>>;
  isTimerRunning: boolean;
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchInputRef: RefObject<HTMLInputElement>;
  theme: Theme;
  onNavigateToGrid: () => void;
}

// Define a common interface for modal props
export interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

// Define specific props for each modal component
export interface TimeZonesModalProps extends CommonModalProps {}

export interface MusicModalProps extends CommonModalProps {
  onOpen: () => void;
}

export interface GamebModalProps extends CommonModalProps {}

// Add other modal props interfaces as needed

// Define a union type for modal props
export type ModalProps =
  | TimeZonesModalProps
  | MusicModalProps
  | GamebModalProps
  | // Add other modal props interfaces here
  CommonModalProps; // Fallback for other modals