import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Shield, Bell, Settings, LogOut, HelpCircle, FileText, User as UserIcon } from 'lucide-react';
import AvatarInitials from '../components/AvatarInitials';
import { users } from '../data/mockData';

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();

  // Get role from localStorage for demo persistence
  const role = localStorage.getItem('userRole') || 'student';

  // Select user based on role
  const user = users.find(u => u.role === role) || users[0];

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-primary pt-12 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center text-white relative">
          <AvatarInitials name={user.name} size="lg" className="border-4 border-white/20 mb-4 shadow-xl" />
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">
            {user.role === 'student' ? user.nim : user.email}
          </p>
          <span className="mt-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
            {user.role}
          </span>
        </div>
      </div>

      {/* Stats Container - Only show for students in this demo layout */}
      {user.role === 'student' && (
        <div className="px-6 -mt-12 mb-6 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 flex justify-around border border-slate-50">
            <StatItem label="Deposits" value="24" />
            <div className="w-px h-10 bg-slate-100 self-center"></div>
            <StatItem label="Hours" value="128" />
            <div className="w-px h-10 bg-slate-100 self-center"></div>
            <StatItem label="Rank" value="#12" />
          </div>
        </div>
      )}

      {/* Spacing if not student */}
      {user.role !== 'student' && <div className="h-6"></div>}

      {/* Menu Groups */}
      <div className="px-6 space-y-6 pb-8">
        <MenuGroup title="Account Settings">
          <MenuItem icon={<UserIcon size={18} className="text-primary" />} label="Edit Profile" />
          <MenuItem icon={<Shield size={18} className="text-success" />} label="Security & Privacy" />
          <MenuItem icon={<Bell size={18} className="text-warning" />} label="Notifications" />
        </MenuGroup>

        <MenuGroup title="Support">
          <MenuItem icon={<HelpCircle size={18} className="text-secondary" />} label="Help Center" />
          <MenuItem icon={<FileText size={18} className="text-slate-400" />} label="Terms of Service" />
        </MenuGroup>

        <button
          onClick={handleSignOut}
          className="w-full p-4 bg-danger/5 text-danger rounded-2xl flex items-center justify-between font-bold text-sm"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} />
            <span>Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-extrabold text-slate-800">{value}</span>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>
  </div>
);

const MenuGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1">{title}</h3>
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      {children}
    </div>
  </div>
);

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="w-full p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-300" />
  </button>
);

export default StudentProfile;
