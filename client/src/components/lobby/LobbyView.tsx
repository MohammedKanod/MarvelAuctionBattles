import React, { useState } from 'react';
import { RoomState, Player } from '../../../../shared/types';
import { ComicButton } from '../ui/ComicButton';
import { gameAnalytics } from '../../analytics/gameAnalytics';
import { SoundManager } from '../../sound/SoundManager';
import { Copy, Check, Crown, User, ShieldAlert, Sparkles, BookOpen, Smartphone, Share2, Link2 } from 'lucide-react';

interface LobbyViewProps {
  room: RoomState;
  selfPlayer: Player;
  onToggleReady: () => void;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onOpenRoster?: () => void;
  onInstallApp?: () => void;
  isInstalled?: boolean;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  room,
  selfPlayer,
  onToggleReady,
  onStartGame,
  onLeaveRoom,
  onOpenRoster,
  onInstallApp,
  isInstalled = false
}) => {
  const [copied, setCopied] = useState(false);

  const getInviteUrl = () => {
    return `${window.location.origin}/join/${room.roomCode}`;
  };

  const handleCopyInviteLink = () => {
    const url = getInviteUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    SoundManager.playClick();
    gameAnalytics.shareClicked('clipboard', room.roomCode);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    const url = getInviteUrl();
    SoundManager.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Battle Auction',
          text: `Play Battle Auction with me! Join my battle: ${url}`,
          url
        });
        gameAnalytics.shareClicked('web_share', room.roomCode);
      } catch (err: any) {
        // Fallback to clipboard if user dismissed or canceled
        if (err.name !== 'AbortError') {
          handleCopyInviteLink();
        }
      }
    } else {
      handleCopyInviteLink();
    }
  };

  const isHost = selfPlayer.isHost;
  const canStart =
    room.players.length >= 2 &&
    room.players.filter((p) => !p.isHost).every((p) => p.isReady);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-6">
      {/* Lobby Top Header */}
      <div className="bg-comic-panel comic-border-lg p-5 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase bg-comic-red text-white px-2 py-0.5">
                MULTIPLAYER LOBBY
              </span>
              <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SERVER AUTHORITATIVE
              </span>
            </div>
            <h1 className="comic-font text-3xl sm:text-4xl text-white tracking-wide">
              ASSEMBLE YOUR HEROES
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenRoster && (
              <button
                onClick={onOpenRoster}
                className="comic-btn bg-black hover:bg-zinc-800 text-comic-yellow border-2 border-comic-yellow px-3 py-2 flex items-center gap-2 shadow-comic-sm"
                title="Browse all 200 multiverse heroes"
              >
                <BookOpen className="w-4 h-4 text-comic-yellow" />
                <span className="text-xs font-black uppercase">HERO ROSTER (200)</span>
              </button>
            )}

            {onInstallApp && !isInstalled && (
              <button
                onClick={onInstallApp}
                className="comic-btn bg-comic-red hover:bg-red-600 text-white border-2 border-black px-3 py-2 flex items-center gap-1.5 text-xs font-black uppercase shadow-comic-sm animate-pulse"
                title="Install Web App on your phone"
              >
                <Smartphone className="w-4 h-4 text-comic-yellow" />
                <span>INSTALL APP</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile-First Shareable Room & Invite Controls (Part 4 & Part 7) */}
        <div className="mt-5 pt-4 border-t-2 border-black/80">
          <div className="bg-black/90 comic-border p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-comic-sm">
            {/* Room Code and Status */}
            <div className="flex items-center gap-3">
              <div className="bg-[#12131b] border-2 border-amber-400/80 px-3 py-1.5 rounded-sm">
                <span className="text-[10px] font-black uppercase text-zinc-400 block leading-none">
                  ROOM CODE
                </span>
                <span className="comic-font text-2xl sm:text-3xl text-comic-yellow tracking-widest font-mono">
                  {room.roomCode}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-300 block">
                  Waiting for players...
                </span>
                <span className="text-xs font-black text-amber-400 font-mono">
                  {room.players.length} / {room.settings.maxPlayers} players
                </span>
              </div>
            </div>

            {/* Action Buttons: COPY INVITE LINK & SHARE */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyInviteLink}
                className="flex-1 sm:flex-initial comic-btn bg-comic-yellow hover:bg-yellow-300 text-black px-4 py-2.5 flex items-center justify-center gap-1.5 min-h-[44px] shadow-comic-sm font-black text-xs uppercase transition-all"
                title="Copy shareable invite link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black stroke-[3]" />
                    <span>LINK COPIED!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4 text-black" />
                    <span>COPY INVITE LINK</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex-1 sm:flex-initial comic-btn bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-black px-4 py-2.5 flex items-center justify-center gap-1.5 min-h-[44px] shadow-comic-sm font-black text-xs uppercase transition-all"
                title="Share invite via message or app"
              >
                <Share2 className="w-4 h-4 text-comic-yellow" />
                <span>SHARE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Player List & Settings Confirmation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Players List (2 Cols on desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="comic-font text-2xl text-white tracking-wide flex items-center gap-2">
              <span>PLAYERS IN LOBBY</span>
              <span className="bg-black text-comic-yellow text-sm px-2 py-0.5 comic-border font-mono font-bold">
                {room.players.length} / {room.settings.maxPlayers}
              </span>
            </h3>
            {room.players.length < 2 && (
              <span className="text-xs font-bold text-comic-red animate-pulse">
                ⚠️ Need at least 2 players to begin
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {room.players.map((player) => (
              <div
                key={player.id}
                className={`comic-border p-4 relative transition-all ${
                  player.id === selfPlayer.id ? 'bg-zinc-900 border-comic-yellow' : 'bg-comic-panel'
                }`}
              >
                {/* Host Crown */}
                {player.isHost && (
                  <div className="absolute top-2 right-2 bg-comic-yellow text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black flex items-center gap-1">
                    <Crown className="w-3 h-3" /> HOST
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {/* Avatar Icon */}
                  <div className="w-12 h-12 bg-black border-2 border-zinc-700 flex items-center justify-center text-2xl">
                    {['⚡', '🛡️', '⚔️', '💥', '🧠', '🔮', '🕸️', '🐾'][player.avatarSeed % 8]}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-black text-lg text-white truncate max-w-[140px]">
                        {player.name}
                      </h4>
                      {player.id === selfPlayer.id && (
                        <span className="text-[10px] font-black bg-comic-red text-white px-1.5 py-0.2">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-comic-yellow font-mono">
                        🪙 {player.coins}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold">•</span>
                      <span
                        className={`text-[10px] font-black uppercase px-1.5 py-0.2 ${
                          player.isReady
                            ? 'bg-green-800 text-green-100 border border-green-500'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-600'
                        }`}
                      >
                        {player.isReady ? 'READY' : 'NOT READY'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: Math.max(0, room.settings.maxPlayers - room.players.length) }).map(
              (_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="border-3 border-dashed border-zinc-800 p-6 flex flex-col items-center justify-center text-zinc-600"
                >
                  <User className="w-8 h-8 mb-1 opacity-30" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    WAITING FOR PLAYER...
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Room Settings Confirmation Panel */}
        <div className="bg-black/90 comic-border-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 border-b-2 border-zinc-800 pb-2">
              <Sparkles className="w-5 h-5 text-comic-yellow" />
              <h3 className="comic-font text-2xl text-comic-yellow tracking-wide">
                GAME SETTINGS
              </h3>
            </div>

            <div className="space-y-3 text-sm font-semibold">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Total Players:</span>
                <span className="text-white font-mono font-bold">
                  {room.players.length} / {room.settings.maxPlayers}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Heroes per Player:</span>
                <span className="text-comic-yellow font-bold">
                  {room.settings.charactersPerPlayer} Characters
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Starting Coins:</span>
                <span className="text-comic-yellow font-mono font-bold">
                  🪙 {room.settings.startingCoins}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Bid Increment:</span>
                <span className="text-white font-mono font-bold">
                  +{room.settings.bidIncrement} 🪙
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Auction Clock:</span>
                <span className="text-white font-mono font-bold">
                  {room.settings.auctionTimerSeconds}s + Anti-Snipe
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Total Auction Rounds:</span>
                <span className="text-white font-mono font-bold">
                  {room.players.length * room.settings.charactersPerPlayer} Rounds
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Tournament Format:</span>
                <span className="text-green-400 font-bold">
                  Cinematic Championship
                </span>
              </div>
            </div>
          </div>

          {/* Action Button Section */}
          <div className="mt-6 pt-4 border-t-2 border-zinc-800 space-y-3">
            {isHost ? (
              <ComicButton
                variant={canStart ? 'primary' : 'dark'}
                size="lg"
                disabled={!canStart}
                onClick={onStartGame}
                className="w-full"
              >
                {canStart ? 'START CHARACTER AUCTION' : 'WAITING FOR READY...'}
              </ComicButton>
            ) : (
              <ComicButton
                variant={selfPlayer.isReady ? 'yellow' : 'primary'}
                size="lg"
                onClick={onToggleReady}
                className="w-full"
              >
                {selfPlayer.isReady ? 'READY! (CLICK TO CANCEL)' : 'SET READY'}
              </ComicButton>
            )}

            <button
              onClick={onLeaveRoom}
              className="w-full text-center text-xs font-black uppercase text-zinc-500 hover:text-zinc-300 py-1"
            >
              ← LEAVE ROOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
