import React from 'react';
import { ComicButton } from '../ui/ComicButton';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      title: 'ASSEMBLE YOUR CREW',
      desc: 'Create a private room for 2 to 6 players and share the unique 6-character room code with friends.',
      icon: '👥'
    },
    {
      step: '02',
      title: 'BANKROLL YOUR WAR CHEST',
      desc: 'Every player starts with equal coins (1,000 to 2,000 🪙). Manage your treasury wisely!',
      icon: '🪙'
    },
    {
      step: '03',
      title: 'LIVE CHARACTER AUCTION',
      desc: 'Marvel heroes appear one by one on the auction block. Compete in real-time with anti-sniping rules.',
      icon: '🔨'
    },
    {
      step: '04',
      title: 'BID OR BE OUTBID',
      desc: 'Increase bids in increments of 50 or 100 🪙. When the clock hits zero, highest bidder takes the hero!',
      icon: '⚡'
    },
    {
      step: '05',
      title: 'TACTICAL TEAM BUILDING',
      desc: 'Organize your acquired heroes into a combat lineup: Strikers, Tanks, Blasters, Tacticians, Speedsters, and Sorcerers.',
      icon: '🛡️'
    },
    {
      step: '06',
      title: 'MULTI-FACTOR ARENA BATTLES',
      desc: 'Bouts are decided not just by raw power, but by matchups, range, tactical intellect, speed blitzes, and iconic counters!',
      icon: '⚔️'
    },
    {
      step: '07',
      title: 'TOURNAMENT CROWNING',
      desc: 'Progress through semifinals to the Grand Championship Final. Total power breaks deadlocks to crown the victor!',
      icon: '🏆'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-comic-panel comic-border-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-pop-in">
        {/* Modal Header */}
        <div className="bg-comic-red p-4 border-b-4 border-black flex justify-between items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-black bg-comic-yellow px-2 py-0.5 border border-black">
              RULES OF ENGAGEMENT
            </span>
            <h2 className="comic-font text-3xl text-white tracking-wide mt-1">
              HOW TO PLAY
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-black text-white font-black text-xl hover:bg-zinc-800 border-2 border-black flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-black/60 comic-border p-3.5 flex items-start gap-4 hover:border-comic-yellow transition-all"
            >
              <div className="w-12 h-12 bg-comic-yellow border-2 border-black flex-shrink-0 flex items-center justify-center text-2xl rotate-[-4deg] shadow-comic-sm">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black bg-comic-red text-white px-1.5 py-0.2">
                    STEP {s.step}
                  </span>
                  <h4 className="comic-font text-xl text-white tracking-wide">
                    {s.title}
                  </h4>
                </div>
                <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black border-t-3 border-black flex justify-end">
          <ComicButton variant="yellow" size="md" onClick={onClose}>
            GOT IT, LET'S BATTLE!
          </ComicButton>
        </div>
      </div>
    </div>
  );
};
