import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Download, Share2, Info } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'motion/react';

const QRCodeScreen: React.FC = () => {
  const { depositId } = useParams<{ depositId: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-primary min-h-screen text-white">
      {/* Top Bar */}
      <div className="p-6 flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="p-2 bg-white/10 rounded-xl text-white">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold">Deposit QR Code</h2>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>

          <div className="flex flex-col items-center text-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Scan this code at the rack</p>

            <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
              <QRCodeSVG value={depositId || ''} size={220} level="H" />
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold tracking-tight">{depositId}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <div className="mt-10 flex gap-4 text-white/70">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <Download size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase">Save</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <Share2 size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase">Share</span>
          </div>
        </div>

        <div className="mt-auto bg-white/10 p-4 rounded-2xl flex gap-3 max-w-xs border border-white/10">
          <Info size={18} className="text-white shrink-0" />
          <p className="text-[10px] leading-relaxed text-white/80">
            Keep this QR code private. You will need to scan it again to retrieve your helmet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
