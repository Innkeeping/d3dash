import { X } from 'lucide-react';

const useCloseButton = (onClose: () => void) => {
  return (
    <X
      size={36}
      className="absolute top-1 right-2 p-2 text-white hover:text-gray-300 cursor-pointer"
      onClick={onClose}
    />
  );
};

export default useCloseButton;