import { useState, useEffect, useCallback, useRef } from 'react';
import { SoundManager } from '../sound/SoundManager';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Global reference so prompt isn't lost during re-renders or page navigation
let savedPrompt: BeforeInstallPromptEvent | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    savedPrompt = e as BeforeInstallPromptEvent;
  });
}

export type InstallStatus = 'idle' | 'building' | 'prompting' | 'installed' | 'dismissed' | 'ios_guide';

export function usePwaInstall() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasPrompt, setHasPrompt] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING APP MATRIX...');
  const [installStatus, setInstallStatus] = useState<InstallStatus>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const animRef = useRef<number | null>(null);

  // Check standalone mode & platform on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
      if (isStandaloneMode) {
        setIsInstalled(true);
      }
    };

    checkStandalone();

    if (savedPrompt) {
      setHasPrompt(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      savedPrompt = e as BeforeInstallPromptEvent;
      setHasPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsBuilding(false);
      setInstallStatus('installed');
      savedPrompt = null;
      setHasPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const isIos =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  // 2.5 second building animation sequence
  const startBuildAndInstall = useCallback(() => {
    if (isStandalone) {
      setIsModalOpen(true);
      setInstallStatus('installed');
      return;
    }

    setIsModalOpen(true);
    setIsBuilding(true);
    setBuildProgress(0);
    setInstallStatus('building');
    setStatusText('INITIALIZING NANO-FORGE MATRIX...');

    // Play procedural charging sound
    SoundManager.playBuildingCharge();

    const DURATION = 2500; // Exact 2.5 seconds
    const startTime = performance.now();

    const updatePhase = (time: number) => {
      const elapsed = time - startTime;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setBuildProgress(pct);

      if (pct < 30) {
        setStatusText('INITIALIZING NANO-FORGE MATRIX...');
      } else if (pct < 65) {
        setStatusText('COMPILING 102 HEROES & COMBAT ENGINE...');
      } else if (pct < 90) {
        setStatusText('OPTIMIZING REAL-TIME WEBSOCKET SHELL...');
      } else {
        setStatusText('WEB APP READY! DEPLOYING TO PHONE...');
      }

      if (elapsed < DURATION) {
        animRef.current = requestAnimationFrame(updatePhase);
      } else {
        // Animation finished at 2.5 seconds!
        setIsBuilding(false);
        setBuildProgress(100);

        if (savedPrompt) {
          setInstallStatus('prompting');
          savedPrompt.prompt().then(() => {
            return savedPrompt!.userChoice;
          }).then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              setIsInstalled(true);
              setInstallStatus('installed');
            } else {
              setInstallStatus('dismissed');
            }
            savedPrompt = null;
            setHasPrompt(false);
          }).catch(() => {
            setInstallStatus('dismissed');
          });
        } else if (isIos) {
          setInstallStatus('ios_guide');
        } else {
          // If browser didn't supply prompt event (e.g. desktop Chrome already showed banner or custom browser)
          setInstallStatus('installed');
        }
      }
    };

    animRef.current = requestAnimationFrame(updatePhase);
  }, [isStandalone, isIos]);

  const closeModal = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    setIsBuilding(false);
    setIsModalOpen(false);
  }, []);

  return {
    isStandalone,
    isInstalled,
    hasPrompt,
    isBuilding,
    buildProgress,
    statusText,
    installStatus,
    isModalOpen,
    isIos,
    startBuildAndInstall,
    closeModal
  };
}
