import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg p-6 relative w-full max-w-lg h-[90vh] overflow-scroll">
        <button
          onClick={onClose}
          className="absolute top-2 text-4xl right-5 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
