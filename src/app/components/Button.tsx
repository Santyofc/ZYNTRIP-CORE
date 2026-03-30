import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-200 active:scale-95';
  const variantStyles = {
    primary: 'bg-[#00FF88] text-black hover:bg-[#00E67A] shadow-lg shadow-[#00FF88]/20',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
