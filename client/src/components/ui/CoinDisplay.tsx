import React from 'react';

interface CoinDisplayProps {
  amount: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({
  amount,
  label = 'COINS',
  size = 'md'
}) => {
  const sizeStyles = {
    sm: 'text-sm px-2.5 py-1',
    md: 'text-base px-3.5 py-1.5',
    lg: 'text-xl px-5 py-2 font-black'
  };

  return (
    <div className={`comic-border bg-black text-comic-yellow inline-flex items-center gap-2 font-mono ${sizeStyles[size]}`}>
      <span className="text-lg">🪙</span>
      <span className="font-extrabold tracking-tight text-white">
        {amount.toLocaleString()}
      </span>
      {label && (
        <span className="text-xs font-bold uppercase tracking-wider text-comic-yellow">
          {label}
        </span>
      )}
    </div>
  );
};
