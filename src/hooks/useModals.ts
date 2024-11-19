// src/hooks/useModals.ts
import { useState } from 'react';
import { ModalsState } from '../types';

export const useModals = () => {
  const [modals, setModals] = useState<ModalsState>({
    isPomodoroModalOpen: false,
    isTimeZonesModalOpen: false,
    isCryptoPricesModalOpen: false,
    isDocsModalOpen: false,
    isWeb3SocialModalOpen: false,
    isWalletsModalOpen: false,
    isLexiconModalOpen: false,
    isMusicModalOpen: false,
    isHelpModalOpen: false,
  });

  const openModal = (modalKey: keyof ModalsState) => {
    setModals((prev) => ({
      ...prev,
      [modalKey]: true,
    }));
  };

  const closeModal = (modalKey: keyof ModalsState) => {
    setModals((prev) => ({
      ...prev,
      [modalKey]: false,
    }));
  };

  return {
    ...modals,
    openModal,
    closeModal,
  };
};