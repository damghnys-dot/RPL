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
  isDark?: boolean;
  onClick?: () => void | Promise<void>;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value, icon, trend, className, isDark, onClick }) => {
  const CardWrapper = onClick ? 'button' : 'div';

  return (
    <CardWrapper
      onClick={onClick}
      className={cn(
        'p-4 rounded-2xl shadow-sm border transition-colors duration-300 text-left w-full',
        isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100",
        onClick && "active:scale-95",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{label}</span>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <span className={cn("text-2xl font-bold transition-colors", isDark ? "text-white" : "text-slate-800")}>{value}</span>
        {trend && (
          <span className={cn('text-[10px] font-bold mb-1', trend.isUp ? 'text-success' : 'text-danger')}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
    </CardWrapper>
  );
};

export default InfoCard;
