import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-gray-900 text-white rounded-2xl py-4 px-4 ${
          icon ? 'pl-12' : ''
        } border border-gray-800 focus:border-[#00FF88] focus:outline-none transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
