import { RoomState, RoomSettings, Player, Character, GamePhase, AuctionState, TournamentState, BattleRoundState, BattleBout } from '../../../shared/types';
import { DEFAULT_ROOM_SETTINGS, DEFAULT_PASSES_PER_PLAYER } from '../../../shared/constants';
import { getRandomCharacters, getCharacterById } from '../data/characters';
import { AuctionEngine } from '../auction/AuctionEngine';
import { BattleEngine } from '../battle/BattleEngine';
import { TournamentEngine } from '../tournament/TournamentEngine';
import { DatabaseService } from '../database/db';
import { BotEngine } from '../bot/BotEngine';

export interface RoomBroadcastCallbacks {
  broadcastToRoom: (roomCode: string, event: string, payload: any) => void;
  sendToPlayer: (playerId: string, event: string, payload: any) => void;
}

export class RoomManager {
  private rooms: Map<string, RoomState> = new Map();
  private socketToPlayer: Map<string, { playerId: string; roomCode: string }> = new Map();
  private playerToSocket: Map<string, string> = new Map();
  private auctionEngines: Map<string, AuctionEngine> = new Map();
  private auctionCharacterPools: Map<string, Character[]> = new Map();
  private botTimers: Map<string, NodeJS.Timeout[]> = new Map();
  private callbacks: RoomBroadcastCallbacks;

  constructor(callbacks: RoomBroadcastCallbacks) {
    this.callbacks = callbacks;
  }

  public generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return this.rooms.has(code) ? this.generateRoomCode() : code;
  }

  public createRoom(
    hostName: string,
    settings: Partial<RoomSettings>,
    socketId: string,
    withBot: boolean = false
  ): { room: RoomState; player: Player; sessionToken: string } {
    const roomCode = this.generateRoomCode();
    const playerId = `player-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const sessionId = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const sessionToken = `token_${Buffer.from(`${playerId}:${roomCode}:${Date.now()}`).toString('base64')}`;

    const mergedSettings: RoomSettings = {
      ...DEFAULT_ROOM_SETTINGS,
      ...settings,
      maxPlayers: 2
    };

    const hostPlayer: Player = {
      id: playerId,
      sessionId,
      name: hostName.trim() || 'Player 1',
      isHost: true,
      isReady: true,
      connected: true,
      coins: mergedSettings.startingCoins,
      characters: [],
      wins: 0,
      eliminated: false,
      avatarSeed: Math.floor(Math.random() * 8),
      passesRemaining: DEFAULT_PASSES_PER_PLAYER,
      defeatedCharacterIds: []
    };

    const room: RoomState = {
      roomId: `room-${Date.now()}`,
      roomCode,
      hostId: playerId,
      phase: 'LOBBY',
      settings: mergedSettings,
      players: [hostPlayer],
      auction: null,
      battleRound: null,
      tournament: null,
      createdAt: Date.now(),
      unsoldRotationIndex: 0
    };

    if (withBot) {
      const botPlayer = BotEngine.createBotPlayer(mergedSettings);
      room.players.push(botPlayer);
    }

    this.rooms.set(roomCode, room);
    this.bindSocket(socketId, playerId, roomCode);
    DatabaseService.saveSession(sessionToken, { sessionId, playerId, roomCode, name: hostPlayer.name });
    DatabaseService.saveRoom(room);

    return { room, player: hostPlayer, sessionToken };
  }

  public joinRoom(
    roomCode: string,
    playerName: string,
    socketId: string
  ): { success: boolean; error?: string; room?: RoomState; player?: Player; sessionToken?: string } {
    const code = roomCode.trim().toUpperCase();
    const room = this.rooms.get(code);

    if (!room) {
      return { success: false, error: `Room "${code}" does not exist.` };
    }

    if (room.phase !== 'LOBBY') {
      return { success: false, error: 'Game has already started in this room.' };
    }

    if (room.players.length >= room.settings.maxPlayers) {
      return { success: false, error: `Room is full (Maximum ${room.settings.maxPlayers} players).` };
    }

    const playerId = `player-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const sessionId = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const sessionToken = `token_${Buffer.from(`${playerId}:${code}:${Date.now()}`).toString('base64')}`;

    const newPlayer: Player = {
      id: playerId,
      sessionId,
      name: playerName.trim() || `Player ${room.players.length + 1}`,
      isHost: false,
      isReady: false,
      connected: true,
      coins: room.settings.startingCoins,
      characters: [],
      wins: 0,
      eliminated: false,
      avatarSeed: Math.floor(Math.random() * 8),
      passesRemaining: DEFAULT_PASSES_PER_PLAYER,
      defeatedCharacterIds: []
    };

    room.players.push(newPlayer);
    this.bindSocket(socketId, playerId, code);
    DatabaseService.saveSession(sessionToken, { sessionId, playerId, roomCode: code, name: newPlayer.name });
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(code, 'PLAYER_JOINED', { player: newPlayer, room });
    return { success: true, room, player: newPlayer, sessionToken };
  }

  public addBot(socketId: string): { success: boolean; error?: string; bot?: Player; room?: RoomState } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Socket not found' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'LOBBY') {
      return { success: false, error: 'Cannot add bot: lobby is not active.' };
    }

    if (room.hostId !== info.playerId) {
      return { success: false, error: 'Only the host can add a computer player.' };
    }

    if (room.players.length >= room.settings.maxPlayers) {
      return { success: false, error: `Room is full (Maximum ${room.settings.maxPlayers} players).` };
    }

    const existingBotNames = room.players.filter(p => p.isBot).map(p => p.name);
    const botPlayer = BotEngine.createBotPlayer(room.settings, existingBotNames);

    room.players.push(botPlayer);
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'PLAYER_JOINED', { player: botPlayer, room });
    return { success: true, bot: botPlayer, room };
  }

  public removeBot(socketId: string, botId: string): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Socket not found' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'LOBBY') {
      return { success: false, error: 'Cannot remove bot: lobby is not active.' };
    }

    if (room.hostId !== info.playerId) {
      return { success: false, error: 'Only the host can remove a computer player.' };
    }

    const botIndex = room.players.findIndex(p => p.id === botId && p.isBot);
    if (botIndex === -1) {
      return { success: false, error: 'Bot not found in room.' };
    }

    room.players.splice(botIndex, 1);
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'PLAYER_LEFT', { playerId: botId, room });
    return { success: true };
  }

  public reconnect(
    sessionToken: string,
    roomCode: string,
    socketId: string
  ): { success: boolean; room?: RoomState; player?: Player } {
    const code = roomCode.trim().toUpperCase();
    const sessionData = DatabaseService.getSession(sessionToken);
    const room = this.rooms.get(code);

    if (!room || !sessionData || sessionData.roomCode !== code) {
      return { success: false };
    }

    const player = room.players.find(p => p.id === sessionData.playerId);
    if (!player) {
      return { success: false };
    }

    player.connected = true;

    // Ensure human player retains/regains host if no other human is host
    const hasOtherHumanHost = room.players.some(p => p.id !== player.id && p.isHost && !p.isBot && p.connected);
    if (!hasOtherHumanHost) {
      player.isHost = true;
      room.hostId = player.id;
    }
    // Guarantee bots are never hosts
    room.players.forEach(p => {
      if (p.isBot) p.isHost = false;
    });

    this.bindSocket(socketId, player.id, code);
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(code, 'STATE_SYNC', { room });
    return { success: true, room, player };
  }

  public toggleReady(socketId: string): RoomState | null {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return null;

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'LOBBY') return null;

    const player = room.players.find(p => p.id === info.playerId);
    if (!player) return null;

    player.isReady = !player.isReady;
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(info.roomCode, 'PLAYER_READY_CHANGED', {
      playerId: player.id,
      isReady: player.isReady,
      room
    });

    return room;
  }

  public updateSettings(socketId: string, newSettings: Partial<RoomSettings>): RoomState | null {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return null;

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'LOBBY' || room.hostId !== info.playerId) return null;

    room.settings = { ...room.settings, ...newSettings };

    if (newSettings.startingCoins) {
      for (const p of room.players) {
        p.coins = newSettings.startingCoins;
      }
    }

    DatabaseService.saveRoom(room);
    this.callbacks.broadcastToRoom(info.roomCode, 'SETTINGS_UPDATED', {
      settings: room.settings,
      room
    });

    return room;
  }

  public startGame(socketId: string): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Socket not found' };

    const room = this.rooms.get(info.roomCode);
    if (!room) return { success: false, error: 'Room not found' };

    // Auto-heal host status if caller is the only human in room with bots
    const isOnlyHuman = !room.players.some(p => p.id !== info.playerId && !p.isBot);
    if (isOnlyHuman && room.hostId !== info.playerId) {
      room.hostId = info.playerId;
      const caller = room.players.find(p => p.id === info.playerId);
      if (caller) caller.isHost = true;
      room.players.forEach(p => { if (p.isBot) p.isHost = false; });
    }

    if (room.hostId !== info.playerId) {
      return { success: false, error: 'Only the host can start the game.' };
    }

    if (room.players.length < 2) {
      return { success: false, error: 'At least 2 players are required to start.' };
    }

    // Host starting the game is ready; all bots in room are ready
    const host = room.players.find(p => p.id === info.playerId);
    if (host) host.isReady = true;
    room.players.forEach(p => {
      if (p.isBot) {
        p.isReady = true;
        p.isHost = false;
      }
    });

    // Only non-host human players need to be checked for ready status
    const unreadyPlayers = room.players.filter(p => !p.isHost && !p.isBot && !p.isReady);
    if (unreadyPlayers.length > 0) {
      return { success: false, error: `Waiting for all players to ready up (${unreadyPlayers.map(p => p.name).join(', ')}).` };
    }

    room.phase = 'AUCTION';
    const totalSlotsNeeded = room.players.length * room.settings.charactersPerPlayer;
    const pool = getRandomCharacters(totalSlotsNeeded + 15, room.settings.allowDuplicates);
    this.auctionCharacterPools.set(room.roomCode, pool);

    DatabaseService.saveRoom(room);
    this.callbacks.broadcastToRoom(room.roomCode, 'GAME_STARTED', { room });

    this.launchNextAuctionRound(room);
    return { success: true };
  }

  private launchNextAuctionRound(room: RoomState) {
    // Check if every player has filled their character slots
    const allSlotsFilled = room.players.every(
      p => p.characters.length >= room.settings.charactersPerPlayer
    );

    if (allSlotsFilled) {
      // Auction completed! Move to post-auction cinematic transition
      this.transitionAuctionToBattle(room);
      return;
    }

    const pool = this.auctionCharacterPools.get(room.roomCode) || [];
    if (pool.length === 0) {
      // Emergency refill from character database
      const refill = getRandomCharacters(10, true);
      pool.push(...refill);
    }

    const nextCharacter = pool.shift()!;
    const currentRound = (room.auction ? room.auction.currentRound : 0) + 1;
    const totalRounds = room.players.length * room.settings.charactersPerPlayer;

    const auctionEngine = new AuctionEngine({
      onBidPlaced: (bid, auctionState) => {
        if (room.auction) room.auction = auctionState;
        this.callbacks.broadcastToRoom(room.roomCode, 'BID_PLACED', {
          bid,
          currentBid: auctionState.currentBid,
          currentLeaderId: auctionState.currentLeaderId || '',
          currentLeaderName: auctionState.currentLeaderName || '',
          endsAt: auctionState.endsAt,
          timerSeconds: auctionState.timerSeconds
        });
      },
      onOutbid: (outbidPlayerId, newBid, newLeaderName) => {
        const socketId = this.playerToSocket.get(outbidPlayerId);
        if (socketId) {
          this.callbacks.sendToPlayer(socketId, 'PLAYER_OUTBID', {
            outbidPlayerId,
            newBid,
            newLeaderName
          });
        }
      },
      onSold: (winnerId, winnerName, character, winningBid) => {
        this.handleCharacterSold(room, winnerId, winnerName, character, winningBid);
      },
      onNoBids: (character) => {
        this.handleNoBids(room, character);
      }
    });

    this.auctionEngines.set(room.roomCode, auctionEngine);
    auctionEngine.startRound(nextCharacter, currentRound, totalRounds, room.settings.auctionTimerSeconds);
    room.auction = auctionEngine.getState();
    room.auction.passedPlayerIds = [];
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'AUCTION_ROUND_STARTED', {
      auction: room.auction,
      room
    });

    this.triggerBotDecisions(room);
  }

  public placeBid(socketId: string, amount: number): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Player session not found.' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'AUCTION' || !room.auction) {
      return { success: false, error: 'Auction is not currently active.' };
    }

    const player = room.players.find(p => p.id === info.playerId);
    if (!player) return { success: false, error: 'Player not found in room.' };

    // Rule: Cannot bid if player already filled all character slots
    if (player.characters.length >= room.settings.charactersPerPlayer) {
      return { success: false, error: 'Your roster is already full!' };
    }

    // Rule: Cannot bid if player has passed this character
    if (room.auction.passedPlayerIds?.includes(player.id)) {
      return { success: false, error: 'You already passed on this character and cannot bid!' };
    }

    const auctionEngine = this.auctionEngines.get(room.roomCode);
    if (!auctionEngine) {
      return { success: false, error: 'Auction engine is not running.' };
    }

    const result = auctionEngine.placeBid(player, amount, room.settings.bidIncrement);
    if (result.success) {
      room.auction = {
        ...auctionEngine.getState(),
        passedPlayerIds: room.auction.passedPlayerIds || []
      };
      DatabaseService.saveRoom(room);
      this.triggerBotDecisions(room);
    }
    return result;
  }

  public passAuction(socketId: string): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Player session not found.' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'AUCTION' || !room.auction) {
      return { success: false, error: 'Auction is not currently active.' };
    }

    const player = room.players.find(p => p.id === info.playerId);
    if (!player) return { success: false, error: 'Player not found in room.' };

    if (room.auction.status !== 'ACTIVE' && room.auction.status !== 'EXTENDED') {
      return { success: false, error: 'Auction is not accepting passes right now.' };
    }

    if (room.auction.currentLeaderId === player.id) {
      return { success: false, error: 'You are currently holding the highest bid and cannot pass!' };
    }

    if (room.auction.passedPlayerIds?.includes(player.id)) {
      return { success: false, error: 'You have already passed on this character!' };
    }

    const minBid = room.auction.startingBid || 100;
    if (player.coins >= minBid) {
      return {
        success: false,
        error: `You can only pass when your points are below the minimum bid (${minBid}🪙)!`
      };
    }

    const currentPasses = player.passesRemaining !== undefined ? player.passesRemaining : DEFAULT_PASSES_PER_PLAYER;
    if (currentPasses <= 0) {
      return { success: false, error: 'You have no passes remaining (0 left)!' };
    }

    if (!room.auction.passedPlayerIds) {
      room.auction.passedPlayerIds = [];
    }

    room.auction.passedPlayerIds.push(player.id);
    player.passesRemaining = currentPasses - 1;

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'PLAYER_PASSED_AUCTION', {
      playerId: player.id,
      playerName: player.name,
      passedPlayerIds: room.auction.passedPlayerIds,
      room
    });

    this.triggerBotDecisions(room);

    const eligiblePlayers = room.players.filter(
      p => p.characters.length < room.settings.charactersPerPlayer
    );

    // Case 1: ALL eligible players have passed and NO ONE bid -> Character is UNSOLD!
    const allPassed = eligiblePlayers.length > 0 && eligiblePlayers.every(p => room.auction!.passedPlayerIds!.includes(p.id));
    if (allPassed && (room.auction.currentBid === 0 || !room.auction.currentLeaderId)) {
      const engine = this.auctionEngines.get(room.roomCode);
      if (engine) {
        engine.destroy();
      }

      const character = room.auction.character;
      room.auction.status = 'UNSOLD';
      room.auction.winnerId = null;
      room.auction.winnerName = null;
      room.auction.winningBid = 0;

      DatabaseService.saveRoom(room);

      if (character) {
        this.callbacks.broadcastToRoom(room.roomCode, 'CHARACTER_UNSOLD', {
          character,
          room
        });
      }

      // Fast-forward to next auction round in 1.4s (no laggy wait)
      setTimeout(() => {
        this.launchNextAuctionRound(room);
      }, 1400);

      return { success: true };
    }

    // Case 2: One player has a winning bid and all other eligible players have passed -> Fast-forward win!
    if (room.auction.currentLeaderId && room.auction.currentBid > 0) {
      const remainingCompetitors = eligiblePlayers.filter(p => p.id !== room.auction!.currentLeaderId);
      const allCompetitorsPassed = remainingCompetitors.length > 0 && remainingCompetitors.every(p => room.auction!.passedPlayerIds!.includes(p.id));
      if (allCompetitorsPassed) {
        const engine = this.auctionEngines.get(room.roomCode);
        if (engine) {
          engine.destroy();
        }

        this.handleCharacterSold(
          room,
          room.auction.currentLeaderId,
          room.auction.currentLeaderName || 'Winner',
          room.auction.character!,
          room.auction.currentBid,
          false
        );
      }
    }

    return { success: true };
  }

  private handleCharacterSold(
    room: RoomState,
    winnerId: string,
    winnerName: string,
    character: Character,
    winningBid: number,
    isFreeAssignment: boolean = false
  ) {
    this.clearBotTimers(room.roomCode);

    const player = room.players.find(p => p.id === winnerId);
    if (player) {
      player.coins = Math.max(0, player.coins - winningBid);
      player.characters.push(character);
    }

    if (room.auction) {
      room.auction.status = 'SOLD';
      room.auction.winnerId = winnerId;
      room.auction.winnerName = winnerName;
      room.auction.winningBid = winningBid;
      room.auction.isFreeAssignment = isFreeAssignment;
    }

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'CHARACTER_SOLD', {
      winnerId,
      winnerName,
      character,
      winningBid,
      isFreeAssignment,
      room
    });

    // Snappy transition (1.4s instead of 3.2s)
    setTimeout(() => {
      this.launchNextAuctionRound(room);
    }, 1400);
  }

  /**
   * Evaluates what happens when no bids are placed before timer runs out:
   * 1. If a player's money is below minimum bid (< $100) and other player doesn't bid:
   *    The player with low points gets the character if they didn't pass on it.
   *    If multiple low-point players qualify, priority goes to lowest points (or character count).
   * 2. If all players had money >= minimum bid and didn't bid, or all low-point players passed:
   *    Character is simply UNSOLD and discarded.
   */
  private handleNoBids(room: RoomState, character: Character) {
    const minBid = room.auction?.startingBid || 100;
    const eligiblePlayers = room.players.filter(
      p => p.characters.length < room.settings.charactersPerPlayer
    );

    // Eligible players whose coins are below minimum bid and who did NOT pass on this character
    const lowPointCandidates = eligiblePlayers.filter(
      p => p.coins < minBid && !room.auction?.passedPlayerIds?.includes(p.id)
    );

    if (lowPointCandidates.length > 0) {
      // Sort candidates by coins ascending (lowest points gets priority)
      lowPointCandidates.sort((a, b) => {
        if (a.coins !== b.coins) return a.coins - b.coins;
        if (a.characters.length !== b.characters.length) {
          return a.characters.length - b.characters.length;
        }
        return 0;
      });

      const recipient = lowPointCandidates[0];
      this.handleCharacterSold(room, recipient.id, recipient.name, character, 0, true);
      return;
    }

    // Otherwise (both had >= minBid, or low-point players passed), character is UNSOLD
    this.handleNoBidsUnsold(room, character);
  }

  /**
   * When an auction ends with NO bids and character cannot be assigned:
   * The character is simply UNSOLD and discarded back to the multiverse pool.
   */
  private handleNoBidsUnsold(room: RoomState, character: Character) {
    this.clearBotTimers(room.roomCode);

    if (room.auction) {
      room.auction.status = 'UNSOLD';
      room.auction.winnerId = null;
      room.auction.winnerName = null;
      room.auction.winningBid = 0;
    }

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'CHARACTER_UNSOLD', {
      character,
      room
    });

    // Snappy transition (1.4s)
    setTimeout(() => {
      this.launchNextAuctionRound(room);
    }, 1400);
  }

  /**
   * Transition from Auction to Battle Act
   */
  private transitionAuctionToBattle(room: RoomState) {
    this.clearBotTimers(room.roomCode);
    const auctionEngine = this.auctionEngines.get(room.roomCode);
    if (auctionEngine) {
      auctionEngine.destroy();
      this.auctionEngines.delete(room.roomCode);
    }

    room.phase = 'AUCTION_TRANSITION';
    room.auction = null;
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'AUCTION_TRANSITION_STARTED', { room });

    // After 3.5s cinematic screen ("THE TEAMS ARE READY. LET THE BATTLES BEGIN!"), start Fighter Selection
    setTimeout(() => {
      this.startFighterSelectionRound(room, 1);
    }, 3500);
  }

  /**
   * Starts a fighter selection round where each player secretly selects 1 fighter
   */
  public startFighterSelectionRound(room: RoomState, roundIndex: number) {
    room.phase = 'BATTLE';

    // Reset fighter selection status for each player
    for (const p of room.players) {
      p.selectedFighterId = undefined;
      p.fighterLocked = false;
      if (!p.defeatedCharacterIds) p.defeatedCharacterIds = [];
    }

    const activeSelections = room.players.map(p => ({
      playerId: p.id,
      playerName: p.name,
      isLocked: false
    }));

    room.battleRound = {
      roundIndex,
      subPhase: 'SELECTION',
      revealCountdown: 3,
      currentBoutIndex: 0,
      bouts: [],
      activeFighterSelections: activeSelections
    };

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'FIGHTER_SELECTION_STARTED', {
      battleRound: room.battleRound,
      room
    });

    this.triggerBotFighterSelection(room);
  }

  /**
   * Player locks in their chosen fighter secretly
   */
  public lockFighter(socketId: string, characterId: string): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Session not found' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'BATTLE' || !room.battleRound || room.battleRound.subPhase !== 'SELECTION') {
      return { success: false, error: 'Not in fighter selection phase' };
    }

    const player = room.players.find(p => p.id === info.playerId);
    if (!player) return { success: false, error: 'Player not found' };

    if (player.fighterLocked) {
      return { success: false, error: 'Fighter already locked in!' };
    }

    // Verify player actually owns this character and character has not been used yet
    const character = player.characters.find(c => c.id === characterId);
    if (!character) {
      return { success: false, error: 'You do not own this character!' };
    }
    if (player.usedCharacterIds && player.usedCharacterIds.includes(characterId)) {
      return { success: false, error: 'You have already deployed this hero in a previous battle!' };
    }
    if (player.defeatedCharacterIds && player.defeatedCharacterIds.includes(characterId)) {
      return { success: false, error: 'This fighter was already defeated in battle!' };
    }

    player.selectedFighterId = characterId;
    player.fighterLocked = true;

    // Update secret selection status
    const sel = room.battleRound.activeFighterSelections.find(s => s.playerId === player.id);
    if (sel) {
      sel.isLocked = true;
    }

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'PLAYER_LOCKED_FIGHTER', {
      playerId: player.id,
      room
    });

    // Check if all players with unused fighters have locked in
    const playersWithUnusedFighters = room.players.filter(p => {
      const remaining = p.characters.filter(c => !p.usedCharacterIds?.includes(c.id));
      return remaining.length > 0;
    });

    const allLocked = playersWithUnusedFighters.every(p => p.fighterLocked);
    if (allLocked) {
      this.triggerSecretRevealAndBouts(room);
    }

    return { success: true };
  }

  /**
   * 3-2-1 countdown into synchronized fighter reveal and 1v1 bouts
   */
  private triggerSecretRevealAndBouts(room: RoomState) {
    if (!room.battleRound) return;

    room.battleRound.subPhase = 'REVEAL_COUNTDOWN';
    room.battleRound.revealCountdown = 3;
    DatabaseService.saveRoom(room);

    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (!room.battleRound) {
        clearInterval(interval);
        return;
      }
      room.battleRound.revealCountdown = count;
      this.callbacks.broadcastToRoom(room.roomCode, 'FIGHTERS_REVEAL_COUNTDOWN', {
        countdown: count,
        room
      });

      if (count <= 0) {
        clearInterval(interval);
        this.revealFightersAndLaunchBouts(room);
      }
    }, 1000);
  }

  private revealFightersAndLaunchBouts(room: RoomState) {
    if (!room.battleRound) return;

    // Populate all chosen characters for public reveal
    for (const sel of room.battleRound.activeFighterSelections) {
      const player = room.players.find(p => p.id === sel.playerId);
      if (player && player.selectedFighterId) {
        const char = player.characters.find(c => c.id === player.selectedFighterId);
        if (char) {
          sel.characterId = char.id;
          sel.character = char;
        }
      }
    }

    room.battleRound.subPhase = 'CLASH_ANIMATION';

    // Pair active fighters into 1v1 bouts
    const readyPlayers = room.players.filter(p => p.selectedFighterId);
    const bouts: BattleBout[] = [];

    if (readyPlayers.length >= 2) {
      // For 2 players, direct 1v1
      // For 3+ players, pair sequentially (P1 vs P2, P3 vs P4, etc.)
      for (let i = 0; i < readyPlayers.length - 1; i += 2) {
        const p1 = readyPlayers[i];
        const p2 = readyPlayers[i + 1];
        const char1 = p1.characters.find(c => c.id === p1.selectedFighterId)!;
        const char2 = p2.characters.find(c => c.id === p2.selectedFighterId)!;

        const evalResult = BattleEngine.evaluateMatchup(char1, char2, room.battleRound.roundIndex);
        const isChar1Winner = evalResult.winnerChar.id === char1.id;

        bouts.push({
          id: `bout-${room.battleRound.roundIndex}-${i + 1}`,
          roundNumber: room.battleRound.roundIndex,
          player1Id: p1.id,
          player1Name: p1.name,
          player2Id: p2.id,
          player2Name: p2.name,
          char1,
          char2,
          winnerId: isChar1Winner ? p1.id : p2.id,
          winnerName: isChar1Winner ? p1.name : p2.name,
          loserId: isChar1Winner ? p2.id : p1.id,
          loserName: isChar1Winner ? p2.name : p1.name,
          reason: evalResult.reason,
          decisiveAdvantage: evalResult.decisiveAdvantage,
          battleSummary: evalResult.battleSummary,
          completed: false
        });
      }
    }

    room.battleRound.bouts = bouts;
    room.battleRound.currentBoutIndex = 0;
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'FIGHTERS_REVEALED', {
      battleRound: room.battleRound,
      room
    });

    if (bouts.length > 0) {
      // Launch first 1v1 bout
      setTimeout(() => {
        this.callbacks.broadcastToRoom(room.roomCode, 'BOUT_STARTED', {
          bout: bouts[0],
          room
        });
      }, 1500);
    }
  }

  public nextBout(socketId: string): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Socket not found' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'BATTLE' || !room.battleRound) {
      return { success: false, error: 'Battle not active' };
    }

    const currentBout = room.battleRound.bouts[room.battleRound.currentBoutIndex];
    if (currentBout && !currentBout.completed) {
      currentBout.completed = true;

      // Award win to winning player
      const winningPlayer = room.players.find(p => p.id === currentBout.winnerId);
      if (winningPlayer) winningPlayer.wins = (winningPlayer.wins || 0) + 1;

      // Mark character 1 as used (cannot be used again!)
      const p1 = room.players.find(p => p.id === currentBout.player1Id);
      if (p1) {
        if (!p1.usedCharacterIds) p1.usedCharacterIds = [];
        if (!p1.usedCharacterIds.includes(currentBout.char1.id)) {
          p1.usedCharacterIds.push(currentBout.char1.id);
        }
      }

      // Mark character 2 as used (cannot be used again!)
      const p2 = room.players.find(p => p.id === currentBout.player2Id);
      if (p2) {
        if (!p2.usedCharacterIds) p2.usedCharacterIds = [];
        if (!p2.usedCharacterIds.includes(currentBout.char2.id)) {
          p2.usedCharacterIds.push(currentBout.char2.id);
        }
      }

      // Also mark defeated character
      const losingPlayer = room.players.find(p => p.id === currentBout.loserId);
      if (losingPlayer) {
        if (!losingPlayer.defeatedCharacterIds) losingPlayer.defeatedCharacterIds = [];
        const losingChar = currentBout.loserId === currentBout.player1Id ? currentBout.char1 : currentBout.char2;
        if (!losingPlayer.defeatedCharacterIds.includes(losingChar.id)) {
          losingPlayer.defeatedCharacterIds.push(losingChar.id);
        }
      }

      this.callbacks.broadcastToRoom(room.roomCode, 'BOUT_COMPLETED', {
        bout: currentBout,
        room
      });
    }

    // Check if more bouts exist in this round
    if (room.battleRound.currentBoutIndex < room.battleRound.bouts.length - 1) {
      room.battleRound.currentBoutIndex++;
      const nextBout = room.battleRound.bouts[room.battleRound.currentBoutIndex];
      DatabaseService.saveRoom(room);

      this.callbacks.broadcastToRoom(room.roomCode, 'BOUT_STARTED', {
        bout: nextBout,
        room
      });
      return { success: true };
    }

    // All bouts in this selection round are complete!
    // Rule: Check if players still have unused (un-deployed) characters remaining
    const playersWithUnusedHeroes = room.players.filter(p => {
      const unused = p.characters.filter(c => !p.usedCharacterIds?.includes(c.id));
      return unused.length > 0;
    });

    if (playersWithUnusedHeroes.length >= 2) {
      // Start next fighter selection round!
      this.startFighterSelectionRound(room, room.battleRound.roundIndex + 1);
    } else {
      // All characters have fought! Crown the Grand Champion
      this.finishGameAndCrownChampion(room);
    }

    return { success: true };
  }

  private finishGameAndCrownChampion(room: RoomState) {
    room.phase = 'RESULTS';

    // Find champion with highest wins (or tiebreaker: team power)
    const sorted = [...room.players].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      const powerA = a.characters.reduce((s, c) => s + c.stats.power, 0);
      const powerB = b.characters.reduce((s, c) => s + c.stats.power, 0);
      return powerB - powerA;
    });

    const champion = sorted[0];

    const standings = sorted.map((p, idx) => {
      const teamValue = p.characters.reduce((s, c) => s + c.stats.power, 0);
      const mvp = p.characters.length > 0 
        ? [...p.characters].sort((a, b) => b.stats.power - a.stats.power)[0].name 
        : 'None';

      return {
        playerId: p.id,
        playerName: p.name,
        rank: idx + 1,
        teamValue,
        battlesWon: p.wins || 0,
        auctionWins: p.characters.length,
        mvpCharacter: mvp
      };
    });

    room.tournament = {
      matches: [],
      currentMatchIndex: 0,
      championId: champion.id,
      championName: champion.name,
      standings
    };

    DatabaseService.saveRoom(room);
    this.callbacks.broadcastToRoom(room.roomCode, 'GAME_COMPLETED', {
      tournament: room.tournament,
      room
    });
  }

  public playAgain(socketId: string): { success: boolean } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false };

    const room = this.rooms.get(info.roomCode);
    if (!room) return { success: false };

    room.phase = 'LOBBY';
    room.auction = null;
    room.battleRound = null;
    room.tournament = null;
    room.unsoldRotationIndex = 0;

    for (const p of room.players) {
      p.coins = room.settings.startingCoins;
      p.characters = [];
      p.wins = 0;
      p.eliminated = false;
      p.isReady = p.isHost || Boolean(p.isBot);
      p.selectedFighterId = undefined;
      p.fighterLocked = false;
      p.defeatedCharacterIds = [];
      p.usedCharacterIds = [];
      p.passesRemaining = DEFAULT_PASSES_PER_PLAYER;
    }

    DatabaseService.saveRoom(room);
    this.callbacks.broadcastToRoom(room.roomCode, 'STATE_SYNC', { room });
    return { success: true };
  }

  public handleDisconnect(socketId: string) {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return;

    this.socketToPlayer.delete(socketId);
    this.playerToSocket.delete(info.playerId);

    const room = this.rooms.get(info.roomCode);
    if (!room) return;

    const player = room.players.find(p => p.id === info.playerId);
    if (player) {
      player.connected = false;
    }

    if (room.hostId === info.playerId) {
      // Transfer host ONLY to another connected HUMAN player, never to a bot
      const nextConnected = room.players.find(p => p.id !== info.playerId && p.connected && !p.isBot);
      if (nextConnected) {
        room.hostId = nextConnected.id;
        nextConnected.isHost = true;
      }
    }

    DatabaseService.saveRoom(room);
    this.callbacks.broadcastToRoom(info.roomCode, 'PLAYER_LEFT', {
      playerId: info.playerId,
      room
    });
  }

  private bindSocket(socketId: string, playerId: string, roomCode: string) {
    this.socketToPlayer.set(socketId, { playerId, roomCode });
    this.playerToSocket.set(playerId, socketId);
  }

  public getRoomByCode(code: string): RoomState | undefined {
    return this.rooms.get(code.toUpperCase());
  }

  // ==================== BOT TIMERS & AUTOMATION ====================

  public clearBotTimers(roomCode: string) {
    const timers = this.botTimers.get(roomCode);
    if (timers) {
      timers.forEach(t => clearTimeout(t));
      this.botTimers.delete(roomCode);
    }
  }

  private scheduleBotTimer(roomCode: string, fn: () => void, delayMs: number): NodeJS.Timeout {
    const timer = setTimeout(() => {
      const current = this.botTimers.get(roomCode) || [];
      const idx = current.indexOf(timer);
      if (idx !== -1) current.splice(idx, 1);
      fn();
    }, delayMs);

    const existing = this.botTimers.get(roomCode) || [];
    existing.push(timer);
    this.botTimers.set(roomCode, existing);
    return timer;
  }

  public triggerBotDecisions(room: RoomState) {
    if (room.phase !== 'AUCTION' || !room.auction) return;
    if (room.auction.status !== 'ACTIVE' && room.auction.status !== 'EXTENDED') return;

    this.clearBotTimers(room.roomCode);

    const bots = room.players.filter(p => p.isBot && p.characters.length < room.settings.charactersPerPlayer);
    if (bots.length === 0) return;

    for (const bot of bots) {
      const decision = BotEngine.decideAuctionAction(bot, room);

      if (decision.action === 'BID' && decision.amount) {
        const bidAmount = decision.amount;
        const targetCharacterId = room.auction.character?.id;
        const currentRound = room.auction.currentRound;

        this.scheduleBotTimer(room.roomCode, () => {
          const currentRoom = this.rooms.get(room.roomCode);
          if (!currentRoom || currentRoom.phase !== 'AUCTION' || !currentRoom.auction) return;
          if (currentRoom.auction.status !== 'ACTIVE' && currentRoom.auction.status !== 'EXTENDED') return;
          if (currentRoom.auction.currentRound !== currentRound) return;
          if (currentRoom.auction.character?.id !== targetCharacterId) return;

          this.executeBotBid(room.roomCode, bot.id, bidAmount);
        }, decision.delayMs);
      } else if (decision.action === 'PASS') {
        const targetCharacterId = room.auction.character?.id;
        const currentRound = room.auction.currentRound;

        this.scheduleBotTimer(room.roomCode, () => {
          const currentRoom = this.rooms.get(room.roomCode);
          if (!currentRoom || currentRoom.phase !== 'AUCTION' || !currentRoom.auction) return;
          if (currentRoom.auction.currentRound !== currentRound) return;
          if (currentRoom.auction.character?.id !== targetCharacterId) return;

          this.executeBotPass(room.roomCode, bot.id);
        }, decision.delayMs);
      }
    }
  }

  private executeBotBid(roomCode: string, botId: string, amount: number) {
    const room = this.rooms.get(roomCode);
    if (!room || room.phase !== 'AUCTION' || !room.auction) return;

    const bot = room.players.find(p => p.id === botId && p.isBot);
    if (!bot) return;

    if (bot.characters.length >= room.settings.charactersPerPlayer) return;
    if (room.auction.passedPlayerIds?.includes(bot.id)) return;
    if (room.auction.currentLeaderId === bot.id) return;

    const auctionEngine = this.auctionEngines.get(room.roomCode);
    if (!auctionEngine) return;

    const minRequiredBid = room.auction.currentBid === 0
      ? (room.auction.startingBid || 100)
      : room.auction.currentBid + room.settings.bidIncrement;

    const finalBid = Math.max(amount, minRequiredBid);
    if (bot.coins < finalBid) return;

    const result = auctionEngine.placeBid(bot, finalBid, room.settings.bidIncrement);
    if (result.success) {
      room.auction = {
        ...auctionEngine.getState(),
        passedPlayerIds: room.auction.passedPlayerIds || []
      };
      DatabaseService.saveRoom(room);
      this.triggerBotDecisions(room);
    }
  }

  private executeBotPass(roomCode: string, botId: string) {
    const room = this.rooms.get(roomCode);
    if (!room || room.phase !== 'AUCTION' || !room.auction) return;

    const bot = room.players.find(p => p.id === botId && p.isBot);
    if (!bot) return;

    if (room.auction.status !== 'ACTIVE' && room.auction.status !== 'EXTENDED') return;
    if (room.auction.currentLeaderId === bot.id) return;
    if (room.auction.passedPlayerIds?.includes(bot.id)) return;

    const minBid = room.auction.startingBid || 100;
    if (bot.coins >= minBid) return;

    const currentPasses = bot.passesRemaining !== undefined ? bot.passesRemaining : DEFAULT_PASSES_PER_PLAYER;
    if (currentPasses <= 0) return;

    if (!room.auction.passedPlayerIds) {
      room.auction.passedPlayerIds = [];
    }

    room.auction.passedPlayerIds.push(bot.id);
    bot.passesRemaining = currentPasses - 1;
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'PLAYER_PASSED_AUCTION', {
      playerId: bot.id,
      playerName: bot.name,
      passedPlayerIds: room.auction.passedPlayerIds,
      room
    });

    const eligiblePlayers = room.players.filter(
      p => p.characters.length < room.settings.charactersPerPlayer
    );

    // Case 1: ALL eligible players passed and NO ONE bid -> Character is UNSOLD!
    const allPassed = eligiblePlayers.length > 0 && eligiblePlayers.every(p => room.auction!.passedPlayerIds!.includes(p.id));
    if (allPassed && (room.auction.currentBid === 0 || !room.auction.currentLeaderId)) {
      const engine = this.auctionEngines.get(room.roomCode);
      if (engine) engine.destroy();

      const character = room.auction.character;
      room.auction.status = 'UNSOLD';
      room.auction.winnerId = null;
      room.auction.winnerName = null;
      room.auction.winningBid = 0;
      DatabaseService.saveRoom(room);

      if (character) {
        this.callbacks.broadcastToRoom(room.roomCode, 'CHARACTER_UNSOLD', { character, room });
      }

      setTimeout(() => {
        this.launchNextAuctionRound(room);
      }, 1400);
      return;
    }

    // Case 2: One player has a winning bid and all other eligible competitors passed -> Fast-forward win!
    if (room.auction.currentLeaderId && room.auction.currentBid > 0) {
      const remainingCompetitors = eligiblePlayers.filter(p => p.id !== room.auction!.currentLeaderId);
      const allCompetitorsPassed = remainingCompetitors.length > 0 && remainingCompetitors.every(p => room.auction!.passedPlayerIds!.includes(p.id));
      if (allCompetitorsPassed) {
        const engine = this.auctionEngines.get(room.roomCode);
        if (engine) engine.destroy();

        this.handleCharacterSold(
          room,
          room.auction.currentLeaderId,
          room.auction.currentLeaderName || 'Winner',
          room.auction.character!,
          room.auction.currentBid,
          false
        );
      }
    }
  }

  public triggerBotFighterSelection(room: RoomState) {
    if (room.phase !== 'BATTLE' || !room.battleRound || room.battleRound.subPhase !== 'SELECTION') return;

    const bots = room.players.filter(p => p.isBot && !p.fighterLocked);
    if (bots.length === 0) return;

    for (const bot of bots) {
      const remainingHeroes = bot.characters.filter(
        c => !bot.usedCharacterIds?.includes(c.id) && !bot.defeatedCharacterIds?.includes(c.id)
      );
      if (remainingHeroes.length === 0) continue;

      const humanOpponent = room.players.find(p => p.id !== bot.id);
      const chosenHero = BotEngine.chooseFighter(bot, humanOpponent);
      if (!chosenHero) continue;

      const delayMs = 1200 + Math.floor(Math.random() * 800);
      this.scheduleBotTimer(room.roomCode, () => {
        const currentRoom = this.rooms.get(room.roomCode);
        if (!currentRoom || currentRoom.phase !== 'BATTLE' || !currentRoom.battleRound || currentRoom.battleRound.subPhase !== 'SELECTION') return;
        this.executeBotLockFighter(room.roomCode, bot.id, chosenHero.id);
      }, delayMs);
    }
  }

  private executeBotLockFighter(roomCode: string, botId: string, characterId: string) {
    const room = this.rooms.get(roomCode);
    if (!room || room.phase !== 'BATTLE' || !room.battleRound || room.battleRound.subPhase !== 'SELECTION') return;

    const bot = room.players.find(p => p.id === botId && p.isBot);
    if (!bot || bot.fighterLocked) return;

    const char = bot.characters.find(c => c.id === characterId);
    if (!char) return;

    bot.selectedFighterId = characterId;
    bot.fighterLocked = true;

    const sel = room.battleRound.activeFighterSelections.find(s => s.playerId === bot.id);
    if (sel) {
      sel.isLocked = true;
    }

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'PLAYER_LOCKED_FIGHTER', {
      playerId: bot.id,
      room
    });

    const playersWithUnusedFighters = room.players.filter(p => {
      const remaining = p.characters.filter(c => !p.usedCharacterIds?.includes(c.id));
      return remaining.length > 0;
    });

    const allLocked = playersWithUnusedFighters.every(p => p.fighterLocked);
    if (allLocked) {
      this.triggerSecretRevealAndBouts(room);
    }
  }
}
