import React from 'react';
import StatusBar from './StatusBar';
import BottomNavigation from './BottomNavigation';
import { useLocation } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();

  const hideNavPaths = ['/', '/login', '/scanner', '/qr-code'];
  const isScanner = location.pathname === '/scanner';
  const shouldHideNav = hideNavPaths.some(path =>
    location.pathname === path || location.pathname.startsWith('/qr-code/')
  );

  // Check if current screen has a specific background color
  const isDarkScreen = location.pathname === '/admin/logs';

  return (
    <div className={cn(
      "min-h-dvh transition-colors duration-300 flex justify-center",
      isScanner ? "bg-transparent" : (theme === 'dark' ? "bg-slate-950" : "bg-slate-100")
    )}>
      <div className={cn(
        "w-full max-w-[430px] min-h-dvh relative flex flex-col transition-colors duration-300",
        isScanner ? "bg-transparent" : (isDarkScreen ? "bg-slate-900" : (theme === 'dark' ? "bg-slate-900" : "bg-white")),
        !isScanner && "shadow-2xl"
      )}>
        {!isScanner && <StatusBar />}
        <main className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden",
          !shouldHideNav && "pb-24", // Tambahkan padding bawah lebih banyak agar tidak tertutup Bottom Nav
          isScanner && "bg-transparent"
        )}>
          {children}
        </main>
        {!shouldHideNav && <BottomNavigation isDarkScreen={isDarkScreen} />}
      </div>
    </div>
  );
};

export default MobileContainer;
