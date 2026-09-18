import React from 'react';
import { ComicButton } from '../ui/ComicButton';
import { Volume2, VolumeX, Shield, Zap, Swords, Trophy, Hammer, BookOpen, Smartphone } from 'lucide-react';
import { SoundManager } from '../../sound/SoundManager';

interface HeroProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  onOpenHowToPlay: () => void;
  onOpenRoster: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onInstallApp?: () => void;
  isInstalled?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onCreateRoom,
  onJoinRoom,
  onOpenHowToPlay,
  onOpenRoster,
  isMuted,
  onToggleMute,
  onInstallApp,
  isInstalled = false
}) => {
  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-8">
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-comic-red border-3 border-black flex items-center justify-center rotate-[-6deg] shadow-comic-sm">
            <span className="text-xl">⚡</span>
          </div>
          <span className="comic-font text-2xl sm:text-3xl text-white tracking-wider">
            MARVEL BATTLE AUCTION
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onInstallApp && (
            <button
              onClick={() => {
                SoundManager.playClick();
                onInstallApp();
              }}
              className={`comic-btn px-3 py-2 flex items-center gap-1.5 shadow-comic-sm ${
                isInstalled
                  ? 'bg-zinc-900 border-2 border-green-400 text-green-400'
                  : 'bg-comic-red hover:bg-red-600 text-white border-2 border-black animate-pulse'
              }`}
              title="Install Web App on your device"
            >
              <Smartphone className="w-4 h-4 text-comic-yellow shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider">
                {isInstalled ? 'APP INSTALLED' : 'INSTALL APP'}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              SoundManager.playClick();
              onOpenRoster();
            }}
            className="comic-btn bg-black hover:bg-zinc-800 text-comic-yellow border-2 border-comic-yellow px-3 py-2 flex items-center gap-1.5 shadow-comic-sm"
            title="Browse all 102 Marvel heroes"
          >
            <BookOpen className="w-4 h-4 text-comic-yellow" />
            <span className="text-xs font-black uppercase hidden sm:inline">HERO ROSTER (102)</span>
          </button>

          <button
            onClick={onToggleMute}
            className="comic-btn bg-zinc-800 hover:bg-zinc-700 text-comic-yellow p-2.5 flex items-center gap-2"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span className="text-xs font-black uppercase hidden sm:inline">
              {isMuted ? 'MUTED' : 'SOUND ON'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-6 sm:my-8 z-10">
        {/* Left Column: Title & Actions */}
        <div className="w-full lg:flex-1 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
          {/* Tagline Ribbon */}
          <div className="inline-block mb-4">
            <div className="comic-ribbon bg-comic-yellow border-3 border-black px-4 py-1 shadow-comic-sm">
              <span className="comic-ribbon-content comic-font text-xl sm:text-2xl text-black tracking-wider">
                BID. BUILD. BATTLE.
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="comic-font text-5xl sm:text-7xl lg:text-8xl text-white tracking-wide uppercase leading-none drop-shadow-lg mb-6">
            MARVEL <span className="text-comic-red">BATTLE</span> <br />
            <span className="text-comic-yellow">AUCTION</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-semibold max-w-xl mb-8 leading-relaxed">
            The high-stakes superhero party game. Bid against your friends in a live character auction, draft your dream MCU lineup, and battle in high-energy tournament matchups!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 w-full sm:w-auto">
            <ComicButton
              variant="primary"
              size="lg"
              onClick={onCreateRoom}
              className="w-full sm:w-auto"
            >
              <Hammer className="w-6 h-6" /> CREATE ROOM
            </ComicButton>

            <ComicButton
              variant="yellow"
              size="lg"
              onClick={onJoinRoom}
              className="w-full sm:w-auto"
            >
              <Zap className="w-6 h-6" /> JOIN ROOM
            </ComicButton>

            <ComicButton
              variant="secondary"
              size="md"
              onClick={onOpenHowToPlay}
              className="w-full sm:w-auto"
            >
              HOW TO PLAY
            </ComicButton>

            <ComicButton
              variant="dark"
              size="md"
              onClick={onOpenRoster}
              className="w-full sm:w-auto border-2 border-comic-yellow text-comic-yellow"
            >
              🦸 HERO ROSTER (102)
            </ComicButton>
          </div>

          {/* Dedicated Web App Quick Install Banner */}
          {onInstallApp && !isInstalled && (
            <div className="mb-6 p-3 bg-gradient-to-r from-zinc-900 via-comic-panel to-zinc-900 border-2 border-cyan-400/80 shadow-comic flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shrink-0">
                  <Smartphone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="comic-font text-base text-white tracking-wide">
                      INSTALL TO HOME SCREEN
                    </span>
                    <span className="text-[9px] font-black uppercase bg-cyan-400 text-black px-1.5 py-0.5">
                      WEB APP
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    One-tap install on your phone • Zero app store download • Fullscreen
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  SoundManager.playClick();
                  onInstallApp();
                }}
                className="comic-btn bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs px-4 py-2 border-2 border-black shadow-comic-sm whitespace-nowrap w-full sm:w-auto"
              >
                ⚡ INSTALL NOW
              </button>
            </div>
          )}

          {/* Feature Highlights Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0 w-full sm:w-auto">
            <div className="bg-black/70 comic-border p-2.5 flex items-center gap-2">
              <span className="text-lg text-comic-yellow">👥</span>
              <span className="text-xs font-black uppercase text-zinc-200">2-6 PLAYERS</span>
            </div>
            <div className="bg-black/70 comic-border p-2.5 flex items-center gap-2">
              <span className="text-lg text-comic-red">🔨</span>
              <span className="text-xs font-black uppercase text-zinc-200">LIVE AUCTION</span>
            </div>
            <div
              onClick={() => {
                SoundManager.playClick();
                onOpenRoster();
              }}
              className="bg-black/70 comic-border p-2.5 flex items-center gap-2 cursor-pointer hover:bg-zinc-800 transition-colors"
              title="Click to view all 102 heroes"
            >
              <span className="text-lg text-comic-blue">🦸</span>
              <span className="text-xs font-black uppercase text-zinc-200">102 HEROES</span>
            </div>
            <div className="bg-black/70 comic-border p-2.5 flex items-center gap-2">
              <span className="text-lg text-yellow-400">⚔️</span>
              <span className="text-xs font-black uppercase text-zinc-200">1V1 ARENA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Comic Card Montage */}
        <div className="relative w-full max-w-[340px] sm:max-w-md h-[280px] sm:h-[360px] lg:h-[420px] flex items-center justify-center shrink-0 mt-8 lg:mt-0 z-0">
          {/* Action Burst Background (Angular Comic Flare, No Oval) */}
          <div className="absolute inset-2 bg-comic-red/10 border-4 border-dashed border-comic-yellow/30 rotate-2 pointer-events-none" />

          {/* Floating Hero Preview Cards */}
          {/* Card 1: Thor */}
          <div className="absolute top-1 left-2 sm:top-4 sm:left-6 w-36 sm:w-44 lg:w-48 bg-comic-panel comic-border-lg p-2 sm:p-3 rotate-[-8deg] sm:rotate-[-10deg] shadow-comic-lg hover:rotate-0 transition-transform duration-300">
            <div className="h-20 sm:h-24 lg:h-28 bg-[#2b5c8f] border-2 border-black relative overflow-hidden mb-2">
              <img
                src="/characters/thor.jpg"
                alt="Thor"
                className="w-full h-full object-cover object-[center_15%]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 left-2 text-[9px] sm:text-[10px] font-black text-comic-yellow uppercase">
                GOD OF THUNDER
              </div>
              <div className="absolute top-1 right-1 bg-comic-yellow text-black text-[8px] sm:text-[9px] font-black px-1 border border-black shadow-comic-sm">
                94 PWR
              </div>
            </div>
            <h4 className="comic-font text-lg sm:text-xl text-white">THOR</h4>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase truncate">TANK / ASG</span>
              <span className="text-xs font-black text-comic-yellow">🪙 850</span>
            </div>
          </div>

          {/* Card 2: Wanda (Scarlet Witch) */}
          <div className="absolute bottom-1 right-2 sm:bottom-4 sm:right-6 w-36 sm:w-44 lg:w-48 bg-comic-panel comic-border-lg p-2 sm:p-3 rotate-[6deg] sm:rotate-[8deg] shadow-comic-lg hover:rotate-0 transition-transform duration-300 z-10">
            <div className="h-20 sm:h-24 lg:h-28 bg-[#9b111e] border-2 border-black relative overflow-hidden mb-2">
              <img
                src="/characters/wanda.jpg"
                alt="Wanda Maximoff"
                className="w-full h-full object-cover object-[center_15%]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 left-2 text-[9px] sm:text-[10px] font-black text-comic-yellow uppercase">
                SCARLET WITCH
              </div>
              <div className="absolute top-1 right-1 bg-comic-yellow text-black text-[8px] sm:text-[9px] font-black px-1 border border-black shadow-comic-sm">
                99 PWR
              </div>
            </div>
            <h4 className="comic-font text-lg sm:text-xl text-white">WANDA</h4>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase truncate">CHAOS SORC</span>
              <span className="text-xs font-black text-comic-yellow">🪙 1200</span>
            </div>
          </div>

          {/* Center VS Action Badge */}
          <div className="absolute z-20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-comic-yellow border-3 sm:border-4 border-black flex items-center justify-center rotate-[-12deg] shadow-comic-xl animate-bounce-short">
            <span className="comic-font text-xl sm:text-2xl lg:text-3xl text-black">VS</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs font-bold text-zinc-500 uppercase tracking-wider z-10 pt-4">
        MARVEL BATTLE AUCTION • REAL-TIME MULTIPLAYER • AUTHORITATIVE BID ENGINE
      </footer>
    </div>
  );
};
