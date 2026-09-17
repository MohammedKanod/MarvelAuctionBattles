import React, { useState, useEffect } from 'react';
import { RoomState, TournamentState, TournamentMatch, BattleMatchup, TeamBattleResult } from '../../../../shared/types';
import { ComicCard } from '../ui/ComicCard';
import { ComicButton } from '../ui/ComicButton';
import { SoundManager } from '../../sound/SoundManager';
import confetti from 'canvas-confetti';
import { Swords, Trophy, FastForward, Shield, Zap, Sparkles } from 'lucide-react';

interface BattleArenaProps {
  room: RoomState;
  tournament: TournamentState;
  selfPlayerId: string;
  onNextBattle: () => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  room,
  tournament,
  selfPlayerId,
  onNextBattle
}) => {
  const isHost = room.hostId === selfPlayerId;

  // Find the most recent active or just completed match
  const matches = tournament.matches;
  const currentMatchIndex = Math.min(tournament.currentMatchIndex, matches.length - 1);
  const currentMatch: TournamentMatch | undefined = matches[currentMatchIndex];

  // Animation Stage States: 'ENTRY' -> 'CLASH' -> 'RESULT'
  const [animStage, setAnimStage] = useState<'ENTRY' | 'CLASH' | 'RESULT'>('ENTRY');
  const [activeBoutIndex, setActiveBoutIndex] = useState<number>(0);

  const teamResult: TeamBattleResult | undefined = currentMatch?.teamBattleResult;
  const individualFights = teamResult?.individualFights || [];
  const currentFight: BattleMatchup | undefined = individualFights[activeBoutIndex];

  // Reset or run battle sequence when a new match or fight begins
  useEffect(() => {
    setAnimStage('ENTRY');
    SoundManager.playBattleClash();

    const clashTimer = setTimeout(() => {
      setAnimStage('CLASH');
      SoundManager.playBattleClash();
    }, 1200);

    const resultTimer = setTimeout(() => {
      setAnimStage('RESULT');
      SoundManager.playVictory();
    }, 2800);

    return () => {
      clearTimeout(clashTimer);
      clearTimeout(resultTimer);
    };
  }, [currentMatchIndex, activeBoutIndex, currentMatch?.completed]);

  const handleSkipAnimation = () => {
    setAnimStage('RESULT');
  };

  const handleNextBout = () => {
    if (activeBoutIndex < individualFights.length - 1) {
      setActiveBoutIndex(activeBoutIndex + 1);
      setAnimStage('ENTRY');
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-6">
      {/* Top Banner: Arena Header & Match Status */}
      <div className="bg-comic-panel comic-border-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase bg-comic-red text-white px-2 py-0.5">
                ARENA CLASH
              </span>
              <span className="text-xs font-bold text-comic-yellow">
                {currentMatch?.roundName || 'CHAMPIONSHIP BOUT'}
              </span>
            </div>
            <h1 className="comic-font text-4xl text-white tracking-wide">
              {currentMatch?.player1Name?.toUpperCase() || 'PLAYER 1'} VS{' '}
              {currentMatch?.player2Name?.toUpperCase() || 'PLAYER 2'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Skip Animation Toggle */}
            <ComicButton
              variant="dark"
              size="sm"
              onClick={handleSkipAnimation}
              className="text-xs"
            >
              <FastForward className="w-4 h-4 text-comic-yellow" /> SKIP ANIMATION
            </ComicButton>

            {/* Host Next Match Control */}
            {isHost && currentMatch?.completed && (
              <ComicButton
                variant="yellow"
                size="md"
                onClick={onNextBattle}
              >
                PROCEED NEXT BOUT →
              </ComicButton>
            )}
          </div>
        </div>

        {/* Live Team Scoreboard Bar */}
        {teamResult && (
          <div className="mt-4 pt-4 border-t-2 border-black flex justify-around items-center bg-black/80 comic-border p-3">
            <div className="text-center">
              <span className="text-xs font-black text-zinc-400 uppercase block truncate max-w-[150px]">
                {teamResult.team1PlayerName}
              </span>
              <span className="comic-font text-4xl text-comic-yellow">
                {teamResult.team1Wins} WINS
              </span>
            </div>

            <div className="comic-font text-2xl text-comic-red px-3">
              VS
            </div>

            <div className="text-center">
              <span className="text-xs font-black text-zinc-400 uppercase block truncate max-w-[150px]">
                {teamResult.team2PlayerName}
              </span>
              <span className="comic-font text-4xl text-comic-yellow">
                {teamResult.team2Wins} WINS
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main 1v1 Clash Arena */}
      {currentFight ? (
        <div className="space-y-6">
          {/* Bout Title & Navigation */}
          <div className="flex justify-between items-center bg-black comic-border p-3">
            <span className="comic-font text-xl text-comic-yellow tracking-wide">
              {currentFight.matchTitle}
            </span>
            <div className="flex gap-2">
              {individualFights.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveBoutIndex(idx);
                    setAnimStage('ENTRY');
                  }}
                  className={`w-8 h-8 comic-border text-xs font-black ${
                    activeBoutIndex === idx
                      ? 'bg-comic-red text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Versus Stage Box */}
          <div className="relative bg-comic-panel comic-border-xl p-6 overflow-hidden">
            {/* Action Lines Effect in Background during Clash */}
            {animStage === 'CLASH' && (
              <div className="absolute inset-0 action-lines opacity-40 pointer-events-none" />
            )}

            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
              {/* Fighter 1 Card (5 cols) */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="text-center mb-2">
                  <span className="text-xs font-black uppercase text-comic-yellow bg-black px-2 py-0.5 border border-zinc-700">
                    {currentFight.player1Name}'s Vanguard
                  </span>
                </div>
                <ComicCard
                  character={currentFight.char1}
                  showStats={true}
                  isWinning={animStage === 'RESULT' && currentFight.winnerId === currentFight.player1Id}
                  isLosing={animStage === 'RESULT' && currentFight.loserId === currentFight.player1Id}
                  className="w-full max-w-sm"
                />
              </div>

              {/* Center VS Clash Icon (1 col) */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-4">
                <div
                  className={`w-16 h-16 bg-comic-yellow border-4 border-black flex items-center justify-center rotate-[-8deg] shadow-comic-xl z-20 ${
                    animStage === 'CLASH' ? 'scale-125 animate-ping' : ''
                  }`}
                >
                  <span className="comic-font text-3xl text-black">VS</span>
                </div>
              </div>

              {/* Fighter 2 Card (5 cols) */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="text-center mb-2">
                  <span className="text-xs font-black uppercase text-comic-yellow bg-black px-2 py-0.5 border border-zinc-700">
                    {currentFight.player2Name}'s Vanguard
                  </span>
                </div>
                <ComicCard
                  character={currentFight.char2}
                  showStats={true}
                  isWinning={animStage === 'RESULT' && currentFight.winnerId === currentFight.player2Id}
                  isLosing={animStage === 'RESULT' && currentFight.loserId === currentFight.player2Id}
                  className="w-full max-w-sm"
                />
              </div>
            </div>

            {/* Battle Narrative Breakdown Box */}
            {animStage === 'RESULT' && (
              <div className="mt-6 pt-6 border-t-4 border-black bg-black/90 p-5 comic-border animate-pop-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-comic-red text-white comic-font text-xl px-3 py-0.5 border-2 border-black rotate-[-3deg]">
                      WINNER: {currentFight.winnerName.toUpperCase()}
                    </span>
                    <span className="text-xs font-black text-comic-yellow bg-zinc-900 px-2 py-1 border border-zinc-700">
                      DECISIVE: {currentFight.decisiveAdvantage}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    Combat Rating: {currentFight.char1Score} vs {currentFight.char2Score}
                  </span>
                </div>

                <p className="text-base text-zinc-100 font-semibold mb-3 leading-relaxed">
                  {currentFight.reason}
                </p>

                {currentFight.keyFactors && currentFight.keyFactors.length > 0 && (
                  <div className="space-y-1 bg-zinc-950 p-3 border border-zinc-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-comic-yellow block mb-1">
                      KEY MATCHUP FACTORS:
                    </span>
                    {currentFight.keyFactors.map((factor, idx) => (
                      <p key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                        <span className="text-comic-red">⚡</span>
                        <span>{factor}</span>
                      </p>
                    ))}
                  </div>
                )}

                {/* Next Bout Button if more bouts in this team match */}
                {activeBoutIndex < individualFights.length - 1 && (
                  <div className="mt-4 flex justify-end">
                    <ComicButton
                      variant="yellow"
                      size="sm"
                      onClick={handleNextBout}
                    >
                      WATCH NEXT BOUT (#{activeBoutIndex + 2}) →
                    </ComicButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Standby state before match starts */
        <div className="bg-comic-panel comic-border-lg p-12 text-center">
          <h3 className="comic-font text-4xl text-white mb-4">
            MATCH READY TO COMMENCE
          </h3>
          <p className="text-zinc-300 font-semibold mb-6">
            Both commanders have locked in their lineups. Prepare for the clash!
          </p>
          {isHost && (
            <ComicButton
              variant="primary"
              size="lg"
              onClick={onNextBattle}
            >
              COMMENCE BATTLE! ⚔️
            </ComicButton>
          )}
        </div>
      )}

      {/* Visual Tournament Bracket Tree */}
      <div className="mt-8 bg-comic-panel comic-border-lg p-6">
        <h3 className="comic-font text-2xl text-comic-yellow tracking-wide mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" /> TOURNAMENT BRACKET
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match, idx) => (
            <div
              key={match.matchId}
              className={`comic-border p-4 relative ${
                match.completed
                  ? 'bg-zinc-950 border-zinc-700'
                  : idx === currentMatchIndex
                  ? 'bg-black border-comic-yellow'
                  : 'bg-zinc-900 border-zinc-800 opacity-60'
              }`}
            >
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-zinc-800">
                <span className="text-[10px] font-black uppercase text-comic-red">
                  {match.roundName}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {match.completed ? '✓ COMPLETED' : 'PENDING'}
                </span>
              </div>

              <div className="space-y-1.5 text-sm font-bold">
                <div
                  className={`flex justify-between p-1.5 rounded-none ${
                    match.winnerId === match.player1Id ? 'bg-green-950 text-green-300 font-black' : 'text-white'
                  }`}
                >
                  <span className="truncate">{match.player1Name || 'TBD'}</span>
                  {match.teamBattleResult && (
                    <span className="font-mono text-comic-yellow">
                      {match.teamBattleResult.team1Wins}
                    </span>
                  )}
                </div>

                <div
                  className={`flex justify-between p-1.5 rounded-none ${
                    match.winnerId === match.player2Id ? 'bg-green-950 text-green-300 font-black' : 'text-white'
                  }`}
                >
                  <span className="truncate">{match.player2Name || 'TBD'}</span>
                  {match.teamBattleResult && (
                    <span className="font-mono text-comic-yellow">
                      {match.teamBattleResult.team2Wins}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
