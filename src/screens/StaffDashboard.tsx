import React from 'react';
import { useNavigate } from 'react-router';
import { ScanLine, Box, CheckCircle, Clock, Search, ArrowRight } from 'lucide-react';
import AvatarInitials from '../components/AvatarInitials';
import InfoCard from '../components/InfoCard';
import { users, deposits, statistics } from '../data/mockData';

const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();
  const staff = users[1];

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AvatarInitials name={staff.name} size="md" />
          <div>
            <h2 className="text-lg font-bold text-slate-800">{staff.name.split(' ')[0]}</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Duty</span>
            </div>
          </div>
        </div>
        <button className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400">
          <Search size={20} />
        </button>
      </div>

      {/* Main Action */}
      <button
        onClick={() => navigate('/scanner')}
        className="w-full h-24 bg-primary rounded-3xl p-6 text-white flex items-center gap-6 shadow-xl shadow-primary/30 relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 h-full w-24 bg-white/5 skew-x-[-20deg] group-active:translate-x-full transition-transform duration-500"></div>
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <ScanLine size={28} />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-bold">Open Scanner</h3>
          <p className="text-white/60 text-xs font-medium">Verify & Process Deposits</p>
        </div>
        <ArrowRight className="ml-auto text-white/40" size={24} />
      </button>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <InfoCard
          label="Today's Active"
          value={deposits.filter(d => d.status === 'active').length}
          icon={<Clock size={16} />}
          trend={{ value: 12, isUp: true }}
        />
        <InfoCard
          label="Processed"
          value="48"
          icon={<CheckCircle size={16} />}
        />
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-slate-800">Queue List</h3>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">12 Pending</span>
        </div>

        <div className="space-y-3">
          {deposits.slice(0, 4).map((d) => (
            <div key={d.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <Box size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">{d.studentName}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-slate-400">{d.id}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-bold text-primary uppercase">{d.rackId}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/scanner')}
                className="text-[10px] font-bold text-white bg-secondary px-4 py-2 rounded-xl"
              >
                Verify
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
