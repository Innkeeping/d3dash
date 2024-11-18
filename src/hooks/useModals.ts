// src/hooks/useModals.ts
import { useState } from 'react';

interface ModalsState {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
  isWeb3SocialModalOpen: boolean; // Add state for Web3SocialModal
}

export const useModals = () => {
  const [modals, setModals] = useState<ModalsState>({
    isPomodoroModalOpen: false,
    isTimeZonesModalOpen: false,
    isCryptoPricesModalOpen: false,
    isDocsModalOpen: false,
    isWeb3SocialModalOpen: false, // Initialize state for Web3SocialModal
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