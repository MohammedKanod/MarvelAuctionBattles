import React, { useState } from 'react';
import { RoomState, Player, Character, BattleRoundState } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import { Shield, Zap, Check, Lock } from 'lucide-react';

interface FighterSelectionViewProps {
  room: RoomState;
  battleRound: BattleRoundState;
  selfPlayer: Player;
  onLockFighter: (characterId: string) => void;
}

export const FighterSelectionView: React.FC<FighterSelectionViewProps> = ({
  room,
  battleRound,
  selfPlayer,
  onLockFighter
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string | null>(
    selfPlayer.selectedFighterId || null
  );

  const isLocked = Boolean(selfPlayer.fighterLocked);
  const isCountdown = battleRound.subPhase === 'REVEAL_COUNTDOWN';

  // Character tracking
  const defeatedIds = selfPlayer.defeatedCharacterIds || [];
  const usedIds = selfPlayer.usedCharacterIds || [];

  // Characters player can choose for THIS bout:
  // One-time deployment rule: characters used in previous battles cannot be deployed again!
  const availableCharacters = selfPlayer.characters.filter(
    (c) => !usedIds.includes(c.id) && !defeatedIds.includes(c.id)
  );

  // Characters already deployed in prior bouts
  const deployedCharacters = selfPlayer.characters.filter(
    (c) => usedIds.includes(c.id) || defeatedIds.includes(c.id)
  );

  const handleSelectCard = (char: Character) => {
    if (isLocked || isCountdown) return;
    SoundManager.playClick();
    setSelectedCharId(char.id);
  };

  const handleLockIn = () => {
    if (!selectedCharId || isLocked || isCountdown) return;
    SoundManager.playGavel();
    onLockFighter(selectedCharId);
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-lg mx-auto w-full px-3 py-3 sm:py-5">
      {/* 1. Header: Round & Title */}
      <div className="bg-black comic-border p-3 text-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-black bg-comic-yellow px-2.5 py-0.5 border border-black mb-1 inline-block">
          BOUT #{battleRound.roundIndex}
        </span>
        <h1 className="comic-font text-3xl sm:text-4xl text-white tracking-wider uppercase">
          CHOOSE YOUR FIGHTER
        </h1>
        <p className="text-xs font-semibold text-comic-yellow">
          ⚠️ 1-TIME DEPLOYMENT: Heroes used once cannot fight again!
        </p>
      </div>

      {/* 2. Secret Opponent Readiness Chips */}
      <div className="bg-comic-panel comic-border p-2.5 mb-3">
        <div className="flex items-center justify-between text-[10px] font-black uppercase text-zinc-400 mb-1.5 px-1">
          <span>COMMANDERS STATUS</span>
          <span>{battleRound.activeFighterSelections.filter(s => s.isLocked).length} / {battleRound.activeFighterSelections.length} READY</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {battleRound.activeFighterSelections.map((sel) => {
            const isMe = sel.playerId === selfPlayer.id;
            return (
              <div
                key={sel.playerId}
                className={`comic-border p-1.5 px-2 flex items-center justify-between text-xs font-bold ${
                  sel.isLocked
                    ? 'bg-green-950 border-green-500 text-green-300'
                    : 'bg-black text-zinc-400'
                }`}
              >
                <span className="truncate max-w-[90px]">
                  {sel.playerName} {isMe && '(You)'}
                </span>
                <span className="text-[10px] font-black uppercase flex items-center gap-0.5">
                  {sel.isLocked ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" /> READY
                    </>
                  ) : (
                    'CHOOSING...'
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 3-2-1 Countdown Overlay */}
      {isCountdown && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center animate-pop-in">
          <div className="action-lines absolute inset-0 opacity-50" />
          <span className="text-sm font-black uppercase tracking-widest text-comic-yellow mb-2 z-10">
            ALL FIGHTERS LOCKED IN
          </span>
          <div className="w-32 h-32 bg-comic-red border-4 border-black flex items-center justify-center rotate-[-6deg] shadow-comic-xl z-10 animate-bounce-short">
            <span className="comic-font text-8xl text-comic-yellow">
              {battleRound.revealCountdown > 0 ? battleRound.revealCountdown : 'REVEAL!'}
            </span>
          </div>
        </div>
      )}

      {/* 4. Fighter Cards Grid */}
      <div className="flex-1 flex flex-col items-center justify-center my-2">
        {availableCharacters.length === 0 ? (
          <div className="bg-black/80 comic-border p-6 text-center max-w-sm">
            <p className="comic-font text-2xl text-comic-red">
              NO UNUSED HEROES REMAINING!
            </p>
            <p className="text-xs font-semibold text-zinc-400 mt-2">
              All your heroes have been deployed in previous battles or defeated. Spectating remaining tournament bouts...
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div className="text-[11px] font-black uppercase text-comic-yellow tracking-wider mb-2 text-center">
              AVAILABLE HEROES ({availableCharacters.length})
            </div>
            <div className="flex flex-wrap justify-center gap-3 w-full max-h-[44vh] overflow-y-auto p-1">
              {availableCharacters.map((char) => {
                const isSelected = selectedCharId === char.id;
                return (
                  <div key={char.id} className="relative group transition-all">
                    <ComicCard
                      character={char}
                      size="md"
                      isSelected={isSelected}
                      isDefeated={defeatedIds.includes(char.id)}
                      isUsed={usedIds.includes(char.id)}
                      onClick={() => handleSelectCard(char)}
                      className={`cursor-pointer ${isSelected ? 'ring-4 ring-comic-yellow scale-[1.02]' : ''}`}
                    />

                    {/* IN-CARD LOCK BUTTON OVERLAY ON THIS SPECIFIC CARD */}
                    {isSelected && !isLocked && !isCountdown && (
                      <div className="absolute inset-x-1.5 bottom-2 z-30 flex justify-center animate-pop-in">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLockIn();
                          }}
                          className="w-full py-2.5 px-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 border-3 border-black text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(250,204,21,0.95)] hover:brightness-115 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer rounded"
                        >
                          <Lock className="w-4 h-4 fill-black" />
                          <span>LOCK HERO</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Previously Deployed Heroes Shelf */}
        {deployedCharacters.length > 0 && (
          <div className="w-full mt-3 pt-2 border-t-2 border-dashed border-zinc-800">
            <div className="text-[10px] font-black uppercase text-zinc-500 tracking-wider mb-1.5 text-center">
              DEPLOYED IN PREVIOUS BOUTS ({deployedCharacters.length}) — UNAVAILABLE
            </div>
            <div className="flex gap-2 overflow-x-auto justify-center py-1">
              {deployedCharacters.map((char) => (
                <ComicCard
                  key={char.id}
                  character={char}
                  size="sm"
                  isDefeated={defeatedIds.includes(char.id)}
                  isUsed={usedIds.includes(char.id)}
                  className="opacity-40 pointer-events-none scale-90"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Bottom Touch Action Area */}
      <div className="pt-2">
        {isLocked ? (
          <div className="bg-green-950 border-3 border-green-500 p-3.5 text-center text-green-300 comic-border flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" />
            <span className="comic-font text-xl uppercase tracking-wider">
              FIGHTER LOCKED! WAITING FOR OPPONENTS...
            </span>
          </div>
        ) : selectedCharId ? (
          <ComicButton
            variant="yellow"
            size="xl"
            onClick={handleLockIn}
            className="w-full text-xl sm:text-2xl py-3.5 shadow-comic-yellow"
          >
            <Zap className="w-6 h-6 fill-current text-black" /> LOCK IN {availableCharacters.find(c => c.id === selectedCharId)?.name.toUpperCase() || 'HERO'}
          </ComicButton>
        ) : (
          <div className="bg-black/70 border-2 border-zinc-700 p-3 text-center text-zinc-400 text-xs font-bold uppercase tracking-wider">
            👆 TAP ANY HERO CARD ABOVE TO SELECT & LOCK IN
          </div>
        )}
      </div>
    </div>
  );
};
