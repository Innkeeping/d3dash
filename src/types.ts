import { ReactNode } from 'react';

export interface Shortcut {
  id: string;
  name: string;
  icon: ReactNode;
  url: string;
  category: string;
  description: string;
}

export interface DescribedShortcut extends Shortcut {
  description: string;
}

export type Theme = 'purple' | 'green' | 'teal';

export interface DescribedLink {
  name: string;
  icon: string;
  url: string;
  description: string;
  category?: string;
}

export interface NetworkLink {
  name: string;
  icon?: string;
  url: string;
  chainId?: string;
  currency?: string;
  category?: string;
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
  // Add other keyboard event handlers as needed
}