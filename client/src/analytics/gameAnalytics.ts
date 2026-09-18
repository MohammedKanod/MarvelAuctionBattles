import { track } from '@vercel/analytics';

/**
 * Game Analytics Engine
 * Safe, lightweight event tracking wrapper for @vercel/analytics.
 * Handles debug mode, anonymous event sanitization, and deduplication.
 */

type AllowedValue = string | number | boolean | null;

interface AnalyticsEventProperties {
  [key: string]: AllowedValue | undefined;
}

class GameAnalytics {
  private isDebug: boolean = false;
  private firedOnceEvents: Set<string> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.isDebug =
        import.meta.env.VITE_ANALYTICS_DEBUG === 'true' ||
        window.localStorage?.getItem('analytics_debug') === 'true';
    }
  }

  public setDebug(enabled: boolean): void {
    this.isDebug = enabled;
  }

  /**
   * Safely dispatch an analytics event to Vercel Analytics.
   * Catches errors gracefully so analytics NEVER impacts gameplay.
   */
  public trackEvent(eventName: string, properties?: AnalyticsEventProperties): void {
    try {
      // Clean and sanitize properties to ensure no undefined or non-primitive values
      const sanitized: Record<string, AllowedValue> = {};
      if (properties) {
        for (const [key, value] of Object.entries(properties)) {
          if (value !== undefined) {
            sanitized[key] = value;
          }
        }
      }

      if (this.isDebug) {
        console.log(
          `%c[Analytics] ${eventName}`,
          'background: #111; color: #ffd100; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
          sanitized
        );
      }

      // Track with @vercel/analytics custom event
      track(eventName, sanitized);
    } catch (err) {
      if (this.isDebug) {
        console.warn(`[Analytics Error] Failed to track ${eventName}:`, err);
      }
    }
  }

  /**
   * Track an event only once per session or lifecycle key.
   */
  public trackOnce(key: string, eventName: string, properties?: AnalyticsEventProperties): void {
    if (this.firedOnceEvents.has(key)) return;
    this.firedOnceEvents.add(key);
    this.trackEvent(eventName, properties);
  }

  // --- Specific Typed Funnel Events ---

  public appLoaded(): void {
    this.trackOnce('app_loaded', 'app_loaded');
  }

  public playClicked(source: 'hero_join' | 'hero_create' | 'invite_landing'): void {
    this.trackEvent('play_clicked', { source });
  }

  public createRoomClicked(): void {
    this.trackEvent('create_room_clicked');
  }

  public roomCreated(roomSize: number, playerCount: number): void {
    this.trackEvent('room_created', {
      room_size: roomSize,
      player_count: playerCount
    });
  }

  public joinRoomClicked(roomCode?: string): void {
    this.trackEvent('join_room_clicked', {
      room_code: roomCode ? roomCode.toUpperCase() : null
    });
  }

  public roomJoined(roomSize: number, playerCount: number, roomCode?: string): void {
    this.trackEvent('room_joined', {
      room_size: roomSize,
      player_count: playerCount,
      room_code: roomCode ? roomCode.toUpperCase() : null
    });
  }

  public playerReady(isReady: boolean): void {
    this.trackEvent('player_ready', { is_ready: isReady });
  }

  public auctionStarted(auctionNumber: number, playerCount: number): void {
    this.trackEvent('auction_started', {
      auction_number: auctionNumber,
      player_count: playerCount
    });
  }

  public characterRevealed(characterId: string, auctionNumber: number): void {
    this.trackEvent('character_revealed', {
      character_id: characterId,
      auction_number: auctionNumber
    });
  }

  public bidPlaced(bidAmount: number, characterId?: string): void {
    this.trackEvent('bid_placed', {
      bid_amount: bidAmount,
      character_id: characterId || null
    });
  }

  public characterWon(characterId: string, winningBid?: number): void {
    this.trackEvent('character_won', {
      character_id: characterId,
      winning_bid: winningBid || null
    });
  }

  public auctionCompleted(totalCharactersWon?: number): void {
    this.trackEvent('auction_completed', {
      characters_won: totalCharactersWon || null
    });
  }

  public battleStarted(battleNumber: number, playerCount: number): void {
    this.trackEvent('battle_started', {
      battle_number: battleNumber,
      player_count: playerCount
    });
  }

  public battleCompleted(battleNumber: number): void {
    this.trackEvent('battle_completed', {
      battle_number: battleNumber
    });
  }

  public winnerRevealed(playerCount: number): void {
    this.trackEvent('winner_revealed', {
      player_count: playerCount
    });
  }

  public rematchClicked(): void {
    this.trackEvent('rematch_clicked');
  }

  public gameCompleted(): void {
    this.trackEvent('game_completed');
  }

  public shareClicked(method: 'clipboard' | 'web_share', roomCode: string): void {
    this.trackEvent('share_clicked', {
      method,
      room_code: roomCode.toUpperCase()
    });
  }
}

export const gameAnalytics = new GameAnalytics();
