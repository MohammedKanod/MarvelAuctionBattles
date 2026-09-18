import React, { useState } from 'react';
import { ComicButton } from '../ui/ComicButton';

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (roomCode: string, playerName: string) => void;
  initialRoomCode?: string;
}

export const JoinRoomModal: React.FC<JoinRoomModalProps> = ({
  isOpen,
  onClose,
  onJoin,
  initialRoomCode = ''
}) => {
  if (!isOpen) return null;

  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your player name');
      return;
    }
    if (!roomCode.trim() || roomCode.trim().length !== 6) {
      setError('Please enter a valid 6-character room code');
      return;
    }
    setError('');
    onJoin(roomCode.trim().toUpperCase(), playerName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-comic-panel comic-border-xl max-w-md w-full overflow-hidden animate-pop-in">
        {/* Header */}
        <div className="bg-comic-yellow p-4 border-b-4 border-black flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-black px-2 py-0.5 border border-black">
              JOIN THE BATTLE
            </span>
            <h2 className="comic-font text-3xl text-black tracking-wide mt-1">
              ENTER ROOM CODE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-black text-white font-black text-xl hover:bg-zinc-800 border-2 border-black flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-comic-red border-2 border-black p-2.5 text-white text-xs font-bold">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              YOUR DISPLAY NAME
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="e.g. Batman, IronMan, Flash"
              maxLength={18}
              className="w-full bg-black border-3 border-black text-white font-bold p-3 focus:outline-none focus:border-comic-yellow text-base shadow-comic-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-2">
              6-CHARACTER ROOM CODE
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. X7K9PQ"
              maxLength={6}
              className="w-full bg-black border-3 border-black text-comic-yellow font-mono font-black p-3 focus:outline-none focus:border-comic-yellow text-2xl tracking-widest text-center uppercase shadow-comic-sm"
            />
          </div>

          <div className="pt-2">
            <ComicButton type="submit" variant="yellow" size="lg" className="w-full">
              JOIN LOBBY NOW
            </ComicButton>
          </div>
        </form>
      </div>
    </div>
  );
};
