import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    info: <AlertCircle className="text-blue-400" size={20} />
  };

  const styles = {
    success: 'bg-green-500/10 border-green-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-blue-500/10 border-blue-500/30'
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${styles[type]} backdrop-blur-sm shadow-xl animate-slide-in-up`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 text-sm text-gray-100 font-medium">
        {message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 w-6 h-6 rounded-md hover:bg-gray-700/50 flex items-center justify-center transition-colors"
      >
        <X size={14} className="text-gray-400" />
      </button>
    </div>
  );
}
