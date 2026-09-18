import React, { useState } from 'react';
import { RoomState, Player, Character } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { ComicButton } from '../ui/ComicButton';
import { Shield, Sparkles, Check, ArrowUpDown } from 'lucide-react';

interface TeamBuildingViewProps {
  room: RoomState;
  selfPlayer: Player;
  onLockTeam: (order: string[]) => void;
}

export const TeamBuildingView: React.FC<TeamBuildingViewProps> = ({
  room,
  selfPlayer,
  onLockTeam
}) => {
  const [characterOrder, setCharacterOrder] = useState<string[]>(
    selfPlayer.characters.map((c) => c.id)
  );
  const [selectedViewingPlayerId, setSelectedViewingPlayerId] = useState<string>(selfPlayer.id);

  const viewingPlayer = room.players.find((p) => p.id === selectedViewingPlayerId) || selfPlayer;
  const isViewingSelf = viewingPlayer.id === selfPlayer.id;

  const totalTeamPower = viewingPlayer.characters.reduce(
    (sum, c) => sum + c.stats.power,
    0
  );

  const handleMoveUp = (index: number) => {
    if (index === 0 || !isViewingSelf || selfPlayer.isReady) return;
    const newOrder = [...characterOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setCharacterOrder(newOrder);
  };

  const handleMoveDown = (index: number) => {
    if (index === characterOrder.length - 1 || !isViewingSelf || selfPlayer.isReady) return;
    const newOrder = [...characterOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setCharacterOrder(newOrder);
  };

  const orderedCharacters = isViewingSelf
    ? characterOrder
        .map((id) => selfPlayer.characters.find((c) => c.id === id))
        .filter((c): c is Character => Boolean(c))
    : viewingPlayer.characters;

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-6">
      {/* Top Banner: Roster Header & Readiness */}
      <div className="bg-comic-panel comic-border-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase bg-comic-yellow text-black px-2 py-0.5 border border-black">
                PHASE 02
              </span>
              <span className="text-xs font-bold text-zinc-300">
                TEAM BUILDING & STRATEGY
              </span>
            </div>
            <h1 className="comic-font text-4xl text-white tracking-wide">
              {isViewingSelf ? 'YOUR ROSTER LINEUP' : `${viewingPlayer.name.toUpperCase()}'S SQUAD`}
            </h1>
          </div>

          {/* Team Power Badge */}
          <div className="bg-black comic-border p-3 flex items-center gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-zinc-400 block leading-none">
                COMBINED TEAM POWER
              </span>
              <span className="comic-font text-3xl text-comic-yellow tracking-wider">
                ⚡ {totalTeamPower}
              </span>
            </div>

            {isViewingSelf && (
              <ComicButton
                variant={selfPlayer.isReady ? 'yellow' : 'primary'}
                size="md"
                disabled={selfPlayer.isReady}
                onClick={() => onLockTeam(characterOrder)}
              >
                {selfPlayer.isReady ? (
                  <>
                    <Check className="w-5 h-5 text-green-950" /> LINEUP LOCKED
                  </>
                ) : (
                  'LOCK LINEUP FOR BATTLE'
                )}
              </ComicButton>
            )}
          </div>
        </div>

        {/* Player Roster Selector Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t-2 border-black">
          <span className="text-xs font-bold uppercase text-zinc-400 self-center mr-2">
            VIEW ROSTER:
          </span>
          {room.players.map((player) => (
            <button
              key={player.id}
              onClick={() => setSelectedViewingPlayerId(player.id)}
              className={`px-3 py-1.5 comic-border text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                player.id === selectedViewingPlayerId
                  ? 'bg-comic-red text-white'
                  : 'bg-black text-zinc-300 hover:text-white'
              }`}
            >
              <span>{player.name}</span>
              {player.isReady && <span className="text-green-400">✓</span>}
              {player.id === selfPlayer.id && (
                <span className="text-[9px] bg-comic-yellow text-black px-1">YOU</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Lineup Grid */}
      {orderedCharacters.length === 0 ? (
        <div className="bg-black/60 comic-border p-12 text-center">
          <p className="text-lg font-bold text-zinc-400">
            No characters acquired during auction.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
          {orderedCharacters.map((char, index) => (
            <div key={char.id} className="relative flex flex-col items-center w-full max-w-[240px] sm:max-w-[260px]">
              {/* Lineup Bout Slot Badge */}
              <div className="w-full flex justify-between items-center bg-black border-2 border-black p-2 text-xs font-black text-comic-yellow mb-1.5 shadow-comic-sm">
                <span>BOUT #{index + 1} VANGUARD</span>
                {isViewingSelf && !selfPlayer.isReady && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="bg-zinc-800 hover:bg-comic-yellow hover:text-black text-white px-2 py-0.5 rounded-xs disabled:opacity-30 transition-colors"
                      title="Move Forward"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === orderedCharacters.length - 1}
                      className="bg-zinc-800 hover:bg-comic-yellow hover:text-black text-white px-2 py-0.5 rounded-xs disabled:opacity-30 transition-colors"
                      title="Move Backward"
                    >
                      ▼
                    </button>
                  </div>
                )}
              </div>

              <ComicCard character={char} showStats={true} className="w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Lock Status Checklist */}
      <div className="bg-black/80 comic-border p-4">
        <h4 className="comic-font text-xl text-comic-yellow tracking-wide mb-3">
          PLAYERS PREPARING FOR BATTLE:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {room.players.map((p) => (
            <div
              key={p.id}
              className={`p-2 comic-border text-center text-xs font-bold ${
                p.isReady ? 'bg-green-950 text-green-300 border-green-500' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              <div className="truncate">{p.name}</div>
              <div className="text-[10px] uppercase mt-0.5">
                {p.isReady ? '✓ LOCKED' : 'CHOOSING...'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
