import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-primary text-white p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="mb-6 bg-white/10 p-6 rounded-[2.5rem]"
      >
        <ShieldCheck size={80} className="text-white" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight">Smart Helm</h1>
        <p className="text-white/70 text-sm mt-2 font-medium tracking-widest uppercase">Parking System</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12"
      >
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
