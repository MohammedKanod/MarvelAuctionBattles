import { RoomSettings } from './types';

export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  maxPlayers: 2,
  charactersPerPlayer: 3,
  startingCoins: 1000,
  bidIncrement: 50,
  allowDuplicates: false,
  auctionTimerSeconds: 10,
  battleFormat: 'SingleElimination',
};

export const CHARACTERS_PER_PLAYER_OPTIONS = [3, 5, 7, 11] as const;

export const COIN_PRESETS_BY_CHAR_COUNT: Record<number, number> = {
  3: 1000,
  5: 1500,
  7: 2000,
  11: 3000,
};

export const COIN_OPTIONS = [1000, 1500, 2000, 2500, 3000, 4000] as const;
export const BID_INCREMENT_OPTIONS = [50, 100] as const;
export const PLAYER_COUNT_OPTIONS = [2] as const;
export const AUCTION_TIMER_OPTIONS = [5, 8, 10, 15, 20, 30] as const;
export const DEFAULT_PASSES_PER_PLAYER = 3;

export const AUCTION_ANTI_SNIPE_THRESHOLD_SEC = 3;
export const AUCTION_ANTI_SNIPE_EXTENSION_SEC = 4;
export const SOLD_DISPLAY_PAUSE_MS = 3500;
export const REVEAL_DISPLAY_PAUSE_MS = 2500;

