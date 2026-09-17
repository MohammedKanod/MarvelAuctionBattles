import React, { useEffect } from 'react';
import { RoomState, TournamentState, Player } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Sparkles, RotateCcw, Home, Star } from 'lucide-react';

interface ResultsViewProps {
  room: RoomState;
  tournament: TournamentState;
  selfPlayerId: string;
  onPlayAgain: () => void;
  onReturnToHome: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  room,
  tournament,
  selfPlayerId,
  onPlayAgain,
  onReturnToHome
}) => {
  const isHost = room.hostId === selfPlayerId;
  const championPlayer = room.players.find((p) => p.id === tournament.championId);
  const standings = tournament.standings;

  useEffect(() => {
    SoundManager.playVictory();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      {/* Grand Champion Trophy Podium Banner */}
      <div className="bg-comic-panel comic-border-xl p-8 mb-8 text-center relative overflow-hidden">
        {/* Action lines background */}
        <div className="absolute inset-0 action-lines opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-comic-yellow border-4 border-black flex items-center justify-center rotate-[-6deg] shadow-comic-lg mb-4 animate-bounce-short">
            <Trophy className="w-14 h-14 text-black" />
          </div>

          <div className="comic-ribbon bg-comic-red border-3 border-black px-6 py-1.5 shadow-comic mb-2">
            <span className="comic-ribbon-content comic-font text-2xl text-comic-yellow tracking-widest">
              GRAND CHAMPION OF THE MULTIVERSE
            </span>
          </div>

          <h1 className="comic-font text-6xl sm:text-7xl text-white tracking-wide drop-shadow-md mb-2">
            {tournament.championName?.toUpperCase() || 'CHAMPION'}
          </h1>

          {championPlayer && (
            <p className="text-zinc-300 font-bold text-sm max-w-lg mb-6">
              Commanded their superhero squad through fierce character bidding and brutal arena battles to claim ultimate victory!
            </p>
          )}

          {/* Champion Stats Badges */}
          {championPlayer && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full mb-6">
              <div className="bg-black comic-border p-3">
                <span className="text-[10px] font-black uppercase text-zinc-400 block">
                  TEAM ROSTER VALUE
                </span>
                <span className="comic-font text-2xl text-comic-yellow">
                  ⚡ {championPlayer.characters.reduce((s, c) => s + c.stats.power, 0)}
                </span>
              </div>
              <div className="bg-black comic-border p-3">
                <span className="text-[10px] font-black uppercase text-zinc-400 block">
                  BATTLES WON
                </span>
                <span className="comic-font text-2xl text-green-400">
                  🏆 {championPlayer.wins || 0}
                </span>
              </div>
              <div className="bg-black comic-border p-3">
                <span className="text-[10px] font-black uppercase text-zinc-400 block">
                  AUCTION WINS
                </span>
                <span className="comic-font text-2xl text-white">
                  🔨 {championPlayer.characters.length}
                </span>
              </div>
              <div className="bg-black comic-border p-3">
                <span className="text-[10px] font-black uppercase text-zinc-400 block">
                  TREASURY LEFTOVER
                </span>
                <span className="comic-font text-2xl text-comic-yellow font-mono">
                  🪙 {championPlayer.coins}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Champion's Winning Roster Cards */}
      {championPlayer && championPlayer.characters.length > 0 && (
        <div className="mb-8">
          <h3 className="comic-font text-3xl text-comic-yellow tracking-wide mb-4 flex items-center gap-2">
            <Crown className="w-6 h-6 text-comic-yellow" /> CHAMPION'S ROSTER
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {championPlayer.characters.map((c) => (
              <ComicCard key={c.id} character={c} isWinning={true} />
            ))}
          </div>
        </div>
      )}

      {/* Final Tournament Standings Leaderboard */}
      <div className="bg-comic-panel comic-border-lg p-6 mb-8">
        <h3 className="comic-font text-3xl text-white tracking-wide mb-4">
          FINAL TOURNAMENT STANDINGS
        </h3>
        <div className="space-y-3">
          {standings.map((entry) => (
            <div
              key={entry.playerId}
              className={`comic-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                entry.rank === 1
                  ? 'bg-black border-comic-yellow ring-2 ring-comic-yellow'
                  : 'bg-black/60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 comic-border flex items-center justify-center font-black text-lg ${
                    entry.rank === 1
                      ? 'bg-comic-yellow text-black'
                      : entry.rank === 2
                      ? 'bg-zinc-300 text-black'
                      : entry.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  #{entry.rank}
                </div>
                <div>
                  <h4 className="comic-font text-2xl text-white">
                    {entry.playerName} {entry.playerId === selfPlayerId && '(YOU)'}
                  </h4>
                  <p className="text-xs font-semibold text-zinc-400">
                    MVP Hero: <span className="text-comic-yellow">{entry.mvpCharacter}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm font-mono">
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block font-sans font-black">
                    ROSTER VALUE
                  </span>
                  <span className="text-comic-yellow font-bold">⚡ {entry.teamValue}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block font-sans font-black">
                    ARENA WINS
                  </span>
                  <span className="text-green-400 font-bold">{entry.battlesWon}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block font-sans font-black">
                    HEROES ACQUIRED
                  </span>
                  <span className="text-white font-bold">{entry.auctionWins}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer: Play Again / Return Home */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {isHost && (
          <ComicButton
            variant="yellow"
            size="lg"
            onClick={onPlayAgain}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-5 h-5" /> PLAY AGAIN (RESET TO LOBBY)
          </ComicButton>
        )}

        <ComicButton
          variant="secondary"
          size="lg"
          onClick={onReturnToHome}
          className="w-full sm:w-auto"
        >
          <Home className="w-5 h-5" /> RETURN TO MAIN MENU
        </ComicButton>
      </div>
    </div>
  );
};
