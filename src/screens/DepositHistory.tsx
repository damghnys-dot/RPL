import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Search, Filter, QrCode } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { deposits } from '../data/mockData';

const DepositHistory: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredDeposits = deposits.filter(d =>
    filter === 'all' ? true : d.status === filter
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-slate-800">History</h2>
        </div>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or Rack..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                filter === f ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 px-6 space-y-4">
        {filteredDeposits.length > 0 ? (
          filteredDeposits.map((d) => (
            <div key={d.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <QrCode size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-slate-800">{d.id}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-medium text-slate-500 uppercase">{d.rackId}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{new Date(d.startTime).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">No history found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistory;
