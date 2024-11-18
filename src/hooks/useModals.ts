// src/hooks/useModals.ts
import { useState } from 'react';

interface ModalsState {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
  isDocsModalOpen: boolean;
}

export const useModals = () => {
  const [modals, setModals] = useState<ModalsState>({
    isPomodoroModalOpen: false,
    isTimeZonesModalOpen: false,
    isCryptoPricesModalOpen: false,
    isDocsModalOpen: false,
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