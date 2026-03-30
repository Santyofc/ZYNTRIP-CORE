import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'lg',
  children, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const sizeStyles = {
    sm: 'py-2.5 px-4 rounded-xl text-sm',
    md: 'py-3 px-5 rounded-xl text-base',
    lg: 'py-4 px-6 rounded-2xl text-base w-full',
  };
  
  const variantStyles = {
    primary: 'bg-[#00FF88] text-black hover:bg-[#00E67A] shadow-lg shadow-[#00FF88]/20 active:shadow-[#00FF88]/40',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-800',
    outline: 'bg-transparent text-white hover:bg-gray-900 border-2 border-gray-700 hover:border-gray-600',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-900',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
