import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import PageTransition from '../components/PageTransition';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import StudentDashboard from '../screens/StudentDashboard';
import DepositHelmet from '../screens/DepositHelmet';
import QRCodeScreen from '../screens/QRCodeScreen';
import DepositHistory from '../screens/DepositHistory';
import StudentProfile from '../screens/StudentProfile';
import StaffDashboard from '../screens/StaffDashboard';
import StaffScanner from '../screens/StaffScanner';
import AdminDashboard from '../screens/AdminDashboard';
import NotificationsScreen from '../screens/NotificationsScreen';
import AdminReports from '../screens/AdminReports';
import SystemLogs from '../screens/SystemLogs';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><SplashScreen /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginScreen /></PageTransition>} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<PageTransition><StudentDashboard /></PageTransition>} />
        <Route path="/deposit" element={<PageTransition><DepositHelmet /></PageTransition>} />
        <Route path="/qr-code/:depositId" element={<PageTransition><QRCodeScreen /></PageTransition>} />
        <Route path="/history" element={<PageTransition><DepositHistory /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><StudentProfile /></PageTransition>} />
        <Route path="/notifications" element={<PageTransition><NotificationsScreen /></PageTransition>} />

        {/* Staff Routes */}
        <Route path="/staff" element={<PageTransition><StaffDashboard /></PageTransition>} />
        <Route path="/scanner" element={<PageTransition><StaffScanner /></PageTransition>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/admin/reports" element={<PageTransition><AdminReports /></PageTransition>} />
        <Route path="/admin/logs" element={<PageTransition><SystemLogs /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
