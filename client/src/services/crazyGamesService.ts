import { SoundManager } from '../sound/SoundManager';

declare global {
  interface Window {
    CrazyGames?: {
      SDK: {
        environment: 'crazygames' | 'local' | 'disabled';
        init: () => Promise<void>;
        game: {
          loadingStart: () => void;
          loadingStop: () => void;
          gameplayStart: () => void;
          gameplayStop: () => void;
          happytime: () => void;
        };
        ad: {
          requestAd: (
            type: 'midgame' | 'rewarded',
            callbacks?: {
              adStarted?: () => void;
              adFinished?: () => void;
              adError?: (error: any) => void;
            }
          ) => void;
          hasAdblock?: () => Promise<boolean>;
        };
        banner?: {
          requestBanner: (options: { id: string; width: number; height: number }) => void;
          requestResponsiveBanner: (containerId: string) => void;
          clearBanner: (containerId: string) => void;
          clearAllBanners: () => void;
        };
        user?: {
          getUser: () => Promise<{ username?: string; profilePictureUrl?: string } | null>;
          isUserAccountAvailable: () => Promise<boolean>;
          showAuthPrompt: () => Promise<any>;
        };
      };
    };
    __MAB_SERVER_URL__?: string;
  }
}

class CrazyGamesService {
  private initialized: boolean = false;
  private isPlatformAvailable: boolean = false;
  private isGameplayActive: boolean = false;
  private isAdPlaying: boolean = false;
  private preAdMuteState: boolean = false;

  /**
   * Initializes the CrazyGames SDK v3 safely.
   * If running on CrazyGames or in local test environment, activates SDK.
   * If running in a regular web browser, silently no-ops with zero side effects.
   */
  public async init(): Promise<boolean> {
    if (this.initialized) return this.isPlatformAvailable;
    this.initialized = true;

    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const sdk = window.CrazyGames?.SDK;
      if (!sdk) {
        // SDK script not loaded or blocked; standard browser mode
        this.isPlatformAvailable = false;
        return false;
      }

      const env = sdk.environment;
      if (env !== 'crazygames' && env !== 'local') {
        // Disabled environment: standard browser deployment
        this.isPlatformAvailable = false;
        return false;
      }

      await sdk.init();
      this.isPlatformAvailable = true;
      console.log(`[CrazyGames] SDK v3 initialized successfully in "${env}" environment.`);

      // Notify platform that asset loading has begun
      this.loadingStart();

      // Check if player is logged in on CrazyGames and pre-fill username
      this.syncUserProfile();

      return true;
    } catch (err) {
      console.warn('[CrazyGames] SDK init skipped (running in standard browser mode):', err);
      this.isPlatformAvailable = false;
      return false;
    }
  }

  /**
   * Returns whether the game is actively running on the CrazyGames platform.
   */
  public isCrazyGames(): boolean {
    if (typeof window === 'undefined') return false;
    const sdkEnv = window.CrazyGames?.SDK?.environment;
    return (
      this.isPlatformAvailable ||
      sdkEnv === 'crazygames' ||
      window.location.hostname.includes('crazygames')
    );
  }

  /**
   * Syncs the user's CrazyGames username if logged in.
   */
  private async syncUserProfile() {
    try {
      const userModule = window.CrazyGames?.SDK?.user;
      if (!userModule) return;

      const available = await userModule.isUserAccountAvailable?.();
      if (available) {
        const user = await userModule.getUser();
        if (user?.username) {
          try {
            const existingName = localStorage.getItem('mab_player_name');
            if (!existingName || existingName === 'Player 1') {
              localStorage.setItem('mab_player_name', user.username);
              console.log('[CrazyGames] Logged in as:', user.username);
            }
          } catch {}
        }
      }
    } catch {
      // User account optional
    }
  }

  /**
   * Signals that game loading has begun.
   */
  public loadingStart() {
    if (!this.isPlatformAvailable) return;
    try {
      window.CrazyGames?.SDK?.game?.loadingStart();
    } catch {}
  }

  /**
   * Signals that game loading has completed and game is ready to play.
   */
  public loadingStop() {
    if (!this.isPlatformAvailable) return;
    try {
      window.CrazyGames?.SDK?.game?.loadingStop();
    } catch {}
  }

  /**
   * Call when real gameplay begins (entering live Auction or 1v1 Battle).
   */
  public gameplayStart() {
    if (!this.isPlatformAvailable || this.isGameplayActive) return;
    try {
      this.isGameplayActive = true;
      window.CrazyGames?.SDK?.game?.gameplayStart();
    } catch {}
  }

  /**
   * Call when gameplay stops or is interrupted (returning to Lobby, Menus, or Match Results).
   */
  public gameplayStop() {
    if (!this.isPlatformAvailable || !this.isGameplayActive) return;
    try {
      this.isGameplayActive = false;
      window.CrazyGames?.SDK?.game?.gameplayStop();
    } catch {}
  }

  /**
   * Celebratory confetti animation on CrazyGames when winning the championship tournament.
   */
  public happytime() {
    if (!this.isPlatformAvailable) return;
    try {
      window.CrazyGames?.SDK?.game?.happytime();
    } catch {}
  }

  /**
   * Requests a non-intrusive midgame video ad (e.g. between Auction and Battle phases).
   * Automatically mutes audio before the ad and restores original audio state upon completion.
   * If not on CrazyGames, completes immediately without interruption.
   */
  public requestMidgameAd(onComplete?: () => void) {
    if (!this.isPlatformAvailable) {
      onComplete?.();
      return;
    }

    try {
      const adModule = window.CrazyGames?.SDK?.ad;
      if (!adModule) {
        onComplete?.();
        return;
      }

      this.preAdMuteState = SoundManager.isMuted();

      adModule.requestAd('midgame', {
        adStarted: () => {
          this.isAdPlaying = true;
          SoundManager.setMuted(true);
        },
        adFinished: () => {
          this.isAdPlaying = false;
          SoundManager.setMuted(this.preAdMuteState);
          onComplete?.();
        },
        adError: (err) => {
          this.isAdPlaying = false;
          SoundManager.setMuted(this.preAdMuteState);
          console.warn('[CrazyGames] Midgame ad failed or blocked:', err);
          onComplete?.();
        }
      });
    } catch {
      onComplete?.();
    }
  }

  /**
   * Requests a rewarded video ad (e.g. watch ad for +100 bonus coins or +1 extra pass).
   * Mutes audio during playback and grants reward only on adFinished.
   */
  public requestRewardedAd(onRewarded: () => void, onDismissed?: () => void) {
    if (!this.isPlatformAvailable) {
      // In standard browser / testing, invoke onRewarded
      onRewarded();
      return;
    }

    try {
      const adModule = window.CrazyGames?.SDK?.ad;
      if (!adModule) {
        onRewarded();
        return;
      }

      this.preAdMuteState = SoundManager.isMuted();

      adModule.requestAd('rewarded', {
        adStarted: () => {
          this.isAdPlaying = true;
          SoundManager.setMuted(true);
        },
        adFinished: () => {
          this.isAdPlaying = false;
          SoundManager.setMuted(this.preAdMuteState);
          onRewarded();
        },
        adError: (err) => {
          this.isAdPlaying = false;
          SoundManager.setMuted(this.preAdMuteState);
          console.warn('[CrazyGames] Rewarded ad dismissed or error:', err);
          onDismissed?.();
        }
      });
    } catch {
      onDismissed?.();
    }
  }

  /**
   * Requests a responsive CrazyGames banner in a specified HTML container.
   */
  public requestResponsiveBanner(containerId: string) {
    if (!this.isPlatformAvailable) return;
    try {
      window.CrazyGames?.SDK?.banner?.requestResponsiveBanner(containerId);
    } catch {}
  }

  /**
   * Clears all active CrazyGames banner ads.
   */
  public clearAllBanners() {
    if (!this.isPlatformAvailable) return;
    try {
      window.CrazyGames?.SDK?.banner?.clearAllBanners();
    } catch {}
  }
}

export const crazyGamesService = new CrazyGamesService();
