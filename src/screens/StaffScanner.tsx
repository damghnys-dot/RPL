import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Scan, X, Check, ShieldAlert, Zap, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Capacitor } from '@capacitor/core';
import { deposits } from '../data/mockData';
import { startScan, stopScan } from '../utils/scanner';

const StaffScanner: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isWeb = Capacitor.getPlatform() === 'web';

  const initScan = async () => {
    setScanning(true);
    setResult(null);
    setError(false);

    // Menambah entri history buatan agar gesture back tidak langsung keluar
    window.history.pushState({ scanning: true }, '');

    if (isWeb) {
      // Aktifkan Kamera Browser untuk Testing
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (e) {
        console.error("Gagal akses kamera web:", e);
      }
    }

    const scanValue = await startScan();

    if (scanValue) {
      handleScanResult(scanValue);
    } else if (!isWeb) {
      setScanning(false);
    }
  };

  const handleScanResult = (value: string) => {
    setScanning(false);
    stopWebCamera();
    const found = deposits.find(d => d.id === value);
    if (found) {
      setResult(found);
    } else {
      setError(true);
    }
  };

  const stopWebCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const resetScanner = () => {
    stopScan();
    stopWebCamera();
    setScanning(false);
    setResult(null);
    setError(false);
  };

  // Menangani Tombol/Gesture Back menggunakan History API (Tanpa Plugin)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (scanning) {
        // Jika sedang scan dan user pencet back, matikan scanner
        resetScanner();
      } else if (result || error) {
        // Jika sedang di layar hasil dan user pencet back, kembali ke persiapan
        setResult(null);
        setError(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      stopScan();
      stopWebCamera();
    };
  }, [scanning, result, error]);

  return (
    <div className={scanning ? "flex-1 bg-transparent h-screen w-full overflow-hidden" : "flex-1 flex flex-col bg-slate-900 text-white relative overflow-hidden"}>
      {/* Scanner Viewport Overlay */}
      {scanning ? (
        <div className="fixed inset-0 z-50 flex flex-col pointer-events-none bg-transparent">
           {/* Web Camera Preview */}
           {isWeb && (
             <div className="absolute inset-0 bg-black z-[-1]">
               <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover opacity-60"
               />
             </div>
           )}

           <div className="p-6 flex justify-between pointer-events-auto">
            <button onClick={resetScanner} className="p-2 bg-black/40 backdrop-blur-md rounded-xl text-white">
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-72 h-72">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl"></div>

              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
              ></motion.div>
            </div>
          </div>

          <div className="pb-20 text-center pointer-events-auto">
            <p className="text-white bg-black/40 inline-block px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md">
              Arahkan Kamera ke QR Code
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Tombol Back saat tidak sedang scanning */}
          <div className="absolute top-8 left-6 z-20">
            <button
              onClick={() => navigate('/staff')}
              className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!result && !error && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8"
              >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                  <Scan size={48} />
                </div>
                <h3 className="text-2xl font-bold">Scanner Ready</h3>
                <p className="text-white/40 text-sm mt-2 text-center max-w-[240px]">
                  Scan QR Code pada helm untuk melakukan verifikasi data mahasiswa.
                </p>
                <button
                  onClick={initScan}
                  className="mt-12 w-full h-16 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20"
                >
                  Mulai Scan Kamera
                </button>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="success"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="flex-1 flex flex-col p-8 bg-white text-slate-800 rounded-t-[3rem] absolute bottom-0 left-0 right-0 z-30"
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

                <div className="mt-auto flex gap-4 pt-6">
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
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-24 h-24 bg-danger/10 rounded-full flex items-center justify-center text-danger mb-6">
                  <ShieldAlert size={48} />
                </div>
                <h3 className="text-2xl font-bold">Invalid Code</h3>
                <p className="text-white/60 text-sm mt-2 max-w-[240px]">This QR code is either expired or not registered in our system.</p>

                <button
                  onClick={initScan}
                  className="mt-10 w-full h-14 bg-white text-slate-900 rounded-2xl font-bold text-sm"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default StaffScanner;
