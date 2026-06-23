import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Terminal, Shield, User, Database, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

interface LogEntry {
  id: string;
  type: 'auth' | 'system' | 'action' | 'error';
  message: string;
  user: string;
  timestamp: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', type: 'auth', message: 'Staff Sarah logged in successfully', user: 'Sarah W.', timestamp: '2026-06-23 09:15:22' },
  { id: '2', type: 'action', message: 'Deposit D-10293 retrieved by staff', user: 'Sarah W.', timestamp: '2026-06-23 09:12:05' },
  { id: '3', type: 'system', message: 'Rack A-02 status changed to FULL', user: 'System', timestamp: '2026-06-23 08:45:00' },
  { id: '4', type: 'error', message: 'Invalid QR scan attempt detected', user: 'Guest', timestamp: '2026-06-23 08:32:11' },
  { id: '5', type: 'auth', message: 'New student registered: Ahmad Fauzi', user: 'System', timestamp: '2026-06-22 16:20:45' },
  { id: '6', type: 'action', message: 'Admin modified Rack B-01 capacity', user: 'Admin Utama', timestamp: '2026-06-22 14:10:00' },
];

const SystemLogs: React.FC = () => {
  const navigate = useNavigate();

  const getTypeIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'auth': return <Shield size={16} className="text-secondary" />;
      case 'system': return <Database size={16} className="text-primary" />;
      case 'action': return <User size={16} className="text-success" />;
      case 'error': return <AlertTriangle size={16} className="text-danger" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 min-h-screen text-slate-300">
      {/* Header */}
      <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-slate-700/50 rounded-xl text-slate-300">
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white">System Logs</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Stream</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Terminal Header */}
        <div className="bg-slate-800 p-3 rounded-t-xl border-x border-t border-slate-700 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-warning/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-success/50"></div>
          <span className="text-[9px] font-mono text-slate-500 ml-2">root@smarthelm:/var/log/parking.log</span>
        </div>

        {/* Logs List */}
        <div className="bg-slate-800/30 border-x border-b border-slate-700 rounded-b-xl overflow-hidden divide-y divide-slate-700/50 font-mono">
          {mockLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    log.type === 'error' ? "bg-danger/10" : "bg-slate-700/50"
                  )}>
                    {getTypeIcon(log.type)}
                  </div>
                  <div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      log.type === 'error' ? "text-danger" : "text-slate-500"
                    )}>
                      {log.type}
                    </span>
                    <p className="text-[11px] text-white/90 leading-tight mt-0.5">{log.message}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-[9px] text-slate-500">
                    <Clock size={10} />
                    {log.timestamp.split(' ')[1]}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/30">
                <span className="text-[9px] text-slate-500">USER:</span>
                <span className="text-[9px] text-primary font-bold">{log.user}</span>
                <span className="text-[9px] text-slate-600 ml-auto">{log.timestamp.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center p-8 gap-3 opacity-30">
          <Terminal size={16} />
          <span className="text-[10px] font-mono tracking-widest uppercase">End of log stream</span>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
