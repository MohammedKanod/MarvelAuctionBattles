import React, { useEffect } from 'react';
import { AuctionState, Player, RoomState } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { AuctionTimer } from '../ui/AuctionTimer';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import confetti from 'canvas-confetti';
import { Zap, Crown, Hammer } from 'lucide-react';

interface AuctionStageProps {
  room: RoomState;
  auction: AuctionState;
  selfPlayer: Player;
  onPlaceBid: (amount: number) => void;
  onOpenRoster?: () => void;
}

export const AuctionStage: React.FC<AuctionStageProps> = ({
  room,
  auction,
  selfPlayer,
  onPlaceBid,
  onOpenRoster
}) => {
  const character = auction.character;
  const isLeader = auction.currentLeaderId === selfPlayer.id;
  const isSold = auction.status === 'SOLD';

  const minNextBid = auction.currentBid === 0 
    ? auction.startingBid 
    : auction.currentBid + room.settings.bidIncrement;

  const isRosterFull = selfPlayer.characters.length >= room.settings.charactersPerPlayer;
  const canAfford = selfPlayer.coins >= minNextBid && !isRosterFull;

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
        <h2 className="comic-font text-3xl text-comic-yellow animate-pulse">
          SUMMONING NEXT HERO...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between max-w-lg mx-auto w-full px-3 py-2 sm:py-4">
      {/* 1. TOP HEADER: Round & Coin Balance */}
      <div className="flex justify-between items-center bg-black comic-border p-2.5 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-comic-red text-white comic-font text-lg px-2.5 py-0.5 border border-black">
            ROUND {auction.currentRound}
          </span>
          <span className="text-[10px] font-black uppercase text-zinc-400">
            ROOM {room.roomCode}
          </span>
          {onOpenRoster && (
            <button
              onClick={onOpenRoster}
              className="text-[9px] font-black uppercase text-comic-yellow hover:text-white bg-black border border-comic-yellow px-1.5 py-0.5 ml-1 transition-colors"
              title="Inspect 52 Marvel heroes"
            >
              ROSTER
            </button>
          )}
        </div>

        {/* Player Treasury Balance */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-3 py-1">
          <span className="text-base">🪙</span>
          <span className="font-mono text-base font-black text-comic-yellow">
            {selfPlayer.coins}
          </span>
        </div>
      </div>

      {/* 2. COMPACT PLAYER CHIPS WITH SLOT DOTS (Horizontal scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-2 scrollbar-none">
        {room.players.map((p) => {
          const isPlayerLeader = auction.currentLeaderId === p.id;
          const slots = Array.from({ length: room.settings.charactersPerPlayer });
          const isCurrentSelf = p.id === selfPlayer.id;

          return (
            <div
              key={p.id}
              className={`flex-shrink-0 flex flex-col p-1.5 px-2.5 comic-border text-xs transition-all ${
                isPlayerLeader
                  ? 'bg-comic-yellow text-black border-black font-black'
                  : isCurrentSelf
                  ? 'bg-zinc-800 text-white border-zinc-500'
                  : 'bg-black text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate max-w-[120px]">
                {isPlayerLeader && <Crown className="w-3 h-3 text-black fill-current" />}
                <span className="font-bold truncate">
                  {p.name} {isCurrentSelf && '(You)'}
                </span>
              </div>

              <div className="flex justify-between items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] opacity-90">
                  {p.coins === 0 ? '0🪙' : `${p.coins}🪙`}
                </span>
                {/* Character Slot Dots */}
                <div className="flex gap-0.5">
                  {slots.map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-[8px] leading-none ${
                        idx < p.characters.length
                          ? isPlayerLeader ? 'text-black' : 'text-comic-yellow'
                          : 'text-zinc-600'
                      }`}
                    >
                      ●
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. CENTER: Large Character Card */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-1">
        {/* SOLD Overlay Banner */}
        {isSold && (
          <div className="absolute inset-0 z-40 bg-black/85 flex flex-col items-center justify-center p-4 animate-pop-in">
            <div className="comic-ribbon bg-comic-red border-4 border-black p-3 rotate-[-6deg] shadow-comic-xl text-center mb-2">
              <span className="comic-ribbon-content comic-font text-5xl text-comic-yellow tracking-wider">
                SOLD!
              </span>
            </div>
            <div className="bg-black border-2 border-zinc-700 px-4 py-1.5 text-center">
              <p className="text-[10px] font-bold text-zinc-400 uppercase">
                {auction.isFreeAssignment ? 'ASSIGNED FOR FREE TO' : 'ACQUIRED BY'}
              </p>
              <p className="comic-font text-2xl text-white">
                {auction.winnerName || 'Unclaimed'}
              </p>
              <p className="text-xs font-mono font-bold text-comic-yellow">
                {auction.winningBid ? `🪙 ${auction.winningBid}` : 'Free Slot Draft'}
              </p>
            </div>
          </div>
        )}

        <ComicCard
          character={character}
          size="hero"
          className="w-full max-w-[280px] sm:max-w-[320px] shadow-comic-lg"
        />
      </div>

      {/* 4. CURRENT BID & LEADER INFO */}
      <div className="bg-black comic-border p-2.5 my-2 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block leading-none mb-0.5">
            CURRENT HIGH BID
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🪙</span>
            <span className="comic-font text-3xl text-comic-yellow leading-none">
              {auction.currentBid > 0 ? auction.currentBid : auction.startingBid}
            </span>
            {auction.currentBid === 0 && (
              <span className="text-[10px] font-bold text-zinc-400 uppercase">
                (OPENING)
              </span>
            )}
          </div>
        </div>

        {/* Current Leader Pill or Timer */}
        <div className="flex items-center gap-3">
          <AuctionTimer seconds={auction.timerSeconds} />

          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block leading-none mb-0.5">
              LEADER
            </span>
            <span className={`comic-font text-xl block truncate max-w-[110px] ${
              isLeader ? 'text-green-400' : 'text-white'
            }`}>
              {auction.currentLeaderName ? auction.currentLeaderName : 'NONE'}
            </span>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM ACTION AREA: Large Touch Target Button */}
      <div className="pt-1">
        {isRosterFull ? (
          <div className="bg-zinc-900 comic-border p-3 text-center text-xs font-bold text-zinc-400">
            ✓ Your character roster is full ({room.settings.charactersPerPlayer}/{room.settings.charactersPerPlayer})
          </div>
        ) : isLeader ? (
          <div className="bg-green-950 border-2 border-green-500 p-3 text-center text-green-300 font-bold text-xs uppercase comic-border">
            👑 You are currently holding the highest bid!
          </div>
        ) : !canAfford ? (
          <div className="bg-zinc-950 border-2 border-zinc-700 p-3 text-center text-zinc-400 font-bold text-xs uppercase comic-border">
            ⚠️ Not enough coins for minimum bid ({minNextBid} 🪙). Free draft if unsold!
          </div>
        ) : (
          <ComicButton
            variant="yellow"
            size="xl"
            disabled={isSold || isLeader || !canAfford}
            onClick={() => onPlaceBid(minNextBid)}
            className="w-full text-2xl py-4 shadow-comic-yellow"
          >
            <Zap className="w-6 h-6 fill-current text-black" /> BID {minNextBid} 🪙
          </ComicButton>
        )}
      </div>
    </div>
  );
};
