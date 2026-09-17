import React, { useState } from 'react';
import { ComicButton } from '../ui/ComicButton';
import { RoomSettings } from '../../../../shared/types';
import {
  COIN_OPTIONS,
  CHARACTERS_PER_PLAYER_OPTIONS,
  COIN_PRESETS_BY_CHAR_COUNT,
  BID_INCREMENT_OPTIONS,
  AUCTION_TIMER_OPTIONS,
  DEFAULT_ROOM_SETTINGS
} from '../../../../shared/constants';
import { ChevronDown, ChevronUp, Swords, Clock, Coins, ShieldCheck } from 'lucide-react';

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
  const [settings, setSettings] = useState<RoomSettings>({
    ...DEFAULT_ROOM_SETTINGS,
    maxPlayers: 2,
    charactersPerPlayer: 3,
    startingCoins: 1000,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState('');

  const handleCharCountSelect = (num: 3 | 5 | 7 | 11) => {
    const presetCoins = COIN_PRESETS_BY_CHAR_COUNT[num] || 1000;
    setSettings((prev) => ({
      ...prev,
      charactersPerPlayer: num,
      startingCoins: presetCoins
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your player name');
      return;
    }
    setError('');
    onCreate(playerName.trim(), { ...settings, maxPlayers: 2 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-comic-panel comic-border-xl max-w-lg w-full overflow-hidden animate-pop-in max-h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-comic-red p-4 border-b-4 border-black flex justify-between items-center flex-shrink-0">
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
            className="w-10 h-10 bg-black text-white font-black text-xl hover:bg-zinc-800 border-2 border-black flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="bg-comic-red border-2 border-black p-2.5 text-white text-xs font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Player Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
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

          {/* Strict 2-Player Head-to-Head Notice */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
              GAME MODE
            </label>
            <div className="p-3 bg-black/80 comic-border border-comic-yellow flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-comic-red border-2 border-black flex items-center justify-center text-lg flex-shrink-0 shadow-comic-sm">
                  <Swords className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="comic-font text-white text-lg tracking-wide">
                    1v1 HEAD-TO-HEAD DUEL
                  </div>
                  <div className="text-[11px] text-zinc-400 font-bold">
                    Strictly 2 Players · Direct Auction Clash & Battle
                  </div>
                </div>
              </div>
              <span className="bg-comic-yellow text-black text-xs font-black px-2.5 py-1 border border-black uppercase tracking-wider shadow-comic-sm">
                2 PLAYERS
              </span>
            </div>
          </div>

          {/* Characters Per Player with Coin Presets */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-300">
                TEAM SIZE & COIN PRESET
              </label>
              <span className="text-[11px] font-bold text-comic-yellow">
                🪙 {settings.startingCoins} Coins / player
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CHARACTERS_PER_PLAYER_OPTIONS.map((num) => {
                const preset = COIN_PRESETS_BY_CHAR_COUNT[num];
                const isSelected = settings.charactersPerPlayer === num;
                return (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handleCharCountSelect(num)}
                    className={`p-2.5 text-center comic-border font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-comic-yellow text-black shadow-comic-sm scale-[1.02]'
                        : 'bg-black text-zinc-300 hover:text-white hover:border-zinc-500'
                    }`}
                  >
                    <div className="text-base font-black tracking-tight">{num} HEROES</div>
                    <div className={`text-[10px] font-extrabold uppercase mt-0.5 ${isSelected ? 'text-black' : 'text-comic-yellow'}`}>
                      🪙 {preset} COINS
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expandable Advanced Settings: Regulate Bidding Timing & Overrides */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-2.5 bg-black/70 border-2 border-zinc-700 flex items-center justify-between text-xs font-black uppercase text-zinc-300 hover:text-white hover:border-comic-yellow transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-comic-yellow" />
                ADVANCED SETTINGS: REGULATE BID TIMING ({settings.auctionTimerSeconds}s)
              </span>
              <span className="text-[11px] text-comic-yellow flex items-center gap-1 font-mono">
                {showAdvanced ? (
                  <>LESS <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>MORE <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </span>
            </button>

            {showAdvanced && (
              <div className="p-3.5 mt-2 bg-black/90 border-2 border-dashed border-zinc-700 space-y-4 animate-pop-in">
                {/* Auction Bidding Countdown Regulation */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-comic-yellow flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> AUCTION BID TIMER
                    </label>
                    <span className="text-[10px] font-bold text-zinc-400">
                      Seconds to bid before sold
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {AUCTION_TIMER_OPTIONS.map((sec) => (
                      <button
                        type="button"
                        key={sec}
                        onClick={() => setSettings({ ...settings, auctionTimerSeconds: sec })}
                        className={`py-1.5 text-center comic-border font-black text-xs transition-all cursor-pointer ${
                          settings.auctionTimerSeconds === sec
                            ? 'bg-comic-red text-white'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    ⚡ Faster timer increases urgency. Anti-snipe extends timer by 4s if bid is placed in final 3s.
                  </p>
                </div>

                {/* Custom Coins Override */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-zinc-300 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-400" /> CUSTOM COIN OVERRIDE
                    </label>
                    <span className="text-[10px] font-bold text-zinc-400">
                      Default is preset by hero count
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {COIN_OPTIONS.map((coins) => (
                      <button
                        type="button"
                        key={coins}
                        onClick={() => setSettings({ ...settings, startingCoins: coins })}
                        className={`py-1.5 text-center comic-border font-black text-xs transition-all cursor-pointer ${
                          settings.startingCoins === coins
                            ? 'bg-comic-yellow text-black'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        🪙 {coins}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bid Increment */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-300 mb-1">
                    AUCTION BID INCREMENT
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BID_INCREMENT_OPTIONS.map((inc) => (
                      <button
                        type="button"
                        key={inc}
                        onClick={() => setSettings({ ...settings, bidIncrement: inc })}
                        className={`py-1.5 text-center comic-border font-black text-xs transition-all cursor-pointer ${
                          settings.bidIncrement === inc
                            ? 'bg-comic-yellow text-black'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        +{inc} 🪙
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-green-400 bg-green-950/40 p-2 border border-green-800/60 rounded">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Each player receives 3 Passes per game. Heroes can be deployed once in battle.</span>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex-shrink-0">
            <ComicButton type="submit" variant="primary" size="lg" className="w-full shadow-comic">
              LAUNCH 1v1 ROOM & ENTER LOBBY
            </ComicButton>
          </div>
        </form>
      </div>
    </div>
  );
};
