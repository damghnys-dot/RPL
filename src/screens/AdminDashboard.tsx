import React from 'react';
import { useNavigate } from 'react-router';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, LayoutGrid, AlertCircle, FileText, Settings } from 'lucide-react';
import { statistics, racks } from '../data/mockData';
import InfoCard from '../components/InfoCard';
import StatusBadge from '../components/StatusBadge';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Admin Console</h2>
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
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
        />
        <InfoCard
          label="Total Racks"
          value={racks.length}
          icon={<LayoutGrid size={16} />}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-slate-800">Weekly Traffic</h3>
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
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
          <h3 className="text-sm font-bold text-slate-800">Rack Status</h3>
          <button className="text-xs font-bold text-primary">Details</button>
        </div>

        <div className="space-y-3">
          {racks.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${r.status === 'full' ? 'bg-danger' : 'bg-success'}`}></div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{r.name}</p>
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
          className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm active:scale-95 transition-all"
        >
          <div className="text-slate-400"><FileText size={18} /></div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight text-left">Reports & Export</span>
        </button>
        <button
          onClick={() => navigate('/admin/logs')}
          className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm active:scale-95 transition-all"
        >
          <div className="text-slate-400"><AlertCircle size={18} /></div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight text-left">System Logs</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
