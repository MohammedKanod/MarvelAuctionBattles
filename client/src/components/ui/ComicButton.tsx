import React from 'react';
import { SoundManager } from '../../sound/SoundManager';

interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'yellow' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  soundOnClick?: boolean;
}

export const ComicButton: React.FC<ComicButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  soundOnClick = true,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundOnClick && !disabled) {
      SoundManager.playClick();
    }
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary: 'bg-comic-red text-white hover:bg-red-600',
    secondary: 'bg-comic-panel text-white hover:bg-zinc-800 border-zinc-700',
    yellow: 'bg-comic-yellow text-black hover:bg-yellow-400 font-extrabold',
    danger: 'bg-red-700 text-white hover:bg-red-800',
    dark: 'bg-black text-white hover:bg-zinc-900 border-zinc-700'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm font-bold',
    md: 'px-5 py-2.5 text-base font-bold',
    lg: 'px-7 py-3.5 text-xl comic-font tracking-wide',
    xl: 'px-9 py-4 text-2xl comic-font tracking-wider'
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`comic-btn uppercase rounded-none transition-all flex items-center justify-center gap-2 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
