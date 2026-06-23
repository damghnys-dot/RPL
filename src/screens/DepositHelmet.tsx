import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, MapPin, ShieldCheck, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { racks } from '../data/mockData';
import { cn } from '../utils/cn';

const DepositHelmet: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRack, setSelectedRack] = useState<string | null>(null);

  const handleDeposit = () => {
    if (!selectedRack) return;
    // Mock creating a deposit
    const newDepositId = 'D-' + Math.floor(10000 + Math.random() * 90000);
    navigate(`/qr-code/${newDepositId}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-800">Deposit Helmet</h2>
      </div>

      <div className="px-6 flex-1 space-y-6">
        {/* Banner */}
        <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-2xl flex gap-3">
          <Info size={20} className="text-secondary shrink-0" />
          <p className="text-xs text-secondary font-medium leading-relaxed">
            Please choose an available rack slot below. After confirmation, a QR code will be generated for your deposit.
          </p>
        </div>

        {/* Rack Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider ml-1">Available Racks</h3>
          <div className="grid grid-cols-1 gap-3">
            {racks.map((rack) => (
              <button
                key={rack.id}
                disabled={rack.status === 'full'}
                onClick={() => setSelectedRack(rack.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all flex items-center justify-between",
                  selectedRack === rack.id
                    ? "bg-primary/5 border-primary ring-2 ring-primary/10"
                    : "bg-white border-slate-100",
                  rack.status === 'full' && "opacity-60 grayscale cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    selectedRack === rack.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                  )}>
                    <MapPin size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">{rack.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{rack.availableSlots} slots available</p>
                  </div>
                </div>

                {rack.status === 'full' ? (
                  <span className="text-[10px] font-bold text-danger uppercase">Full</span>
                ) : (
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    selectedRack === rack.id ? "border-primary bg-primary" : "border-slate-200"
                  )}>
                    {selectedRack === rack.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedRack && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
          >
            <div className="flex justify-between items-center text-xs font-medium text-slate-500">
              <span>Selected Location</span>
              <span className="text-slate-800 font-bold">{selectedRack}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-500">
              <span>Security Method</span>
              <span className="text-slate-800 font-bold flex items-center gap-1">
                <ShieldCheck size={14} className="text-success" />
                QR Encryption
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-white border-t border-slate-100">
        <button
          disabled={!selectedRack}
          onClick={handleDeposit}
          className={cn(
            "w-full h-14 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
            selectedRack
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          Confirm Deposit
        </button>
      </div>
    </div>
  );
};

export default DepositHelmet;
