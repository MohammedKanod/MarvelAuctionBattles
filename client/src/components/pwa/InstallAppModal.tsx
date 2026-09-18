import React from 'react';
import { X, Sparkles, Smartphone, CheckCircle, Share2, PlusSquare, ArrowRight, Zap } from 'lucide-react';
import { InstallStatus } from '../../pwa/usePwaInstall';
import { SoundManager } from '../../sound/SoundManager';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBuilding: boolean;
  buildProgress: number;
  statusText: string;
  installStatus: InstallStatus;
  isIos: boolean;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  isBuilding,
  buildProgress,
  statusText,
  installStatus,
  isIos
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-comic-panel border-3 border-comic-yellow p-6 shadow-comic-lg overflow-hidden text-center">
        {/* Comic Action Background Glow */}
        <div className="absolute inset-0 action-lines pointer-events-none opacity-25" />

        {/* Close Button */}
        <button
          onClick={() => {
            SoundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-white bg-black/60 p-1.5 border border-zinc-700 hover:border-comic-yellow transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= PHASE 1: 2.5s BUILDING ANIMATION ================= */}
        {isBuilding ? (
          <div className="relative z-10 flex flex-col items-center py-4">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 bg-comic-red border-2 border-black px-3 py-0.5 mb-5 shadow-comic-sm rotate-[-2deg]">
              <Zap className="w-4 h-4 text-comic-yellow animate-bounce" />
              <span className="comic-font text-sm text-white tracking-widest uppercase">
                NANO-FORGE SYNTHESIS
              </span>
            </div>

            {/* Central Animated Hologram Core */}
            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              {/* Outer Counter-Rotating Energy Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-comic-yellow/50 animate-reverse-spin-slow" />

              {/* Glowing Radial Core */}
              <div
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-600/30 via-transparent to-amber-500/30 animate-pulse"
                style={{ filter: 'blur(8px)' }}
              />

              {/* Floating App Icon with Electric Halo */}
              <div className="relative z-10 w-24 h-24 bg-comic-dark border-3 border-comic-yellow p-1.5 shadow-comic flex items-center justify-center animate-pulse-glow">
                <img
                  src="/icons/icon-192x192.png"
                  alt="App Icon"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Floating Energy Sparks */}
              <div className="absolute -top-1 left-1/4 text-comic-yellow text-xs animate-ping">⚡</div>
              <div className="absolute -bottom-1 right-1/4 text-cyan-400 text-xs animate-ping" style={{ animationDelay: '0.4s' }}>✦</div>
              <div className="absolute top-1/2 -right-2 text-amber-400 text-xs animate-ping" style={{ animationDelay: '0.7s' }}>⚡</div>
            </div>

            {/* Percentage Readout */}
            <div className="comic-font text-4xl text-comic-yellow tracking-wider mt-4 mb-1">
              {buildProgress}%
            </div>

            {/* Dynamic Status Text */}
            <p className="text-xs font-black text-cyan-300 tracking-wider uppercase mb-5 min-h-[1.5rem] animate-pulse">
              {statusText}
            </p>

            {/* High-Tech Animated Progress Bar */}
            <div className="w-full bg-black border-2 border-zinc-700 h-5 p-0.5 mb-3 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-comic-yellow to-amber-400 transition-all duration-75 ease-out"
                style={{ width: `${buildProgress}%` }}
              />
            </div>

            <p className="text-[11px] text-zinc-400 font-medium">
              Generating standalone web app container for your device...
            </p>
          </div>
        ) : installStatus === 'installed' ? (
          /* ================= PHASE 2: INSTALLED SUCCESS ================= */
          <div className="relative z-10 flex flex-col items-center py-4">
            <div className="w-16 h-16 bg-green-500/20 border-3 border-green-400 text-green-400 flex items-center justify-center rounded-full mb-4 shadow-comic">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="comic-ribbon bg-comic-yellow border-2 border-black px-3 py-0.5 mb-3">
              <span className="comic-font text-lg text-black tracking-wider">
                APP READY ON HOME SCREEN!
              </span>
            </div>

            <p className="text-sm text-zinc-300 font-semibold mb-6 leading-relaxed">
              <span className="text-white font-bold">Battle Auction</span> is now installed directly in your browser. Launch it anytime from your home screen for fullscreen gameplay and instant loading!
            </p>

            <button
              onClick={() => {
                SoundManager.playClick();
                onClose();
              }}
              className="comic-btn bg-comic-yellow hover:bg-yellow-400 text-black font-black uppercase text-sm px-6 py-3 border-2 border-black shadow-comic w-full"
            >
              CONTINUE PLAYING
            </button>
          </div>
        ) : installStatus === 'ios_guide' ? (
          /* ================= PHASE 3: IOS SAFARI INSTRUCTIONS ================= */
          <div className="relative z-10 flex flex-col items-center py-2 text-left">
            <div className="text-center w-full mb-4">
              <div className="inline-flex items-center gap-1.5 bg-blue-600 border-2 border-black px-3 py-0.5 shadow-comic-sm">
                <Smartphone className="w-4 h-4 text-white" />
                <span className="comic-font text-sm text-white tracking-wider">
                  INSTALL ON IPHONE / IPAD
                </span>
              </div>
              <h3 className="comic-font text-xl text-white mt-2">
                ADD TO HOME SCREEN
              </h3>
            </div>

            <div className="space-y-3 w-full text-xs text-zinc-200 mb-5">
              <div className="flex items-center gap-3 bg-black/60 p-2.5 border border-zinc-700">
                <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center text-white shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white">1. Tap the Share button</span>
                  <p className="text-zinc-400 text-[11px]">Located at the bottom of Safari</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/60 p-2.5 border border-zinc-700">
                <div className="w-7 h-7 rounded bg-zinc-700 flex items-center justify-center text-white shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white">2. Select "Add to Home Screen"</span>
                  <p className="text-zinc-400 text-[11px]">Scroll down in the share sheet</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/60 p-2.5 border border-zinc-700">
                <div className="w-7 h-7 rounded bg-comic-yellow flex items-center justify-center text-black font-black text-xs shrink-0">
                  ADD
                </div>
                <div>
                  <span className="font-bold text-white">3. Tap "Add" in top right</span>
                  <p className="text-zinc-400 text-[11px]">The web app will appear on your phone!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                SoundManager.playClick();
                onClose();
              }}
              className="comic-btn bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs px-4 py-2.5 border border-zinc-600 w-full text-center"
            >
              GOT IT, THANKS!
            </button>
          </div>
        ) : (
          /* ================= PHASE 4: PROMPT TRIGGERED OR DISMISSED ================= */
          <div className="relative z-10 flex flex-col items-center py-4">
            <div className="w-14 h-14 bg-comic-yellow/20 border-2 border-comic-yellow text-comic-yellow flex items-center justify-center rounded-full mb-3 shadow-comic">
              <Smartphone className="w-7 h-7" />
            </div>

            <h3 className="comic-font text-2xl text-white mb-2">
              WEB APP DEPLOYED
            </h3>

            <p className="text-xs text-zinc-300 mb-6 leading-relaxed">
              If your browser showed the prompt, confirm "Install" to place the icon on your home screen. You can also tap your browser's menu (⋮) and select <span className="text-comic-yellow font-bold">"Install app"</span> or <span className="text-comic-yellow font-bold">"Add to Home screen"</span> at any time.
            </p>

            <button
              onClick={() => {
                SoundManager.playClick();
                onClose();
              }}
              className="comic-btn bg-comic-yellow hover:bg-yellow-400 text-black font-black text-xs px-6 py-2.5 border-2 border-black shadow-comic w-full"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
