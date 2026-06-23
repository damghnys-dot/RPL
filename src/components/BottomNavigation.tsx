import React from 'react';
import { NavLink } from 'react-router';
import { Home, History, User, Bell, LayoutDashboard, ScanLine } from 'lucide-react';
import { cn } from '../utils/cn';

const BottomNavigation: React.FC = () => {
  // Use localStorage to determine the role consistently across all screens
  const role = localStorage.getItem('userRole') || 'student';

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';

  if (isAdmin) {
    return (
      <nav className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-slate-100 flex justify-around items-center h-16 px-2 z-40">
        <NavItem to="/admin" icon={<LayoutDashboard size={24} />} label="Admin" />
        <NavItem to="/notifications" icon={<Bell size={24} />} label="Inbox" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </nav>
    );
  }

  if (isStaff) {
    return (
      <nav className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-slate-100 flex justify-around items-center h-16 px-2 z-40">
        <NavItem to="/staff" icon={<Home size={24} />} label="Staff" />
        <NavItem to="/scanner" icon={<ScanLine size={24} />} label="Scanner" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-slate-100 flex justify-around items-center h-16 px-2 z-40">
      <NavItem to="/dashboard" icon={<Home size={24} />} label="Home" />
      <NavItem to="/history" icon={<History size={24} />} label="History" />
      <NavItem to="/notifications" icon={<Bell size={24} />} label="Inbox" />
      <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 flex-1 transition-colors duration-200",
          isActive ? "text-primary" : "text-slate-400"
        )
      }
    >
      <div className="relative">
        {icon}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </NavLink>
  );
};

export default BottomNavigation;
