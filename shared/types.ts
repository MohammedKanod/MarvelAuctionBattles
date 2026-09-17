export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Cosmic';

export interface CharacterStats {
  power: number;        // Overall power index (60-99)
  strength: number;     // Physical lifting/striking (1-100)
  speed: number;        // Reflexes & movement (1-100)
  durability: number;   // Armor, healing factor, toughness (1-100)
  combat: number;       // Martial arts & fighting technique (1-100)
  range: number;        // Projectiles, beam attacks, reach (1-100)
  intelligence: number; // Tactical mastermind, prep time (1-100)
}

export interface CharacterVisuals {
  primaryColor: string;
  accentColor: string;
  badgeText: string;
  comicQuote: string;
}

export interface Character {
  id: string;
  name: string;
  alterEgo?: string;
  universe: string;
  role: 'Striker' | 'Tank' | 'Blaster' | 'Tactician' | 'Speedster' | 'Sorcerer';
  rarity: Rarity;
  stats: CharacterStats;
  specialAbilities: string[];
  description: string;
  visuals: CharacterVisuals;
  tacticalNotes: string;
  matchupStrengths: string[];
  matchupWeaknesses: string[];
  artwork?: string;
  imageUrl?: string;
}

export interface RoomSettings {
  maxPlayers: number;           // 2 - 6
  charactersPerPlayer: number;  // 3, 5, 7, 10
  startingCoins: number;        // 1000, 1500, 2000
  bidIncrement: number;         // 50, 100
  allowDuplicates: boolean;     // Default false
  auctionTimerSeconds: number;  // Default 10s
  battleFormat: 'SingleElimination' | 'RoundRobin';
}

export type GamePhase = 
  | 'LOBBY'
  | 'AUCTION'
  | 'AUCTION_TRANSITION'
  | 'BATTLE'
  | 'RESULTS';

export interface Player {
  id: string;
  sessionId: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  connected: boolean;
  coins: number;
  characters: Character[];
  wins: number;
  eliminated: boolean;
  avatarSeed: number;
  selectedFighterId?: string;
  fighterLocked?: boolean;
  defeatedCharacterIds?: string[];
  usedCharacterIds?: string[]; // Characters used in battle (cannot be reused!)
}

export interface BidRecord {
  playerId: string;
  playerName: string;
  amount: number;
  timestamp: number;
}

export interface AuctionState {
  currentRound: number;
  totalRounds: number;
  character: Character | null;
  startingBid: number;
  currentBid: number;
  currentLeaderId: string | null;
  currentLeaderName: string | null;
  timerSeconds: number;
  endsAt: number;
  status: 'WAITING' | 'ACTIVE' | 'EXTENDED' | 'SOLD' | 'UNSOLD';
  bidHistory: BidRecord[];
  winnerId: string | null;
  winnerName: string | null;
  winningBid: number | null;
  isFreeAssignment?: boolean;
  passedPlayerIds?: string[];
}

export interface BattleMatchup {
  id: string;
  roundIndex: number;
  matchTitle: string;
  player1Id: string;
  player1Name: string;
  player2Id: string;
  player2Name: string;
  char1: Character;
  char2: Character;
  winnerId: string;
  winnerName: string;
  loserId: string;
  loserName: string;
  reason: string;
  keyFactors: string[];
  battleSummary: string;
  decisiveAdvantage: string;
  char1Score: number;
  char2Score: number;
}

export interface TeamBattleResult {
  matchId: string;
  team1PlayerId: string;
  team1PlayerName: string;
  team2PlayerId: string;
  team2PlayerName: string;
  team1Wins: number;
  team2Wins: number;
  winnerPlayerId: string;
  winnerPlayerName: string;
  individualFights: BattleMatchup[];
  tiebreakerUsed: boolean;
  tiebreakerExplanation?: string;
}

export interface BattleBout {
  id: string;
  roundNumber: number;
  player1Id: string;
  player1Name: string;
  player2Id: string;
  player2Name: string;
  char1: Character;
  char2: Character;
  winnerId: string;
  winnerName: string;
  loserId: string;
  loserName: string;
  reason: string;
  decisiveAdvantage: string;
  battleSummary: string;
  completed: boolean;
}

export interface BattleRoundState {
  roundIndex: number;
  subPhase: 'SELECTION' | 'REVEAL_COUNTDOWN' | 'CLASH_ANIMATION' | 'BOUT_RESOLVED';
  revealCountdown: number;
  currentBoutIndex: number;
  bouts: BattleBout[];
  activeFighterSelections: {
    playerId: string;
    playerName: string;
    characterId?: string; // Hidden until reveal
    character?: Character; // Hidden until reveal
    isLocked: boolean;
  }[];
}

export interface TournamentMatch {
  matchId: string;
  roundNumber: number;
  roundName: string;
  player1Id: string | null;
  player1Name: string | null;
  player2Id: string | null;
  player2Name: string | null;
  winnerId: string | null;
  winnerName: string | null;
  completed: boolean;
  teamBattleResult?: TeamBattleResult;
}

export interface TournamentState {
  matches: TournamentMatch[];
  currentMatchIndex: number;
  championId: string | null;
  championName: string | null;
  standings: {
    playerId: string;
    playerName: string;
    rank: number;
    teamValue: number;
    battlesWon: number;
    auctionWins: number;
    mvpCharacter: string;
  }[];
}

export interface RoomState {
  roomId: string;
  roomCode: string;
  hostId: string;
  phase: GamePhase;
  settings: RoomSettings;
  players: Player[];
  auction: AuctionState | null;
  battleRound: BattleRoundState | null;
  tournament: TournamentState | null;
  createdAt: number;
  unsoldRotationIndex: number;
}

// Socket Events Definition
export interface ServerToClientEvents {
  ROOM_CREATED: (data: { room: RoomState; selfPlayerId: string; sessionToken: string }) => void;
  ROOM_JOINED: (data: { room: RoomState; selfPlayerId: string; sessionToken: string }) => void;
  STATE_SYNC: (data: { room: RoomState }) => void;
  PLAYER_JOINED: (data: { player: Player; room: RoomState }) => void;
  PLAYER_LEFT: (data: { playerId: string; newHostId?: string; room: RoomState }) => void;
  PLAYER_READY_CHANGED: (data: { playerId: string; isReady: boolean; room: RoomState }) => void;
  SETTINGS_UPDATED: (data: { settings: RoomSettings; room: RoomState }) => void;
  GAME_STARTED: (data: { room: RoomState }) => void;
  AUCTION_ROUND_STARTED: (data: { auction: AuctionState; room: RoomState }) => void;
  AUCTION_TIMER_TICK: (data: { timerSeconds: number; endsAt: number }) => void;
  BID_PLACED: (data: { bid: BidRecord; currentBid: number; currentLeaderId: string; currentLeaderName: string; endsAt: number; timerSeconds: number }) => void;
  PLAYER_OUTBID: (data: { outbidPlayerId: string; newBid: number; newLeaderName: string }) => void;
  PLAYER_PASSED_AUCTION: (data: { playerId: string; playerName: string; passedPlayerIds: string[]; room: RoomState }) => void;
  CHARACTER_SOLD: (data: { winnerId: string; winnerName: string; character: Character; winningBid: number; isFreeAssignment?: boolean; room: RoomState }) => void;
  CHARACTER_UNSOLD: (data: { character: Character; room: RoomState }) => void;
  AUCTION_TRANSITION_STARTED: (data: { room: RoomState }) => void;
  FIGHTER_SELECTION_STARTED: (data: { battleRound: BattleRoundState; room: RoomState }) => void;
  PLAYER_LOCKED_FIGHTER: (data: { playerId: string; room: RoomState }) => void;
  FIGHTERS_REVEAL_COUNTDOWN: (data: { countdown: number; room: RoomState }) => void;
  FIGHTERS_REVEALED: (data: { battleRound: BattleRoundState; room: RoomState }) => void;
  BOUT_STARTED: (data: { bout: BattleBout; room: RoomState }) => void;
  BOUT_COMPLETED: (data: { bout: BattleBout; room: RoomState }) => void;
  GAME_COMPLETED: (data: { tournament: TournamentState; room: RoomState }) => void;
  ERROR_NOTIFICATION: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  CREATE_ROOM: (data: { playerName: string; settings: RoomSettings }) => void;
  JOIN_ROOM: (data: { roomCode: string; playerName: string }) => void;
  RECONNECT_SESSION: (data: { sessionToken: string; roomCode: string }) => void;
  UPDATE_SETTINGS: (data: { settings: Partial<RoomSettings> }) => void;
  TOGGLE_READY: () => void;
  START_GAME: () => void;
  PLACE_BID: (data: { amount: number }) => void;
  PASS_AUCTION: () => void;
  LOCK_FIGHTER: (data: { characterId: string }) => void;
  NEXT_BOUT: () => void;
  PLAY_AGAIN: () => void;
}
