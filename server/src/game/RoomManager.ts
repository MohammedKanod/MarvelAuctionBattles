import { RoomState, RoomSettings, Player, Character, GamePhase, AuctionState, TournamentState, BattleRoundState, BattleBout } from '../../../shared/types';
import { DEFAULT_ROOM_SETTINGS } from '../../../shared/constants';
import { getRandomCharacters, getCharacterById } from '../data/characters';
import { AuctionEngine } from '../auction/AuctionEngine';
import { BattleEngine } from '../battle/BattleEngine';
import { TournamentEngine } from '../tournament/TournamentEngine';
import { DatabaseService } from '../database/db';

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
    socketId: string
  ): { room: RoomState; player: Player; sessionToken: string } {
    const roomCode = this.generateRoomCode();
    const playerId = `player-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const sessionId = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const sessionToken = `token_${Buffer.from(`${playerId}:${roomCode}:${Date.now()}`).toString('base64')}`;

    const mergedSettings: RoomSettings = {
      ...DEFAULT_ROOM_SETTINGS,
      ...settings
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
      defeatedCharacterIds: []
    };

    room.players.push(newPlayer);
    this.bindSocket(socketId, playerId, code);
    DatabaseService.saveSession(sessionToken, { sessionId, playerId, roomCode: code, name: newPlayer.name });
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(code, 'PLAYER_JOINED', { player: newPlayer, room });
    return { success: true, room, player: newPlayer, sessionToken };
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

    if (room.hostId !== info.playerId) {
      return { success: false, error: 'Only the host can start the game.' };
    }

    if (room.players.length < 2) {
      return { success: false, error: 'At least 2 players are required to start.' };
    }

    const unreadyPlayers = room.players.filter(p => !p.isReady);
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
      onTick: (timerSeconds, endsAt) => {
        this.callbacks.broadcastToRoom(room.roomCode, 'AUCTION_TIMER_TICK', { timerSeconds, endsAt });
      },
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
        this.handleNoBidsFairAssignment(room, character);
      }
    });

    this.auctionEngines.set(room.roomCode, auctionEngine);
    auctionEngine.startRound(nextCharacter, currentRound, totalRounds, room.settings.auctionTimerSeconds);
    room.auction = auctionEngine.getState();
    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'AUCTION_ROUND_STARTED', {
      auction: room.auction,
      room
    });
  }

  public placeBid(socketId: string, amount: number): { success: boolean; error?: string } {
    const info = this.socketToPlayer.get(socketId);
    if (!info) return { success: false, error: 'Player session not found.' };

    const room = this.rooms.get(info.roomCode);
    if (!room || room.phase !== 'AUCTION') {
      return { success: false, error: 'Auction is not currently active.' };
    }

    const player = room.players.find(p => p.id === info.playerId);
    if (!player) return { success: false, error: 'Player not found in room.' };

    // Rule: Cannot bid if player already filled all character slots
    if (player.characters.length >= room.settings.charactersPerPlayer) {
      return { success: false, error: 'Your roster is already full!' };
    }

    const auctionEngine = this.auctionEngines.get(room.roomCode);
    if (!auctionEngine) {
      return { success: false, error: 'Auction engine is not running.' };
    }

    const result = auctionEngine.placeBid(player, amount, room.settings.bidIncrement);
    if (result.success) {
      room.auction = auctionEngine.getState();
      DatabaseService.saveRoom(room);
    }
    return result;
  }

  private handleCharacterSold(
    room: RoomState,
    winnerId: string,
    winnerName: string,
    character: Character,
    winningBid: number
  ) {
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
    }

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'CHARACTER_SOLD', {
      winnerId,
      winnerName,
      character,
      winningBid,
      isFreeAssignment: false,
      room
    });

    setTimeout(() => {
      this.launchNextAuctionRound(room);
    }, 3200);
  }

  /**
   * Fair rotating automatic assignment when a character receives NO bids.
   * Finds eligible players who still need characters, prioritizes lowest character count,
   * and rotates priority fairly across rounds.
   */
  private handleNoBidsFairAssignment(room: RoomState, character: Character) {
    // 1. Eligible players who still have open slots
    const eligiblePlayers = room.players.filter(
      p => p.characters.length < room.settings.charactersPerPlayer
    );

    if (eligiblePlayers.length === 0) {
      this.transitionAuctionToBattle(room);
      return;
    }

    // 2. Find minimum character count among eligible players
    const minCount = Math.min(...eligiblePlayers.map(p => p.characters.length));
    const candidates = eligiblePlayers.filter(p => p.characters.length === minCount);

    // 3. Rotating priority selection
    const chosenIndex = room.unsoldRotationIndex % candidates.length;
    const recipient = candidates[chosenIndex];
    room.unsoldRotationIndex++;

    // Assign character for 0 coins
    recipient.characters.push(character);

    if (room.auction) {
      room.auction.status = 'SOLD';
      room.auction.winnerId = recipient.id;
      room.auction.winnerName = recipient.name;
      room.auction.winningBid = 0;
      room.auction.isFreeAssignment = true;
    }

    DatabaseService.saveRoom(room);

    this.callbacks.broadcastToRoom(room.roomCode, 'CHARACTER_SOLD', {
      winnerId: recipient.id,
      winnerName: recipient.name,
      character,
      winningBid: 0,
      isFreeAssignment: true,
      room
    });

    setTimeout(() => {
      this.launchNextAuctionRound(room);
    }, 3200);
  }

  /**
   * Transition from Auction to Battle Act
   */
  private transitionAuctionToBattle(room: RoomState) {
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
      p.isReady = p.isHost;
      p.selectedFighterId = undefined;
      p.fighterLocked = false;
      p.defeatedCharacterIds = [];
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
      const nextConnected = room.players.find(p => p.id !== info.playerId && p.connected);
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
}
