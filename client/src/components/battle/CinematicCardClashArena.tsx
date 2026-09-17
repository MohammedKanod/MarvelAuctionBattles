import React, { useState, useEffect, useRef } from 'react';
import { BattleBout, RoomState } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import confetti from 'canvas-confetti';
import { FastForward, Swords, Trophy, ArrowRight } from 'lucide-react';

interface CinematicCardClashArenaProps {
  bout: BattleBout;
  room: RoomState;
  selfPlayerId: string;
  onNextBout: () => void;
}

type FightPhase = 
  | 'STAREDOWN'
  | 'CHARGE'
  | 'COLLISION_1'
  | 'RECOIL'
  | 'COLLISION_2'
  | 'POWER_MOMENT'
  | 'WINNER_REVEAL';

export const CinematicCardClashArena: React.FC<CinematicCardClashArenaProps> = ({
  bout,
  room,
  selfPlayerId,
  onNextBout
}) => {
  const [phase, setPhase] = useState<FightPhase>('STAREDOWN');
  const [skipped, setSkipped] = useState<boolean>(false);
  const isHost = room.hostId === selfPlayerId;

  const char1IsWinner = bout.winnerId === bout.player1Id;

  // Sound and fight progression timers
  useEffect(() => {
    if (skipped) return;

    // Phase 1: Staredown
    setPhase('STAREDOWN');

    // Phase 2: Charge (at 1000ms)
    const tCharge = setTimeout(() => {
      setPhase('CHARGE');
      SoundManager.playBattleClash();
    }, 1000);

    // Phase 3: Collision 1 (at 2000ms)
    const tCol1 = setTimeout(() => {
      setPhase('COLLISION_1');
      SoundManager.playBattleClash();
    }, 2000);

    // Phase 4: Recoil & Collision 2 (at 2800ms)
    const tCol2 = setTimeout(() => {
      setPhase('COLLISION_2');
      SoundManager.playBattleClash();
    }, 2800);

    // Phase 5: Power Moment (at 3500ms)
    const tPower = setTimeout(() => {
      setPhase('POWER_MOMENT');
      SoundManager.playGavel();
    }, 3500);

    // Phase 6: Winner Reveal (at 4300ms)
    const tWinner = setTimeout(() => {
      setPhase('WINNER_REVEAL');
      SoundManager.playVictory();
      if (bout.winnerId === selfPlayerId) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 }
        });
      }
    }, 4300);

    return () => {
      clearTimeout(tCharge);
      clearTimeout(tCol1);
      clearTimeout(tCol2);
      clearTimeout(tPower);
      clearTimeout(tWinner);
    };
  }, [bout.id, skipped, selfPlayerId]);

  const handleSkip = () => {
    setSkipped(true);
    setPhase('WINNER_REVEAL');
    SoundManager.playVictory();
  };

  // Dynamic transforms based on battle phase
  const getCardTransform = (isCard1: boolean) => {
    if (phase === 'STAREDOWN') {
      return isCard1 ? 'translate-x-0' : 'translate-x-0';
    }
    if (phase === 'CHARGE') {
      return 'animate-shake scale-105';
    }
    if (phase === 'COLLISION_1' || phase === 'COLLISION_2') {
      return isCard1 
        ? 'translate-x-4 sm:translate-x-8 rotate-3 scale-110' 
        : '-translate-x-4 sm:-translate-x-8 -rotate-3 scale-110';
    }
    if (phase === 'POWER_MOMENT') {
      if (char1IsWinner) {
        return isCard1 ? 'translate-x-6 scale-115 z-20' : 'translate-x-12 opacity-60 -rotate-6 scale-90';
      } else {
        return !isCard1 ? '-translate-x-6 scale-115 z-20' : '-translate-x-12 opacity-60 rotate-6 scale-90';
      }
    }
    if (phase === 'WINNER_REVEAL') {
      if (char1IsWinner) {
        return isCard1 
          ? 'scale-110 z-20 ring-4 ring-comic-yellow shadow-comic-yellow' 
          : 'scale-90 opacity-40 grayscale translate-y-3';
      } else {
        return !isCard1 
          ? 'scale-110 z-20 ring-4 ring-comic-yellow shadow-comic-yellow' 
          : 'scale-90 opacity-40 grayscale translate-y-3';
      }
    }
    return '';
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-lg mx-auto w-full px-3 py-2 sm:py-4 overflow-hidden">
      {/* 1. TOP BAR: Matchup Title & Skip */}
      <div className="flex justify-between items-center bg-black comic-border p-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-comic-red text-white comic-font text-base px-2 py-0.5 border border-black">
            ARENA BOUT
          </span>
          <span className="text-xs font-bold text-zinc-400 truncate max-w-[150px]">
            {bout.player1Name} VS {bout.player2Name}
          </span>
        </div>

        {phase !== 'WINNER_REVEAL' && (
          <button
            onClick={handleSkip}
            className="comic-btn bg-zinc-800 hover:bg-zinc-700 text-comic-yellow px-2.5 py-1 text-xs flex items-center gap-1"
          >
            <FastForward className="w-3.5 h-3.5" /> SKIP
          </button>
        )}
      </div>

      {/* 2. PERSISTENT SCORES CHIPS */}
      <div className="flex justify-around items-center bg-zinc-950 border border-zinc-800 p-2 text-xs font-bold mb-2">
        <div className="text-center truncate max-w-[120px]">
          <span className="text-zinc-400 block truncate">{bout.player1Name}</span>
          <span className="comic-font text-lg text-comic-yellow">
            {room.players.find(p => p.id === bout.player1Id)?.wins || 0} WINS
          </span>
        </div>
        <div className="comic-font text-lg text-comic-red">VS</div>
        <div className="text-center truncate max-w-[120px]">
          <span className="text-zinc-400 block truncate">{bout.player2Name}</span>
          <span className="comic-font text-lg text-comic-yellow">
            {room.players.find(p => p.id === bout.player2Id)?.wins || 0} WINS
          </span>
        </div>
      </div>

      {/* 3. CENTER: PHYSICAL CARD CLASH ARENA */}
      <div className="relative flex-1 flex items-center justify-center min-h-[360px] sm:min-h-[420px] my-1">
        {/* Comic Action Lines on Collision */}
        {(phase === 'COLLISION_1' || phase === 'COLLISION_2' || phase === 'POWER_MOMENT') && (
          <div className="absolute inset-0 action-lines opacity-40 pointer-events-none" />
        )}

        {/* Dynamic Cards Container */}
        <div className="relative flex items-center justify-center gap-2 sm:gap-4 w-full">
          {/* Card 1 */}
          <div className={`transition-all duration-200 transform ${getCardTransform(true)}`}>
            <div className="text-center mb-1">
              <span className="text-[10px] font-black uppercase text-zinc-400 bg-black/80 px-2 py-0.5 border border-zinc-700 truncate max-w-[110px] inline-block">
                {bout.player1Name}
              </span>
            </div>
            <ComicCard
              character={bout.char1}
              size="sm"
              isWinning={phase === 'WINNER_REVEAL' && char1IsWinner}
              isDefeated={phase === 'WINNER_REVEAL' && !char1IsWinner}
              className="sm:w-44 sm:h-64"
            />
          </div>

          {/* Central Clash Burst / VS Badge */}
          <div className="z-30 flex flex-col items-center justify-center">
            {phase === 'COLLISION_1' || phase === 'COLLISION_2' ? (
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-comic-red border-3 border-black flex items-center justify-center rotate-[-12deg] shadow-comic-xl animate-ping">
                <span className="comic-font text-2xl text-comic-yellow">POW!</span>
              </div>
            ) : phase === 'WINNER_REVEAL' ? (
              <div className="w-12 h-12 bg-comic-yellow border-3 border-black flex items-center justify-center rotate-6 shadow-comic-sm">
                <Trophy className="w-7 h-7 text-black" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-black border-2 border-zinc-700 flex items-center justify-center rotate-[-4deg]">
                <span className="comic-font text-xl text-comic-yellow">VS</span>
              </div>
            )}
          </div>

          {/* Card 2 */}
          <div className={`transition-all duration-200 transform ${getCardTransform(false)}`}>
            <div className="text-center mb-1">
              <span className="text-[10px] font-black uppercase text-zinc-400 bg-black/80 px-2 py-0.5 border border-zinc-700 truncate max-w-[110px] inline-block">
                {bout.player2Name}
              </span>
            </div>
            <ComicCard
              character={bout.char2}
              size="sm"
              isWinning={phase === 'WINNER_REVEAL' && !char1IsWinner}
              isDefeated={phase === 'WINNER_REVEAL' && char1IsWinner}
              className="sm:w-44 sm:h-64"
            />
          </div>
        </div>
      </div>

      {/* 4. RESULT BANNER & EXPLANATION */}
      {phase === 'WINNER_REVEAL' ? (
        <div className="bg-black comic-border p-3 animate-pop-in space-y-2">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="comic-ribbon bg-comic-red text-white text-xs font-black px-2 py-0.5 border border-black">
                WINNER
              </span>
              <span className="comic-font text-2xl text-comic-yellow">
                {bout.winnerName.toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-950 px-2 py-0.5 border border-green-700">
              +1 WIN
            </span>
          </div>

          {/* Concise Narrative Reason */}
          <p className="text-xs text-zinc-300 font-semibold leading-relaxed">
            "{bout.reason}"
          </p>

          {/* Next Battle Button */}
          <div className="pt-1">
            <ComicButton
              variant="yellow"
              size="lg"
              onClick={onNextBout}
              className="w-full text-xl py-3 shadow-comic-yellow"
            >
              NEXT BATTLE <ArrowRight className="w-5 h-5 ml-1" />
            </ComicButton>
          </div>
        </div>
      ) : (
        <div className="bg-black/60 comic-border p-2.5 text-center text-xs font-bold text-zinc-400">
          Clashing in the arena...
        </div>
      )}
    </div>
  );
};
