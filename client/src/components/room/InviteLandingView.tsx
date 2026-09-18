import React, { useState } from 'react';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import { Zap, Swords, AlertTriangle, ArrowLeft, Shield } from 'lucide-react';

export type InviteErrorType = 'NOT_FOUND' | 'FULL' | 'STARTED' | 'GENERIC' | null;

interface InviteLandingViewProps {
  roomCode: string;
  onJoin: (roomCode: string, playerName: string) => void;
  onBackToHome: () => void;
  errorType?: InviteErrorType;
  errorMessage?: string;
  isJoining?: boolean;
}

export const InviteLandingView: React.FC<InviteLandingViewProps> = ({
  roomCode,
  onJoin,
  onBackToHome,
  errorType = null,
  errorMessage = '',
  isJoining = false
}) => {
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('last_player_name') || '';
  });
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setLocalError('Please enter your superhero commander name');
      return;
    }
    setLocalError('');
    localStorage.setItem('last_player_name', playerName.trim());
    SoundManager.playClick();
    onJoin(roomCode.toUpperCase().trim(), playerName.trim());
  };

  const getErrorTitle = (type: InviteErrorType) => {
    switch (type) {
      case 'NOT_FOUND':
        return 'ROOM NOT FOUND';
      case 'FULL':
        return 'ROOM FULL';
      case 'STARTED':
        return 'BATTLE ALREADY STARTED';
      default:
        return 'UNABLE TO JOIN BATTLE';
    }
  };

  const getErrorDescription = (type: InviteErrorType) => {
    switch (type) {
      case 'NOT_FOUND':
        return `Room code "${roomCode}" does not exist, was typed incorrectly, or has expired.`;
      case 'FULL':
        return `Room "${roomCode}" has reached maximum commander capacity.`;
      case 'STARTED':
        return `The heroes in Room "${roomCode}" have already commenced battle. Matches in progress cannot accept new combatants.`;
      default:
        return errorMessage || `Could not connect to room "${roomCode}". Please verify your connection.`;
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-center items-center p-4 sm:p-6 bg-dot-matrix select-none">
      
      {/* Top Background Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-red-600/15 to-transparent pointer-events-none" />

      {/* Main Invite Card Container */}
      <div className="relative z-10 w-full max-w-md bg-comic-panel comic-border-xl p-6 sm:p-8 text-white overflow-hidden shadow-2xl animate-pop-in">
        
        {/* Halftone Texture Overlay */}
        <div className="absolute inset-0 bg-halftone opacity-15 pointer-events-none" />

        {/* --- ERROR STATE --- */}
        {errorType ? (
          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-red-950/80 border-3 border-comic-red flex items-center justify-center text-comic-red shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-block bg-comic-red text-white text-xs font-black uppercase px-2.5 py-0.5 border border-black mb-2 shadow-comic-sm">
                BATTLE ACCESS DENIED
              </div>
              <h2 className="comic-font text-3xl sm:text-4xl text-white tracking-wide uppercase">
                {getErrorTitle(errorType)}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed mt-2 max-w-xs mx-auto">
                {getErrorDescription(errorType)}
              </p>
            </div>

            <div className="w-full pt-2">
              <ComicButton
                variant="yellow"
                size="lg"
                onClick={() => {
                  SoundManager.playClick();
                  onBackToHome();
                }}
                className="w-full"
              >
                <ArrowLeft className="w-5 h-5 mr-1" /> BACK TO GAME
              </ComicButton>
            </div>
          </div>
        ) : (
          /* --- NORMAL JOIN INVITE STATE --- */
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Top Tagline Ribbon */}
            <div className="inline-block mb-3">
              <div className="comic-ribbon bg-comic-yellow border-3 border-black px-4 py-1 shadow-comic-sm">
                <span className="comic-ribbon-content comic-font text-base sm:text-lg text-black tracking-wider uppercase">
                  YOU'VE BEEN INVITED TO A BATTLE
                </span>
              </div>
            </div>

            {/* Room Code Showcase Box */}
            <div className="bg-black/90 comic-border px-6 py-3 my-3 text-center w-full shadow-comic-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">
                TARGET BATTLE SECTOR
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-black text-amber-400">ROOM:</span>
                <span className="comic-font text-3xl sm:text-4xl text-white tracking-widest font-mono">
                  {roomCode}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 font-medium mb-5">
              Enter your commander alias below to drop straight into the live superhero auction & tournament lobby.
            </p>

            {/* Join Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
              {localError && (
                <div className="bg-comic-red border-2 border-black p-2.5 text-white text-xs font-bold shadow-comic-sm">
                  ⚠️ {localError}
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
                  YOUR COMMANDER NAME
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="e.g. IronMan, Wolverine, Batman"
                  maxLength={18}
                  disabled={isJoining}
                  autoFocus
                  className="w-full bg-black border-3 border-black text-white font-bold p-3 text-base focus:outline-none focus:border-comic-yellow focus:ring-1 focus:ring-comic-yellow shadow-comic-sm placeholder-zinc-600"
                />
              </div>

              <div className="pt-2">
                <ComicButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isJoining}
                  className="w-full"
                >
                  <Swords className="w-5 h-5 mr-1" />
                  {isJoining ? 'CONNECTING TO BATTLE...' : 'JOIN BATTLE'}
                </ComicButton>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    SoundManager.playClick();
                    onBackToHome();
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  ← BACK TO MAIN MENU
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-4 text-center">
        <span className="comic-font text-lg text-zinc-500 tracking-wider uppercase">
          MARVEL & DC BATTLE AUCTION
        </span>
      </div>
    </div>
  );
};
