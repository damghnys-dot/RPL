import React from 'react';
import { useNavigate } from 'react-router';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, LayoutGrid, AlertCircle, FileText, Settings } from 'lucide-react';
import { statistics, racks } from '../data/mockData';
import InfoCard from '../components/InfoCard';
import StatusBadge from '../components/StatusBadge';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "flex-1 flex flex-col p-6 space-y-6 transition-colors duration-300",
      isDark ? "bg-slate-900" : "bg-white"
    )}>
      <div className="flex justify-between items-center">
        <h2 className={cn("text-xl font-bold transition-colors", isDark ? "text-white" : "text-slate-800")}>Monitoring Real-Time</h2>
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
          isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-400"
        )}>
          <Settings size={20} />
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-4">
        <InfoCard
          label="Total Users"
          value={statistics.userStats.totalStudents}
          icon={<Users size={16} />}
          trend={{ value: 5, isUp: true }}
          isDark={isDark}
        />
        <InfoCard
          label="Total Racks"
          value={racks.length}
          icon={<LayoutGrid size={16} />}
          isDark={isDark}
        />
      </div>

      {/* Chart Section */}
      <div className={cn(
        "p-6 rounded-3xl border shadow-sm transition-colors duration-300",
        isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
      )}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={cn("text-sm font-bold transition-colors", isDark ? "text-slate-200" : "text-slate-800")}>Weekly Traffic</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Last 7 Days</span>
        </div>

        <div className="h-48 w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={statistics.weeklyDeposits}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#F1F5F9"} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                  color: isDark ? '#F8FAFC' : '#1E293B'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1E3A8A' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#1E3A8A"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rack Status */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className={cn("text-sm font-bold transition-colors", isDark ? "text-slate-200" : "text-slate-800")}>Rack Status</h3>
          <button className="text-xs font-bold text-primary">Details</button>
        </div>

        <div className="space-y-3">
          {racks.map((r) => (
            <div key={r.id} className={cn(
              "p-4 rounded-2xl border flex items-center justify-between transition-colors",
              isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
            )}>
              <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${r.status === 'full' ? 'bg-danger' : 'bg-success'}`}></div>
                <div>
                  <p className={cn("text-xs font-bold transition-colors", isDark ? "text-slate-200" : "text-slate-800")}>{r.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{r.totalSlots - r.availableSlots}/{r.totalSlots} Slots Used</p>
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        <button
          onClick={() => navigate('/admin/reports')}
          className={cn(
            "p-4 rounded-2xl border flex items-center gap-3 shadow-sm active:scale-95 transition-all",
            isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
          )}
        >
          <div className="text-slate-400"><FileText size={18} /></div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-tight text-left transition-colors",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>Pengelolaan Laporan</span>
        </button>
        <button
          onClick={() => navigate('/history')}
          className={cn(
            "p-4 rounded-2xl border flex items-center gap-3 shadow-sm active:scale-95 transition-all",
            isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
          )}
        >
          <div className="text-slate-400"><AlertCircle size={18} /></div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-tight text-left transition-colors",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>Riwayat</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
