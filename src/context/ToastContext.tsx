import React, { createContext, useContext, useMemo, useRef } from 'react';
import Toast from 'react-native-easy-toast';

type ToastVariant = 'error' | 'success';

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
  showError: () => {},
  showSuccess: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const errorRef = useRef<Toast | null>(null);
  const successRef = useRef<Toast | null>(null);

  const value = useMemo<ToastContextValue>(() => {
    const showToast = (message: string, variant: ToastVariant = 'error') => {
      const ref = variant === 'success' ? successRef : errorRef;
      ref.current?.show(message, 2000);
    };

    return {
      showToast,
      showError: (message: string) => showToast(message, 'error'),
      showSuccess: (message: string) => showToast(message, 'success'),
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        ref={r => {
          errorRef.current = r;
        }}
        position="top"
        positionValue={60}
        fadeInDuration={180}
        fadeOutDuration={600}
        opacity={0.98}
        style={{
          backgroundColor: '#D32F2F',
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 10,
          minWidth: 200,
        }}
        textStyle={{
          color: '#fff',
          fontWeight: '700',
        }}
      />
      <Toast
        ref={r => {
          successRef.current = r;
        }}
        position="top"
        positionValue={60}
        fadeInDuration={180}
        fadeOutDuration={600}
        opacity={0.98}
        style={{
          backgroundColor: '#2E7D32',
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 10,
          minWidth: 200,
        }}
        textStyle={{
          color: '#fff',
          fontWeight: '700',
        }}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

