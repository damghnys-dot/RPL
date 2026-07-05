import React from 'react';
import { NavLink } from 'react-router';
import { Home, History, User, Bell, LayoutDashboard, ScanLine } from 'lucide-react';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

interface BottomNavigationProps {
  isDarkScreen?: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ isDarkScreen }) => {
  const { theme } = useTheme();
  const role = localStorage.getItem('userRole') || 'student';
  const isDark = theme === 'dark' || isDarkScreen;

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';

  const navClasses = cn(
    "fixed bottom-0 w-full max-w-[430px] border-t flex justify-around items-center h-16 px-2 z-40 transition-colors duration-300",
    isDark
      ? "bg-slate-900 border-slate-800 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"
      : "bg-white border-slate-100"
  );

  const items = isAdmin ? [
    { to: "/admin", icon: <LayoutDashboard size={24} />, label: "Admin" },
    { to: "/notifications", icon: <Bell size={24} />, label: "Inbox" },
    { to: "/profile", icon: <User size={24} />, label: "Profile" },
  ] : isStaff ? [
    { to: "/staff", icon: <Home size={24} />, label: "Staff" },
    { to: "/scanner", icon: <ScanLine size={24} />, label: "Scanner" },
    { to: "/profile", icon: <User size={24} />, label: "Profile" },
  ] : [
    { to: "/dashboard", icon: <Home size={24} />, label: "Home" },
    { to: "/history", icon: <History size={24} />, label: "History" },
    { to: "/notifications", icon: <Bell size={24} />, label: "Inbox" },
    { to: "/profile", icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <nav className={navClasses}>
      {items.map((item) => (
        <NavItem key={item.to} {...item} isDark={isDark} />
      ))}
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isDark?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isDark }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 flex-1 transition-all duration-200",
          isActive
            ? "text-primary scale-110"
            : (isDark ? "text-slate-500" : "text-slate-400")
        )
      }
    >
      <div className="relative">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </NavLink>
  );
};

export default BottomNavigation;
