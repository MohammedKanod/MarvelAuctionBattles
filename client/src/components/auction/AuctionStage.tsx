import React, { useEffect, useState } from 'react';
import { AuctionState, Player, RoomState } from '../../../../shared/types';
import { SoundManager } from '../../sound/SoundManager';
import confetti from 'canvas-confetti';
import { Zap, Crown } from 'lucide-react';

interface AuctionStageProps {
  room: RoomState;
  auction: AuctionState;
  selfPlayer: Player;
  onPlaceBid: (amount: number) => void;
  onPassAuction: () => void;
  onOpenRoster?: () => void;
}

export const AuctionStage: React.FC<AuctionStageProps> = ({
  room,
  auction,
  selfPlayer,
  onPlaceBid,
  onPassAuction,
  onOpenRoster
}) => {
  const character = auction.character;
  const isLeader = auction.currentLeaderId === selfPlayer.id;
  const isSold = auction.status === 'SOLD';
  const isUnsold = auction.status === 'UNSOLD';
  const hasPassed = auction.passedPlayerIds?.includes(selfPlayer.id) || false;
  const maxTimer = room.settings.auctionTimerSeconds || 10;

  // Smooth 60 FPS stopwatch interpolation based on auction.endsAt to eliminate 1Hz tick stutter
  const [smoothSecondsRemaining, setSmoothSecondsRemaining] = useState<number>(auction.timerSeconds);

  useEffect(() => {
    if (auction.status !== 'ACTIVE' && auction.status !== 'EXTENDED') {
      setSmoothSecondsRemaining(auction.timerSeconds);
      return;
    }

    let animId: number;
    const update = () => {
      const now = Date.now();
      const left = Math.max(0, (auction.endsAt - now) / 1000);
      setSmoothSecondsRemaining(left);
      if (left > 0 && (auction.status === 'ACTIVE' || auction.status === 'EXTENDED')) {
        animId = requestAnimationFrame(update);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [auction.endsAt, auction.status, auction.timerSeconds]);

  const minNextBid = auction.currentBid === 0 
    ? auction.startingBid 
    : auction.currentBid + room.settings.bidIncrement;

  const isRosterFull = selfPlayer.characters.length >= room.settings.charactersPerPlayer;
  const canAfford = selfPlayer.coins >= minNextBid && !isRosterFull && !hasPassed;

  // Sound and confetti on sold
  useEffect(() => {
    if (isSold && auction.winnerId) {
      SoundManager.playGavel();
      if (auction.winnerId === selfPlayer.id) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }
  }, [isSold, auction.winnerId, selfPlayer.id]);

  if (!character) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-red-500 animate-pulse tracking-wider uppercase">
          SUMMONING NEXT HERO...
        </h2>
      </div>
    );
  }

  // Find opponent / leader for the second HUD badge
  const leaderPlayer = room.players.find(p => p.id === auction.currentLeaderId);
  const otherPlayer = leaderPlayer && leaderPlayer.id !== selfPlayer.id 
    ? leaderPlayer 
    : room.players.find(p => p.id !== selfPlayer.id) || selfPlayer;

  // Math for dynamic SVG stopwatch pie slice (smooth 60 FPS)
  const timerRatio = Math.max(0, Math.min(1, (maxTimer - smoothSecondsRemaining) / maxTimer));
  const handAngle = timerRatio * 360;

  function getPiePath(ratio: number, cx = 28, cy = 28, r = 24) {
    if (ratio <= 0.001) return '';
    if (ratio >= 0.999) return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
    const angleRad = ratio * 2 * Math.PI - Math.PI / 2;
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    const largeArc = ratio > 0.5 ? 1 : 0;
    return `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${x} ${y} Z`;
  }

  // Stats normalized for visual bars (15% to 100%)
  const attackStat = Math.min(100, Math.max(20, character.stats.power || character.stats.strength));
  const defenseStat = Math.min(100, Math.max(20, character.stats.durability));
  const speedStat = Math.min(100, Math.max(20, character.stats.speed));

  const handlePass = () => {
    if (hasPassed || isSold || isUnsold || isLeader) return;
    SoundManager.playClick();
    onPassAuction();
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-3 py-3 sm:py-5 min-h-[92vh] bg-dot-matrix">
      
      {/* 1. TOP HUD: SKEWED PARALLELOGRAM PLAYER BADGES (Exact Reference Style) */}
      <div className="flex items-center justify-between gap-3 mb-4 pt-1">
        {/* Left Badge: Active / Self Player (Red Border, Glow) */}
        <div className="flex-1 relative">
          <div className="skew-parallelogram bg-[#0f1015] border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.35)] py-2 px-3">
            <div className="unskew-content flex items-center justify-between">
              {/* Coin balance */}
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 border border-amber-600 flex items-center justify-center text-xs font-black text-amber-950 shadow-inner">
                  🪙
                </span>
                <span className="font-black text-white text-base tracking-wide">
                  {selfPlayer.coins}
                </span>
              </div>

              {/* Divider */}
              <span className="text-zinc-600 font-bold text-sm">|</span>

              {/* Roster slot count (Amber/Yellow) */}
              <span className="font-black text-amber-400 text-sm tracking-wider">
                {selfPlayer.characters.length}/{room.settings.charactersPerPlayer}
              </span>
            </div>
          </div>
        </div>

        {/* Right Badge: Opponent / Current Leader (Steel / Cyan-Blue Border) */}
        <div className="flex-1 relative">
          <div className="skew-parallelogram bg-[#0f1015] border-2 border-cyan-900/80 shadow-[0_0_12px_rgba(6,182,212,0.15)] py-2 px-3">
            <div className="unskew-content flex items-center justify-between">
              {/* Coin balance */}
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 border border-amber-600 flex items-center justify-center text-xs font-black text-amber-950 shadow-inner">
                  🪙
                </span>
                <span className="font-black text-white text-base tracking-wide">
                  {otherPlayer.coins}
                </span>
              </div>

              {/* Divider */}
              <span className="text-zinc-600 font-bold text-sm">|</span>

              {/* Roster slot count (Red) */}
              <span className="font-black text-red-500 text-sm tracking-wider">
                {otherPlayer.characters.length}/{room.settings.charactersPerPlayer}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CENTER HERO SHOWCASE CARD (Exact Reference Style) */}
      <div className="relative w-full my-auto">
        
        {/* FLOATING STOPWATCH TIMER (Top-Left Overlapping Corner) */}
        <div className="absolute -top-5 -left-3 z-30 flex flex-col items-center">
          {/* Metal Crown Top Pusher Button */}
          <div className="w-3.5 h-2 bg-red-600 rounded-t-sm shadow-md border-t border-red-400" />
          
          {/* Circular Stopwatch Dial */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-4 border-red-600 shadow-2xl relative flex items-center justify-center overflow-hidden">
            {/* SVG Pie Countdown */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
              {/* Clock Tick Marks at 12, 3, 6, 9 */}
              <line x1="28" y1="5" x2="28" y2="8" stroke="#1f2937" strokeWidth="1.5" />
              <line x1="51" y1="28" x2="48" y2="28" stroke="#1f2937" strokeWidth="1.5" />
              <line x1="28" y1="51" x2="28" y2="48" stroke="#1f2937" strokeWidth="1.5" />
              <line x1="5" y1="28" x2="8" y2="28" stroke="#1f2937" strokeWidth="1.5" />

              {/* Red Ticking Sector Arc Slice */}
              {timerRatio > 0 && (
                <path
                  d={getPiePath(timerRatio, 28, 28, 23)}
                  fill="#dc2626"
                  opacity="0.95"
                />
              )}

              {/* Center Pivot Pin */}
              <circle cx="28" cy="28" r="3" fill="#111827" />

              {/* Stopwatch Hand */}
              <line
                x1="28"
                y1="28"
                x2="28"
                y2="7"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${handAngle} 28 28)`}
              />
            </svg>
          </div>
        </div>

        {/* The Sleek Dark Metallic Card Body */}
        <div className="bg-[#121319] border-2 border-red-950/90 rounded-3xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(239,68,68,0.15)] ring-1 ring-red-500/20 relative">
          
          {/* Card Header: Hero Name (Uppercase, Crisp White Sans-Serif) */}
          <div className="flex items-center justify-center pl-10 pr-2 mb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-widest uppercase truncate text-center drop-shadow-md">
              {character.name}
            </h2>
          </div>

          {/* Character Artwork Frame (Large Rounded Rectangle) */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl border-2 border-dashed border-zinc-700/60 overflow-hidden bg-black shadow-inner mb-5">
            <img
              src={`/characters/${character.id}.jpg`}
              alt={character.name}
              onError={(e) => {
                if (character.imageUrl && (e.target as HTMLImageElement).src !== character.imageUrl) {
                  (e.target as HTMLImageElement).src = character.imageUrl;
                }
              }}
              className="w-full h-full object-cover object-[center_15%] filter contrast-[1.05]"
            />
            {/* Subtle Vignette Gradient Shadows */}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

            {/* Current Leader Tag if active */}
            {auction.currentLeaderName && (
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm border border-red-500/60 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-black uppercase text-amber-300">
                  {auction.currentLeaderName} ({auction.currentBid} 🪙)
                </span>
              </div>
            )}
          </div>

          {/* Three Stat Rows (Attack, Defense, Speed) */}
          <div className="space-y-3">
            {/* 1. Attack Row */}
            <div className="flex items-center gap-3">
              <div className="w-24 py-1.5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-black text-xs uppercase tracking-wider text-center shadow-md flex-shrink-0">
                Attack
              </div>
              <div className="flex-1 h-8 bg-[#090a0d] rounded-xl border border-zinc-800/90 p-1 flex items-center shadow-inner overflow-hidden">
                <div 
                  className="h-full rounded-lg bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all duration-700"
                  style={{ width: `${attackStat}%` }}
                />
              </div>
            </div>

            {/* 2. Defense Row */}
            <div className="flex items-center gap-3">
              <div className="w-24 py-1.5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-black text-xs uppercase tracking-wider text-center shadow-md flex-shrink-0">
                Defense
              </div>
              <div className="flex-1 h-8 bg-[#090a0d] rounded-xl border border-zinc-800/90 p-1 flex items-center shadow-inner overflow-hidden">
                <div 
                  className="h-full rounded-lg bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all duration-700"
                  style={{ width: `${defenseStat}%` }}
                />
              </div>
            </div>

            {/* 3. Speed Row */}
            <div className="flex items-center gap-3">
              <div className="w-24 py-1.5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-black text-xs uppercase tracking-wider text-center shadow-md flex-shrink-0">
                Speed
              </div>
              <div className="flex-1 h-8 bg-[#090a0d] rounded-xl border border-zinc-800/90 p-1 flex items-center shadow-inner overflow-hidden">
                <div 
                  className="h-full rounded-lg bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all duration-700"
                  style={{ width: `${speedStat}%` }}
                />
              </div>
            </div>
          </div>

          {/* SOLD OVERLAY */}
          {isSold && (
            <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 animate-pop-in">
              <div className="bg-red-600 border-3 border-black py-2 px-6 shadow-2xl mb-3 rotate-[-4deg]">
                <span className="font-black text-4xl text-amber-300 tracking-widest uppercase">
                  SOLD!
                </span>
              </div>
              <div className="bg-[#15161c] border border-zinc-700 px-5 py-3 rounded-xl text-center">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {auction.isFreeAssignment ? 'ASSIGNED FOR FREE TO' : 'CLAIMED BY'}
                </p>
                <p className="text-2xl font-black text-white uppercase mt-0.5">
                  {auction.winnerName || 'Unclaimed'}
                </p>
                <p className="text-sm font-mono font-bold text-amber-400 mt-1">
                  {auction.winningBid ? `🪙 $${auction.winningBid}` : 'Drafted'}
                </p>
              </div>
            </div>
          )}

          {/* UNSOLD / ALL PASSED OVERLAY */}
          {isUnsold && (
            <div className="absolute inset-0 z-40 bg-black/92 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 animate-pop-in">
              <div className="bg-zinc-800 border-2 border-zinc-600 py-2.5 px-6 shadow-2xl mb-3 rotate-[-3deg]">
                <span className="font-black text-2xl sm:text-3xl text-zinc-300 tracking-widest uppercase">
                  UNSOLD // PASSED
                </span>
              </div>
              <div className="bg-[#15161c] border border-zinc-800 px-6 py-3.5 rounded-xl text-center shadow-lg">
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
                  ALL PLAYERS PASSED // NO CONTRACT
                </p>
                <p className="text-sm font-bold text-zinc-400 mt-1">
                  Hero returned to multiverse pool
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM ACTIONS: DUAL SLANTED PARALLELOGRAM BUTTONS (Exact Reference Style) */}
      <div className="mt-4 pt-1">
        {isRosterFull ? (
          <div className="bg-[#121319] border-2 border-zinc-800 p-3.5 text-center text-xs font-bold text-zinc-400 rounded-xl">
            ✓ Your character roster is full ({room.settings.charactersPerPlayer}/{room.settings.charactersPerPlayer})
          </div>
        ) : isLeader ? (
          <div className="bg-green-950/60 border-2 border-green-500/80 p-3.5 text-center text-green-300 font-black text-sm uppercase rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <Crown className="w-5 h-5 text-amber-400" /> YOU ARE CURRENTLY HOLDING THE HIGHEST BID!
          </div>
        ) : hasPassed ? (
          <div className="bg-[#121319] border-2 border-zinc-800 p-4 text-center rounded-2xl shadow-inner">
            <div className="flex items-center justify-center gap-2 text-red-400 font-black text-sm uppercase tracking-wider">
              <span>🚫</span> YOU PASSED ON {character.name}
            </div>
            <p className="text-[11px] font-bold text-zinc-500 mt-1 uppercase tracking-wide">
              Waiting for other commanders or next hero...
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            {/* Left Button: Bid Parallelogram */}
            <button
              disabled={isSold || isUnsold || !canAfford}
              onClick={() => onPlaceBid(minNextBid)}
              className={`flex-1 relative group py-3 px-4 skew-parallelogram bg-gradient-to-b from-red-600 to-red-700 border-3 border-black shadow-[0_6px_22px_rgba(220,38,38,0.5)] transition-all duration-150 ${
                !canAfford 
                  ? 'opacity-50 cursor-not-allowed grayscale' 
                  : 'hover:brightness-115 active:scale-95 cursor-pointer'
              }`}
            >
              <div className="unskew-content flex items-center justify-center gap-2">
                {/* Gold Embossed Coin */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-black flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="font-mono font-black text-black text-sm">🪙</span>
                </div>
                {/* Price Display */}
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow">
                  ${minNextBid}
                </span>
              </div>
            </button>

            {/* Right Button: Pass Parallelogram */}
            <button
              disabled={isSold || isUnsold || isLeader || hasPassed}
              onClick={handlePass}
              className="flex-1 relative group py-3 px-4 skew-parallelogram bg-[#13141a] border-3 border-red-600 shadow-lg hover:bg-red-950/40 active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="unskew-content flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-wider">
                  Pass
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Quick Roster Vault Link */}
        {onOpenRoster && (
          <div className="text-center mt-3">
            <button
              onClick={onOpenRoster}
              className="text-[10px] font-black uppercase text-zinc-500 hover:text-red-400 transition-colors tracking-widest"
            >
              INSPECT 102 CHARACTER DOSSIERS →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
