import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getColors = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'from-red-50 to-rose-50 border-red-200',
          icon: 'text-red-500',
          button: 'bg-red-600 hover:bg-red-700',
        };
      case 'warning':
        return {
          bg: 'from-yellow-50 to-amber-50 border-yellow-200',
          icon: 'text-yellow-500',
          button: 'bg-yellow-600 hover:bg-yellow-700',
        };
      case 'info':
        return {
          bg: 'from-blue-50 to-cyan-50 border-blue-200',
          icon: 'text-blue-500',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform animate-in zoom-in-95 duration-300">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className={`bg-gradient-to-br ${colors.bg} border-2 p-6 rounded-t-2xl`}>
            <div className="flex justify-center mb-4">
              <div className="animate-pulse">
                <AlertTriangle className={`w-12 h-12 ${colors.icon}`} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {title}
            </h2>
          </div>

          <div className="p-6">
            <p className="text-center text-gray-700 mb-6 whitespace-pre-line">
              {message}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 ${colors.button} text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
