// Modals.tsx
import React from 'react';
import TimeZonesModal from './TimeZonesModal';
import Web3SocialModal from './Web3SocialModal';
import WalletsModal from './WalletsModal';
import LexiconModal from './LexiconModal';
import MusicModal from './MusicModal';
import Help from './Help'; // Corrected import
import Modalvate from './Modalvate';
import { ModalsState, Theme, CommonModalProps, MusicModalProps, GamebModalProps } from '../types'; // Import necessary types
import Prices from './Prices'; // Updated import
import Gov from './Gov'; // Updated import
import Lens from './Lens'; // Updated import
import IPFSModal from './IPFSModal';
import GamebModal from './GamebModal';
import Defi from './Defi'; // Updated import

const Modals: React.FC<ModalsState> = ({
  isTimeZonesOpen,
  isWeb3SocialOpen,
  isWalletsOpen,
  isLexiconOpen,
  isMusicOpen,
  isHelpOpen,
  isModalvateOpen,
  isPricesOpen,
  isGovOpen,
  isDocsOpen,
  isLensfeedOpen,
  isGamebOpen,
  isIpfsOpen,
  isDefiOpen,
  isRefiOpen,
  isNetworksOpen,
  isLensOpen,
  closeModal,
  theme,
}) => {

  const gamebIframeUrl = 'https://innkeeping.github.io/gameB/';

  // Define an array of modal configurations with specific props
  const modalConfigurations = [
    { component: TimeZonesModal, props: { isOpen: isTimeZonesOpen, onClose: () => closeModal('isTimeZonesOpen'), theme } as CommonModalProps },
    { component: Web3SocialModal, props: { isOpen: isWeb3SocialOpen, onClose: () => closeModal('isWeb3SocialOpen'), theme } as CommonModalProps },
    { component: WalletsModal, props: { isOpen: isWalletsOpen, onClose: () => closeModal('isWalletsOpen'), theme } as CommonModalProps },
    { component: LexiconModal, props: { isOpen: isLexiconOpen, onClose: () => closeModal('isLexiconOpen'), theme } as CommonModalProps },
    { component: Help, props: { isOpen: isHelpOpen, onClose: () => closeModal('isHelpOpen'), theme } as CommonModalProps },
    { component: Modalvate, props: { isOpen: isModalvateOpen, onClose: () => closeModal('isModalvateOpen'), theme } as CommonModalProps },
    { component: Prices, props: { isOpen: isPricesOpen, onClose: () => closeModal('isPricesOpen'), theme } as CommonModalProps },
    { component: Gov, props: { isOpen: isGovOpen, onClose: () => closeModal('isGovOpen'), theme } as CommonModalProps },
    { component: Lens, props: { isOpen: isLensfeedOpen, onClose: () => closeModal('isLensfeedOpen'), theme } as CommonModalProps },
    { component: IPFSModal, props: { isOpen: isIpfsOpen, onClose: () => closeModal('isIpfsOpen'), theme } as CommonModalProps },
    { component: Defi, props: { isOpen: isDefiOpen, onClose: () => closeModal('isDefiOpen'), theme } as CommonModalProps },
    // Add other modals with their specific props
  ];

  return (
    <>
      {modalConfigurations.map((config, index) => {
        const { component: ModalComponent, props } = config;
        return (
          <ModalComponent
            key={index}
            {...props}
          />
        );
      })}

      {/* Handle MusicModal separately */}
      <MusicModal
        isOpen={isMusicOpen}
        onClose={() => closeModal('isMusicOpen')}
        onOpen={() => {}} // Provide an empty function or the actual onOpen handler if needed
        theme={theme}
      />

      {/* Handle GamebModal separately */}
      <GamebModal
        isOpen={isGamebOpen}
        onClose={() => closeModal('isGamebOpen')}
        theme={theme}
      />
    </>
  );
};

export default Modals;