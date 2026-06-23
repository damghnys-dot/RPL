import React from 'react';
import { cn } from '../utils/cn';

interface StatusBadgeProps {
  status: 'active' | 'completed' | 'pending' | 'available' | 'full' | 'maintenance';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusStyles = {
    active: 'bg-success/10 text-success border-success/20',
    completed: 'bg-slate-100 text-slate-500 border-slate-200',
    pending: 'bg-warning/10 text-warning border-warning/20',
    available: 'bg-success/10 text-success border-success/20',
    full: 'bg-danger/10 text-danger border-danger/20',
    maintenance: 'bg-warning/10 text-warning border-warning/20',
  };

  const labels = {
    active: 'Aktif',
    completed: 'Selesai',
    pending: 'Pending',
    available: 'Tersedia',
    full: 'Penuh',
    maintenance: 'Perbaikan',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider',
        statusStyles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
