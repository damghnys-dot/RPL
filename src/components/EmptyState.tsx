import React from 'react';
import { Ghost } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-100 mt-4">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
        <Ghost size={32} />
      </div>
      <h3 className="text-slate-800 font-semibold mb-1">{title}</h3>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
