import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Download, FileSpreadsheet, FileText, Calendar, Filter, ArrowUpRight } from 'lucide-react';
import { deposits } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion } from 'motion/react';

const AdminReports: React.FC = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = (type: 'pdf' | 'excel') => {
    setIsExporting(type);
    setTimeout(() => {
      setIsExporting(null);
      alert(`Report successfully generated and downloaded as ${type.toUpperCase()}`);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="p-6 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-xl text-slate-600">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-slate-800">System Reports</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold whitespace-nowrap">Monthly Overview</button>
          <button className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-100">Rack Usage</button>
          <button className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-100">User Activity</button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Export Options */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleExport('pdf')}
            disabled={!!isExporting}
            className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col items-center gap-3 shadow-sm hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 bg-danger/10 text-danger rounded-xl flex items-center justify-center">
              {isExporting === 'pdf' ? <div className="w-5 h-5 border-2 border-danger border-t-transparent rounded-full animate-spin"></div> : <FileText size={24} />}
            </div>
            <span className="text-xs font-bold text-slate-700">Export PDF</span>
          </button>

          <button
            onClick={() => handleExport('excel')}
            disabled={!!isExporting}
            className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col items-center gap-3 shadow-sm hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center">
              {isExporting === 'excel' ? <div className="w-5 h-5 border-2 border-success border-t-transparent rounded-full animate-spin"></div> : <FileSpreadsheet size={24} />}
            </div>
            <span className="text-xs font-bold text-slate-700">Export Excel</span>
          </button>
        </div>

        {/* Detailed Data Table Preview */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-800">Data Preview</h3>
            <div className="flex gap-2">
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400"><Calendar size={14} /></button>
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400"><Filter size={14} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-slate-50">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rack</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deposits.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 text-[11px] font-bold text-slate-800">{d.id}</td>
                    <td className="px-4 py-4">
                      <p className="text-[11px] font-bold text-slate-700 truncate max-w-[80px]">{d.studentName}</p>
                      <p className="text-[9px] text-slate-400">{d.studentNim}</p>
                    </td>
                    <td className="px-4 py-4 text-[11px] font-medium text-slate-500">{d.rackId}</td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                        d.status === 'active' ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400"
                      )}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-50 text-center">
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1 mx-auto">
              Load More Data
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        {/* Summary Widgets */}
        <div className="space-y-3">
          <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Total Transaction</p>
              <h4 className="text-xl font-bold text-primary">1,284</h4>
            </div>
            <div className="text-primary/20"><Download size={32} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
