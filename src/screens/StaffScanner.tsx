import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Scan, X, Check, ShieldAlert, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { deposits } from '../data/mockData';

const StaffScanner: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState(false);

  // Simulation
  const handleScan = () => {
    setScanning(false);
    // 80% success rate for simulation
    if (Math.random() > 0.2) {
      setResult(deposits[0]);
    } else {
      setError(true);
    }
  };

  const resetScanner = () => {
    setScanning(true);
    setResult(null);
    setError(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 text-white relative overflow-hidden">
      {/* Scanner Viewport */}
      {scanning ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          <div className="absolute top-8 left-0 w-full flex justify-between px-6 z-20">
            <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-md rounded-xl">
              <ChevronLeft size={24} />
            </button>
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-xl">
              <Zap size={24} className="text-warning" />
            </button>
          </div>

          <div className="relative w-72 h-72">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl"></div>

            {/* Scanning Line */}
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10"
            ></motion.div>

            <div className="absolute inset-4 border border-white/10 rounded-2xl flex items-center justify-center">
              <Scan size={64} className="text-white/10" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-bold">Align QR Code</h3>
            <p className="text-white/40 text-xs mt-1">Scanner will automatically detect codes</p>
          </div>

          <button
            onClick={handleScan}
            className="absolute bottom-12 w-48 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            Simulate Scan
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              className="flex-1 flex flex-col p-8 bg-white text-slate-800 rounded-t-[3rem]"
            >
              <div className="flex justify-center mb-8">
                <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold">Verification Success</h3>
                <p className="text-slate-500 text-sm mt-1">The QR code is valid and belongs to:</p>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Student Name</span>
                  <span className="text-sm font-bold text-slate-800">{result.studentName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Deposit ID</span>
                  <span className="text-sm font-bold text-slate-800">{result.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Rack Location</span>
                  <span className="text-sm font-bold text-primary">{result.rackId}</span>
                </div>
              </div>

              <div className="mt-auto flex gap-4">
                <button
                  onClick={resetScanner}
                  className="flex-1 h-14 border border-slate-200 rounded-2xl font-bold text-slate-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate('/staff')}
                  className="flex-1 h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 text-sm"
                >
                  Process Retrieval
                </button>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-24 h-24 bg-danger/10 rounded-full flex items-center justify-center text-danger mb-6">
                <ShieldAlert size={48} />
              </div>
              <h3 className="text-2xl font-bold">Invalid Code</h3>
              <p className="text-white/60 text-sm mt-2 max-w-[240px]">This QR code is either expired or not registered in our system.</p>

              <button
                onClick={resetScanner}
                className="mt-10 w-full h-14 bg-white text-slate-900 rounded-2xl font-bold text-sm"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default StaffScanner;
