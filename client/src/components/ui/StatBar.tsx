import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue = 100,
  color = '#ffd100'
}) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between items-center text-xs font-black uppercase mb-1">
        <span className="text-zinc-300 tracking-wider">{label}</span>
        <span className="font-mono text-white bg-black px-1.5 py-0.5 border border-zinc-700">
          {value}
        </span>
      </div>
      <div className="w-full h-3 bg-zinc-900 border-2 border-black overflow-hidden relative">
        <div
          className="h-full transition-all duration-500 ease-out border-r-2 border-black"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};
