import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Bell, MoreHorizontal, CheckCheck } from 'lucide-react';
import { notifications } from '../data/mockData';
import { cn } from '../utils/cn';

const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-slate-800">Notifications</h2>
          </div>
          <button className="p-2 text-slate-400">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <button className="flex items-center gap-2 text-primary font-bold text-xs bg-primary/5 px-4 py-2 rounded-xl">
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="flex-1 px-6 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              "p-4 rounded-2xl border transition-all flex gap-4",
              n.isRead ? "bg-white border-slate-100" : "bg-primary/5 border-primary/10 ring-1 ring-primary/5"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              n.isRead ? "bg-slate-50 text-slate-400" : "bg-primary text-white"
            )}>
              <Bell size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={cn("text-xs font-bold", n.isRead ? "text-slate-600" : "text-slate-800")}>{n.title}</h3>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">{n.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{n.message}</p>
            </div>
            {!n.isRead && (
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            )}
          </div>
        ))}

        <div className="py-10 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No more notifications</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
