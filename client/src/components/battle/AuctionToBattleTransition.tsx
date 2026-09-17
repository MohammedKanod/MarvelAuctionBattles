import React, { useEffect, useState } from 'react';
import { SoundManager } from '../../sound/SoundManager';

export const AuctionToBattleTransition: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    SoundManager.playGavel();

    const t1 = setTimeout(() => {
      setStep(2);
      SoundManager.playCharacterReveal();
    }, 1200);

    const t2 = setTimeout(() => {
      setStep(3);
      SoundManager.playBattleClash();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background action lines */}
      <div className="absolute inset-0 action-lines opacity-40 pointer-events-none" />

      {step >= 1 && (
        <div className="animate-pop-in mb-4">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-black bg-comic-yellow px-3 py-1 border-2 border-black">
            PHASE 01 CONCLUDED
          </span>
          <h2 className="comic-font text-5xl sm:text-6xl text-white tracking-wide mt-2">
            AUCTION COMPLETE
          </h2>
        </div>
      )}

      {step >= 2 && (
        <div className="animate-pop-in mb-6">
          <p className="comic-font text-2xl sm:text-3xl text-zinc-300 tracking-wider">
            THE TEAMS ARE READY.
          </p>
        </div>
      )}

      {step >= 3 && (
        <div className="animate-pop-in">
          <div className="comic-ribbon bg-comic-red border-4 border-black p-4 rotate-[-4deg] shadow-comic-xl">
            <span className="comic-ribbon-content comic-font text-5xl sm:text-7xl text-comic-yellow tracking-wider animate-bounce-short">
              LET THE BATTLES BEGIN! 🔥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
