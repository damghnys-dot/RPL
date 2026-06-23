import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h3 className="text-slate-800 font-bold mb-1">Loading</h3>
      <p className="text-slate-400 text-sm">Please wait a moment...</p>
    </div>
  );
};

export default LoadingState;
