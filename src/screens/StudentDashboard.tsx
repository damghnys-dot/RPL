import React from 'react';
import { useNavigate } from 'react-router';
import { Plus, QrCode, MapPin, Clock, ArrowRight, Bell as BellIcon, History as HistoryIcon } from 'lucide-react';
import { motion } from 'motion/react';
import AvatarInitials from '../components/AvatarInitials';
import StatusBadge from '../components/StatusBadge';
import { users, deposits } from '../data/mockData';
import { cn } from '../utils/cn';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = users[0]; // Mock current user
  const activeDeposit = deposits.find(d => d.status === 'active' && d.studentId === user.id);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Good Morning,</p>
          <h2 className="text-xl font-bold text-slate-800">{user.name.split(' ')[0]}!</h2>
        </div>
        <AvatarInitials name={user.name} size="md" />
      </div>

      {/* Hero Card / Active Deposit */}
      {activeDeposit ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-primary rounded-3xl p-6 text-white shadow-xl shadow-primary/30 relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="flex justify-between items-start mb-6">
            <div className="bg-white/20 p-2.5 rounded-xl">
              <QrCode size={24} />
            </div>
            <StatusBadge status="active" className="bg-white/20 text-white border-white/30" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Active Deposit</p>
              <h3 className="text-2xl font-bold">{activeDeposit.id}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-white/60" />
                <span className="text-xs font-medium">{activeDeposit.rackId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-white/60" />
                <span className="text-xs font-medium">08:30 AM</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/qr-code/${activeDeposit.id}`)}
              className="w-full h-12 bg-white text-primary rounded-xl font-bold text-sm mt-2 flex items-center justify-center gap-2"
            >
              Show QR Code
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center">
          <p className="text-slate-500 text-sm mb-4">You have no active helmet deposit.</p>
          <button
            onClick={() => navigate('/deposit')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm"
          >
            <Plus size={18} />
            Deposit Now
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        <ActionButton
          icon={<Plus className="text-primary" />}
          label="Deposit"
          onClick={() => navigate('/deposit')}
        />
        <ActionButton
          icon={<HistoryIcon className="text-secondary" />}
          label="History"
          onClick={() => navigate('/history')}
        />
        <ActionButton
          icon={<MapPin className="text-success" />}
          label="Racks"
          onClick={() => {}}
        />
        <ActionButton
          icon={<BellIcon className="text-warning" />}
          label="Inbox"
          onClick={() => navigate('/notifications')}
        />
      </div>

      {/* Recent Activity */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-slate-800">Recent Activity</h3>
          <button onClick={() => navigate('/history')} className="text-xs font-bold text-primary">View All</button>
        </div>

        <div className="space-y-3">
          {deposits.slice(0, 3).map((d) => (
            <div key={d.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                d.status === 'active' ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
              )}>
                <QrCode size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-800">{d.id}</span>
                  <span className="text-[10px] text-slate-400 font-medium">22 Jun</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{d.rackId} • 08:30 - 16:00</p>
              </div>
              <StatusBadge status={d.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2">
    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{label}</span>
  </button>
);

export default StudentDashboard;
