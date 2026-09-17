import React, { useState } from 'react';
import { ComicButton } from '../ui/ComicButton';
import { RoomSettings } from '../../../../shared/types';
import {
  COIN_OPTIONS,
  CHARACTERS_PER_PLAYER_OPTIONS,
  BID_INCREMENT_OPTIONS,
  PLAYER_COUNT_OPTIONS,
  DEFAULT_ROOM_SETTINGS
} from '../../../../shared/constants';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (playerName: string, settings: RoomSettings) => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  if (!isOpen) return null;

  const [playerName, setPlayerName] = useState('');
  const [settings, setSettings] = useState<RoomSettings>({ ...DEFAULT_ROOM_SETTINGS });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your player name');
      return;
    }
    setError('');
    onCreate(playerName.trim(), settings);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-comic-panel comic-border-xl max-w-lg w-full overflow-hidden animate-pop-in">
        {/* Modal Header */}
        <div className="bg-comic-red p-4 border-b-4 border-black flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-black bg-comic-yellow px-2 py-0.5 border border-black">
              HOST LOBBY
            </span>
            <h2 className="comic-font text-3xl text-white tracking-wide mt-1">
              CREATE ROOM
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-black text-white font-black text-xl hover:bg-zinc-800 border-2 border-black flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-comic-red border-2 border-black p-2.5 text-white text-xs font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Player Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              YOUR DISPLAY NAME
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="e.g. IronSpidey, Thor99"
              maxLength={18}
              className="w-full bg-black border-3 border-black text-white font-bold p-3 focus:outline-none focus:border-comic-yellow text-base shadow-comic-sm"
              autoFocus
            />
          </div>

          {/* Player Count */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              MAX PLAYERS (2–6)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PLAYER_COUNT_OPTIONS.map((count) => (
                <button
                  type="button"
                  key={count}
                  onClick={() => setSettings({ ...settings, maxPlayers: count })}
                  className={`py-2 text-center comic-border font-black text-sm transition-all ${
                    settings.maxPlayers === count
                      ? 'bg-comic-yellow text-black'
                      : 'bg-black text-zinc-400 hover:text-white'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Characters Per Player */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              CHARACTERS PER PLAYER
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CHARACTERS_PER_PLAYER_OPTIONS.map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setSettings({ ...settings, charactersPerPlayer: num })}
                  className={`py-2 text-center comic-border font-black text-sm transition-all ${
                    settings.charactersPerPlayer === num
                      ? 'bg-comic-yellow text-black'
                      : 'bg-black text-zinc-400 hover:text-white'
                  }`}
                >
                  {num} HEROES
                </button>
              ))}
            </div>
          </div>

          {/* Starting Coins */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              STARTING COINS
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COIN_OPTIONS.map((coins) => (
                <button
                  type="button"
                  key={coins}
                  onClick={() => setSettings({ ...settings, startingCoins: coins })}
                  className={`py-2 text-center comic-border font-black text-sm transition-all ${
                    settings.startingCoins === coins
                      ? 'bg-comic-yellow text-black'
                      : 'bg-black text-zinc-400 hover:text-white'
                  }`}
                >
                  🪙 {coins}
                </button>
              ))}
            </div>
          </div>

          {/* Bid Increment */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              AUCTION BID INCREMENT
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BID_INCREMENT_OPTIONS.map((inc) => (
                <button
                  type="button"
                  key={inc}
                  onClick={() => setSettings({ ...settings, bidIncrement: inc })}
                  className={`py-2 text-center comic-border font-black text-sm transition-all ${
                    settings.bidIncrement === inc
                      ? 'bg-comic-yellow text-black'
                      : 'bg-black text-zinc-400 hover:text-white'
                  }`}
                >
                  +{inc} 🪙
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <ComicButton type="submit" variant="primary" size="lg" className="w-full">
              LAUNCH ROOM & ENTER LOBBY
            </ComicButton>
          </div>
        </form>
      </div>
    </div>
  );
};
