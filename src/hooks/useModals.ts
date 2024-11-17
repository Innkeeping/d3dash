// src/hooks/useModals.ts
import { useState } from 'react';

interface ModalState {
  isPomodoroModalOpen: boolean;
  isTimeZonesModalOpen: boolean;
  isCryptoPricesModalOpen: boolean;
}

export const useModals = () => {
  const [modals, setModals] = useState<ModalState>({
    isPomodoroModalOpen: false,
    isTimeZonesModalOpen: false,
    isCryptoPricesModalOpen: false,
  });

  const openModal = (modal: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modal]: false }));
  };

  return { ...modals, openModal, closeModal };
};