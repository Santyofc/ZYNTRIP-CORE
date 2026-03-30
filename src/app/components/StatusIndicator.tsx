import React from 'react';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'warning';
  label?: string;
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const colors = {
    active: 'bg-[#00FF88]',
    inactive: 'bg-gray-600',
    warning: 'bg-yellow-500',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
      {label && <span className="text-sm text-gray-400">{label}</span>}
    </div>
  );
}
