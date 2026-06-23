import React from 'react';
import { cn } from '../utils/cn';

interface AvatarInitialsProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AvatarInitials: React.FC<AvatarInitialsProps> = ({ name, size = 'md', className }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={cn(
        'rounded-full bg-primary flex items-center justify-center text-white font-semibold',
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
};

export default AvatarInitials;
