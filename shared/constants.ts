import { RoomSettings } from './types';

export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  maxPlayers: 4,
  charactersPerPlayer: 3,
  startingCoins: 1500,
  bidIncrement: 50,
  allowDuplicates: false,
  auctionTimerSeconds: 10,
  battleFormat: 'SingleElimination',
};

export const COIN_OPTIONS = [1000, 1500, 2000] as const;
export const CHARACTERS_PER_PLAYER_OPTIONS = [3, 5, 7, 10] as const;
export const BID_INCREMENT_OPTIONS = [50, 100] as const;
export const PLAYER_COUNT_OPTIONS = [2, 3, 4, 5, 6] as const;

export const AUCTION_ANTI_SNIPE_THRESHOLD_SEC = 3;
export const AUCTION_ANTI_SNIPE_EXTENSION_SEC = 4;
export const SOLD_DISPLAY_PAUSE_MS = 3500;
export const REVEAL_DISPLAY_PAUSE_MS = 2500;
