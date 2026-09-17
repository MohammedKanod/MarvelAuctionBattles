import React, { useEffect } from 'react';
import { SoundManager } from '../../sound/SoundManager';

interface AuctionTimerProps {
  seconds: number;
}

export const AuctionTimer: React.FC<AuctionTimerProps> = ({ seconds }) => {
  const isUrgent = seconds <= 3 && seconds > 0;
  const isFinalSecond = seconds === 1;

  useEffect(() => {
    if (seconds > 0 && seconds <= 5) {
      SoundManager.playTick(isUrgent);
    }
  }, [seconds, isUrgent]);

  const formattedTime = `00:${seconds.toString().padStart(2, '0')}`;

  let bgClasses = 'bg-black text-white border-zinc-700';
  if (seconds <= 3 && seconds > 1) {
    bgClasses = 'bg-amber-500 text-black border-black animate-pulse-fast';
  } else if (isFinalSecond) {
    bgClasses = 'bg-comic-red text-white border-black scale-110 animate-bounce-short shadow-comic-red';
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
        AUCTION TIMER
      </span>
      <div
        className={`comic-border px-5 py-2 transition-all duration-200 flex items-center gap-2 ${bgClasses}`}
      >
        <span className="text-xl">⏱️</span>
        <span className="font-mono text-3xl font-black tracking-tight">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
