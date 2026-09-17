import React, { useState, useEffect } from 'react';
import { BattleBout, RoomState } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { SoundManager } from '../../sound/SoundManager';
import confetti from 'canvas-confetti';
import { FastForward, Trophy, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

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
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const char1IsWinner = bout.winnerId === bout.player1Id;

  // Sound and fight progression timers (Cinematic Movie Timing)
  useEffect(() => {
    if (skipped) return;

    // Phase 1: Staredown & Audio Cue
    setPhase('STAREDOWN');
    SoundManager.playCinematicHeartbeat();

    // Phase 2: High-Speed Charge with Sonic Whoosh (at 1100ms)
    const tCharge = setTimeout(() => {
      setPhase('CHARGE');
      SoundManager.playSonicWhoosh();
    }, 1100);

    // Phase 3: Collision 1 - Massive Sub-Bass & Shield Crack (at 1900ms)
    const tCol1 = setTimeout(() => {
      setPhase('COLLISION_1');
      setIsShaking(true);
      SoundManager.playBattleClash();
      setTimeout(() => setIsShaking(false), 450);
    }, 1900);

    // Phase 4: Recoil & Collision 2 - Heavy Secondary Shockwave (at 2800ms)
    const tCol2 = setTimeout(() => {
      setPhase('COLLISION_2');
      setIsShaking(true);
      SoundManager.playBattleClash();
      setTimeout(() => setIsShaking(false), 450);
    }, 2800);

    // Phase 5: Power Moment - Sub-Bass Tension Pulse (at 3600ms)
    const tPower = setTimeout(() => {
      setPhase('POWER_MOMENT');
      SoundManager.playCinematicBoom();
      SoundManager.playCinematicHeartbeat();
    }, 3600);

    // Phase 6: Theatrical Winner Reveal with Orchestral Fanfare (at 4400ms)
    const tWinner = setTimeout(() => {
      setPhase('WINNER_REVEAL');
      SoundManager.playVictory();
      if (bout.winnerId === selfPlayerId) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.55 }
        });
      }
    }, 4400);

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
      return isCard1 
        ? 'translate-x-8 sm:translate-x-14 scale-105 transition-transform duration-300' 
        : '-translate-x-8 sm:-translate-x-14 scale-105 transition-transform duration-300';
    }
    if (phase === 'COLLISION_1' || phase === 'COLLISION_2') {
      return isCard1 
        ? 'translate-x-10 sm:translate-x-18 rotate-4 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.7)]' 
        : '-translate-x-10 sm:-translate-x-18 -rotate-4 scale-110 shadow-[0_0_30px_rgba(6,182,212,0.7)]';
    }
    if (phase === 'POWER_MOMENT') {
      if (char1IsWinner) {
        return isCard1 
          ? 'translate-x-6 scale-115 z-20 brightness-110 shadow-[0_0_25px_rgba(239,68,68,0.6)]' 
          : 'translate-x-16 opacity-50 -rotate-8 scale-85 filter contrast-75';
      } else {
        return !isCard1 
          ? '-translate-x-6 scale-115 z-20 brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.6)]' 
          : '-translate-x-16 opacity-50 rotate-8 scale-85 filter contrast-75';
      }
    }
    if (phase === 'WINNER_REVEAL') {
      if (char1IsWinner) {
        return isCard1 
          ? 'scale-110 z-20 ring-4 ring-red-500 shadow-[0_0_35px_rgba(239,68,68,0.6)]' 
          : 'scale-90 opacity-40 grayscale translate-y-4';
      } else {
        return !isCard1 
          ? 'scale-110 z-20 ring-4 ring-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.6)]' 
          : 'scale-90 opacity-40 grayscale translate-y-4';
      }
    }
    return '';
  };

  return (
    <div className={`flex-1 flex flex-col justify-between max-w-lg mx-auto w-full px-3 py-2 sm:py-4 overflow-hidden relative bg-dot-matrix ${
      isShaking ? 'animate-screen-shake' : ''
    }`}>
      
      {/* CINEMATIC WIDESCREEN ANAMORPHIC LETTERBOX BARS (Movie 2.39:1 Framing) */}
      <div className="absolute top-0 inset-x-0 h-4 sm:h-6 bg-black/90 border-b border-zinc-800 z-40 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-4 sm:h-6 bg-black/90 border-t border-zinc-800 z-40 pointer-events-none" />

      {/* 1. TOP TELEMETRY BAR: Modern Movie HUD */}
      <div className="flex justify-between items-center bg-[#0d0e14]/90 border border-zinc-800 px-3 py-2 rounded-xl mb-2 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
          <span className="text-[11px] font-black uppercase tracking-widest text-white">
            ARENA PROTOCOL // BOUT ACTIVE
          </span>
        </div>

        {phase !== 'WINNER_REVEAL' && (
          <button
            onClick={handleSkip}
            className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-lg border border-zinc-700 flex items-center gap-1 transition-all"
          >
            <FastForward className="w-3.5 h-3.5 text-amber-400" /> SKIP
          </button>
        )}
      </div>

      {/* 2. DUAL FIGHTER TELEMETRY CHIPS */}
      <div className="flex justify-between items-center gap-2 mb-2 z-20">
        {/* Fighter 1 Chip */}
        <div className="flex-1 bg-[#101117] border border-red-900/80 rounded-xl px-3 py-1.5 flex items-center justify-between">
          <div className="truncate">
            <span className="text-[10px] font-bold text-zinc-400 uppercase block truncate">
              {bout.player1Name}
            </span>
            <span className="font-black text-sm text-white uppercase tracking-wider truncate block">
              {bout.char1.name}
            </span>
          </div>
          <span className="text-xs font-black text-red-500 font-mono">
            {bout.char1.stats.power} PWR
          </span>
        </div>

        {/* Central VS Badge */}
        <div className="w-7 h-7 rounded-full bg-black border border-zinc-700 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-zinc-400">
          VS
        </div>

        {/* Fighter 2 Chip */}
        <div className="flex-1 bg-[#101117] border border-cyan-950/80 rounded-xl px-3 py-1.5 flex items-center justify-between">
          <div className="truncate">
            <span className="text-[10px] font-bold text-zinc-400 uppercase block truncate">
              {bout.player2Name}
            </span>
            <span className="font-black text-sm text-white uppercase tracking-wider truncate block">
              {bout.char2.name}
            </span>
          </div>
          <span className="text-xs font-black text-cyan-400 font-mono">
            {bout.char2.stats.power} PWR
          </span>
        </div>
      </div>

      {/* 3. CENTER CLASH ARENA: THEATRICAL SHOWDOWN */}
      <div className="relative flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[440px] my-1">
        
        {/* Screen Flash on Collision */}
        {(phase === 'COLLISION_1' || phase === 'COLLISION_2') && (
          <div className="absolute inset-0 bg-white/20 z-20 pointer-events-none animate-ping" style={{ animationDuration: '0.2s' }} />
        )}

        {/* Shockwave Rings on Impact */}
        {(phase === 'COLLISION_1' || phase === 'COLLISION_2') && (
          <div className="absolute z-25 flex items-center justify-center pointer-events-none">
            {/* Expanding Primary Ring */}
            <div className="w-40 h-40 rounded-full border-4 border-red-500 animate-shockwave" />
            {/* Expanding Secondary Ring */}
            <div className="w-56 h-56 rounded-full border-2 border-cyan-400 animate-shockwave" style={{ animationDelay: '0.08s' }} />
            {/* Anamorphic Lens Flare Streak */}
            <div className="absolute w-72 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,1)]" />
          </div>
        )}

        {/* Dynamic Cards Container */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 w-full z-10">
          
          {/* Card 1 */}
          <div className={`transition-all duration-300 transform ${getCardTransform(true)}`}>
            <ComicCard
              character={bout.char1}
              size="sm"
              isWinning={phase === 'WINNER_REVEAL' && char1IsWinner}
              isDefeated={phase === 'WINNER_REVEAL' && !char1IsWinner}
              className="sm:w-44 sm:h-64"
            />
          </div>

          {/* Epic Collision Centerpiece */}
          <div className="z-30 flex flex-col items-center justify-center pointer-events-none">
            {phase === 'COLLISION_1' || phase === 'COLLISION_2' ? (
              <div className="relative flex items-center justify-center">
                {/* Radiant Energy Flare */}
                <div className="w-16 h-16 rounded-full bg-red-600/80 blur-md animate-pulse" />
                <div className="absolute text-white font-black text-xs tracking-widest uppercase bg-black/80 px-2 py-0.5 border border-red-500 rounded">
                  IMPACT
                </div>
              </div>
            ) : phase === 'POWER_MOMENT' ? (
              <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-bounce">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
            ) : phase === 'WINNER_REVEAL' ? (
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-2 border-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.7)] animate-pop-in">
                <Trophy className="w-8 h-8 text-black" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#14151e] border border-zinc-700 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-zinc-400" />
              </div>
            )}
          </div>

          {/* Card 2 */}
          <div className={`transition-all duration-300 transform ${getCardTransform(false)}`}>
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

      {/* 4. THEATRICAL RESULT BANNER & COMBAT DEBRIEF */}
      {phase === 'WINNER_REVEAL' ? (
        <div className="bg-[#121319] border-2 border-red-900/80 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.85)] animate-pop-in space-y-3 z-30">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block leading-none mb-1">
                COMBAT OUTCOME // VICTORIOUS
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider leading-none">
                {bout.winnerName}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-600/70 px-2.5 py-1 rounded-md">
                +1 ARENA WIN
              </span>
            </div>
          </div>

          {/* Tactical Reasoning */}
          <div className="bg-[#090a0d] border border-zinc-800/80 rounded-xl p-3">
            <p className="text-xs text-zinc-300 font-medium leading-relaxed italic">
              "{bout.reason}"
            </p>
          </div>

          {/* Next Battle Action Button */}
          <button
            onClick={onNextBout}
            className="w-full py-3.5 px-4 rounded-xl skew-parallelogram bg-gradient-to-r from-red-600 to-red-700 hover:brightness-110 text-white font-black text-base uppercase tracking-wider shadow-[0_4px_20px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <div className="unskew-content flex items-center justify-center gap-2">
              <span>NEXT BATTLE</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      ) : (
        <div className="bg-[#101117]/80 border border-zinc-800 py-2.5 px-4 rounded-xl text-center text-xs font-bold text-zinc-400 tracking-wider uppercase z-20">
          {phase === 'CHARGE' ? '⚡ FIGHTERS CHARGING AT SPEED...' : phase === 'POWER_MOMENT' ? '🔥 RESOLVING KINETIC IMPACT...' : 'CLASHING IN THE ARENA...'}
        </div>
      )}
    </div>
  );
};
