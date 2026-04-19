import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, type, message }]);

    // auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* UI */}
      <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              'min-w-[280px] max-w-[360px] rounded-xl border px-4 py-3 shadow-lg backdrop-blur',
              'bg-black/60 border-white/10 text-white',
              t.type === 'success' ? 'ring-1 ring-green-500/30' : '',
              t.type === 'error' ? 'ring-1 ring-red-500/30' : '',
              t.type === 'info' ? 'ring-1 ring-blue-500/30' : '',
            ].join(' ')}
          >
            <p className="text-sm leading-snug">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}