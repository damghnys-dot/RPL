import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Shield, Bell, Settings, LogOut, HelpCircle, FileText, User as UserIcon, Moon, Sun } from 'lucide-react';
import AvatarInitials from '../components/AvatarInitials';
import { users } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Get role from localStorage for demo persistence
  const role = localStorage.getItem('userRole') || 'student';

  // Select user based on role
  const user = users.find(u => u.role === role) || users[0];

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className={cn(
      "flex-1 flex flex-col transition-colors duration-300",
      theme === 'dark' ? "bg-slate-900" : "bg-white"
    )}>
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

      {/* Stats Container */}
      {user.role === 'student' && (
        <div className="px-6 -mt-12 mb-6 relative z-10">
          <div className={cn(
            "rounded-3xl shadow-xl p-6 flex justify-around border transition-colors duration-300",
            theme === 'dark'
              ? "bg-slate-800 border-slate-700 shadow-black/20"
              : "bg-white border-slate-50 shadow-slate-200/50"
          )}>
            <StatItem label="Deposits" value="24" isDark={theme === 'dark'} />
            <div className={cn("w-px h-10 self-center", theme === 'dark' ? "bg-slate-700" : "bg-slate-100")}></div>
            <StatItem label="Hours" value="128" isDark={theme === 'dark'} />
            <div className={cn("w-px h-10 self-center", theme === 'dark' ? "bg-slate-700" : "bg-slate-100")}></div>
            <StatItem label="Rank" value="#12" isDark={theme === 'dark'} />
          </div>
        </div>
      )}

      {/* Spacing if not student */}
      {user.role !== 'student' && <div className="h-6"></div>}

      {/* Menu Groups */}
      <div className="px-6 space-y-6 pb-8">
        <MenuGroup title="Account Settings" isDark={theme === 'dark'}>
          <MenuItem
            icon={<UserIcon size={18} className="text-primary" />}
            label="Edit Profile"
            isDark={theme === 'dark'}
          />
          <MenuItem
            icon={theme === 'dark' ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-slate-600" />}
            label={theme === 'dark' ? "Light Mode" : "Dark Mode"}
            onClick={toggleTheme}
            isDark={theme === 'dark'}
          />
          <MenuItem
            icon={<Shield size={18} className="text-success" />}
            label="Security & Privacy"
            isDark={theme === 'dark'}
          />
        </MenuGroup>

        <MenuGroup title="Support" isDark={theme === 'dark'}>
          <MenuItem
            icon={<HelpCircle size={18} className="text-secondary" />}
            label="Help Center"
            isDark={theme === 'dark'}
          />
          <MenuItem
            icon={<FileText size={18} className="text-slate-400" />}
            label="Terms of Service"
            isDark={theme === 'dark'}
          />
        </MenuGroup>

        <button
          onClick={handleSignOut}
          className={cn(
            "w-full p-4 rounded-2xl flex items-center justify-between font-bold text-sm transition-colors",
            theme === 'dark' ? "bg-danger/10 text-danger" : "bg-danger/5 text-danger"
          )}
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

const StatItem = ({ label, value, isDark }: { label: string; value: string; isDark?: boolean }) => (
  <div className="flex flex-col items-center">
    <span className={cn("text-xl font-extrabold transition-colors", isDark ? "text-white" : "text-slate-800")}>{value}</span>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>
  </div>
);

const MenuGroup = ({ title, children, isDark }: { title: string; children: React.ReactNode; isDark?: boolean }) => (
  <div className="space-y-3">
    <h3 className={cn("text-[10px] font-extrabold uppercase tracking-[0.2em] ml-1 transition-colors", isDark ? "text-slate-500" : "text-slate-400")}>{title}</h3>
    <div className={cn(
      "rounded-3xl border overflow-hidden shadow-sm transition-colors duration-300",
      isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
    )}>
      {children}
    </div>
  </div>
);

const MenuItem = ({ icon, label, onClick, isDark }: { icon: React.ReactNode; label: string; onClick?: () => void; isDark?: boolean }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full p-4 flex items-center justify-between border-b last:border-0 transition-colors",
      isDark ? "border-slate-700 hover:bg-slate-700/50" : "border-slate-50 hover:bg-slate-50"
    )}
  >
    <div className="flex items-center gap-4">
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-colors", isDark ? "bg-slate-700" : "bg-slate-50")}>
        {icon}
      </div>
      <span className={cn("text-sm font-semibold transition-colors", isDark ? "text-slate-200" : "text-slate-700")}>{label}</span>
    </div>
    <ChevronRight size={16} className={isDark ? "text-slate-600" : "text-slate-300"} />
  </button>
);

export default StudentProfile;
