import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-slate-800 font-bold mb-1">Ops! Error</h3>
      <p className="text-slate-400 text-sm mb-8">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
