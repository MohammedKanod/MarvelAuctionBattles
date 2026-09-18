import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, X } from 'lucide-react';

interface UpdatePromptProps {
  currentPhase?: string | null;
}

export const UpdatePrompt: React.FC<UpdatePromptProps> = ({ currentPhase }) => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleRegistration = (reg: ServiceWorkerRegistration) => {
      // Check if there's already a waiting worker
      if (reg.waiting) {
        setWaitingWorker(reg.waiting);
        setHasUpdate(true);
      }

      // Listen for newly installed workers
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
            setHasUpdate(true);
          }
        });
      });
    };

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) handleRegistration(reg);
    });

    // When the controlling service worker changes, reload the page
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  const handleApplyUpdate = () => {
    setIsReloading(true);
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
  };

  // Never interrupt active, high-stakes auctions or battle clashes!
  const isProtectedPhase = currentPhase === 'AUCTION' || currentPhase === 'BATTLE';

  if (!hasUpdate || isDismissed || isProtectedPhase) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-bounce-short">
      <div className="bg-comic-panel border-3 border-comic-yellow p-4 shadow-comic-xl flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-comic-yellow text-black flex items-center justify-center border-2 border-black rotate-[-6deg] shadow-comic-sm shrink-0">
            <Zap className="w-5 h-5 fill-black" />
          </div>
          <div>
            <p className="comic-font text-base text-comic-yellow tracking-wider leading-tight">
              NEW VERSION AVAILABLE
            </p>
            <p className="text-[11px] text-zinc-300 font-semibold leading-tight mt-0.5">
              Updates deployed from GitHub. Tap reload to apply.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleApplyUpdate}
            disabled={isReloading}
            className="comic-btn bg-comic-red hover:bg-red-600 text-white text-xs font-black px-3 py-2 flex items-center gap-1.5 shadow-comic-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span>{isReloading ? 'UPDATING...' : 'RELOAD'}</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-400 hover:text-white p-1"
            title="Dismiss until next launch"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
