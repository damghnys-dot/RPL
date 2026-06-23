import React from 'react';
import StatusBar from './StatusBar';
import BottomNavigation from './BottomNavigation';
import { useLocation } from 'react-router';

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const location = useLocation();
  const hideNavPaths = ['/', '/login', '/scanner', '/qr-code'];
  const shouldHideNav = hideNavPaths.some(path =>
    location.pathname === path || location.pathname.startsWith('/qr-code/')
  );

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-2xl relative flex flex-col overflow-x-hidden">
        <StatusBar />
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
        {!shouldHideNav && <BottomNavigation />}
      </div>
    </div>
  );
};

export default MobileContainer;
