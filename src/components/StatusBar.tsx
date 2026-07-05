import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fake-status-bar h-7 px-4 flex justify-between items-center text-[12px] font-medium text-slate-700 bg-white sticky top-0 z-50">
      <div>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
      </div>
      <div className="flex items-center gap-1.5">
        <Signal size={14} fill="currentColor" />
        <Wifi size={14} />
        <Battery size={14} className="rotate-90" />
      </div>
    </div>
  );
};

export default StatusBar;
