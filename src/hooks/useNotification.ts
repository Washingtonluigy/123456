import { useState } from 'react';

interface NotificationState {
  isOpen: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  const [confirm, setConfirm] = useState<ConfirmState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: () => {},
  });

  const showNotification = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string
  ) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const showSuccess = (message: string, title: string = 'Sucesso!') => {
    showNotification('success', title, message);
  };

  const showError = (message: string, title: string = 'Erro!') => {
    showNotification('error', title, message);
  };

  const showWarning = (message: string, title: string = 'Atenção!') => {
    showNotification('warning', title, message);
  };

  const showInfo = (message: string, title: string = 'Informação') => {
    showNotification('info', title, message);
  };

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    title: string = 'Confirmar ação?',
    type: 'danger' | 'warning' | 'info' = 'warning'
  ) => {
    setConfirm({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  const closeConfirm = () => {
    setConfirm((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    notification,
    confirm,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    closeNotification,
    closeConfirm,
  };
};
