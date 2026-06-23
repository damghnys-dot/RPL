import React from 'react';
import { cn } from '../utils/cn';

interface InfoCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value, icon, trend, className }) => {
  return (
    <div className={cn('bg-white p-4 rounded-2xl shadow-sm border border-slate-100', className)}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</span>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        {trend && (
          <span className={cn('text-[10px] font-bold mb-1', trend.isUp ? 'text-success' : 'text-danger')}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
