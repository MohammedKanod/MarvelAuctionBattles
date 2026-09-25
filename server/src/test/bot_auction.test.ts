import { RoomManager } from '../game/RoomManager';
import { BotEngine } from '../bot/BotEngine';
import { Character, RoomState, Player } from '../../../shared/types';
import { getCharacterById } from '../data/characters';

async function runBotTests() {
  console.log('=== TESTING COMPUTER BOT ALGORITHM & ROOM INTEGRATION ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. Test Bot Player Creation
  console.log('[Test 1] Bot Player Generation:');
  const dummySettings = {
    maxPlayers: 2,
    charactersPerPlayer: 3,
    startingCoins: 1000,
    bidIncrement: 50,
    allowDuplicates: false,
    auctionTimerSeconds: 10,
    battleFormat: 'SingleElimination' as const
  };

  const botPlayer = BotEngine.createBotPlayer(dummySettings);
  assert(botPlayer.isBot === true, 'Player has isBot flag set to true');
  assert(botPlayer.isReady === true, 'Bot is ready by default');
  assert(botPlayer.coins === 1000, 'Bot has starting coins (1000)');
  assert(botPlayer.name.length > 0, `Bot generated with name: ${botPlayer.name}`);

  // 2. Test Character Valuation Algorithm
  console.log('\n[Test 2] Character Valuation Algorithm:');
  const ironMan = getCharacterById('iron-man') || {
    id: 'iron-man',
    name: 'Iron Man',
    universe: 'Marvel',
    role: 'Blaster' as const,
    rarity: 'Legendary' as const,
    stats: { power: 90, strength: 85, speed: 80, durability: 85, combat: 84, range: 92, intelligence: 98 },
    specialAbilities: ['Repulsor Blast', 'Unibeam'],
    description: 'Armored Avenger',
    visuals: { primaryColor: '#f00', accentColor: '#ff0', badgeText: 'AVENGER', comicQuote: 'I am Iron Man' },
    tacticalNotes: 'High tech weaponry',
    matchupStrengths: ['Tank', 'Striker'],
    matchupWeaknesses: ['Sorcerer']
  };

  const mockRoom: RoomState = {
    roomId: 'room-test',
    roomCode: 'TEST01',
    hostId: 'p1',
    phase: 'AUCTION',
    settings: dummySettings,
    players: [botPlayer],
    auction: {
      currentRound: 1,
      totalRounds: 6,
      character: ironMan,
      startingBid: 100,
      currentBid: 0,
      currentLeaderId: null,
      currentLeaderName: null,
      timerSeconds: 10,
      endsAt: Date.now() + 10000,
      status: 'ACTIVE',
      bidHistory: [],
      winnerId: null,
      winnerName: null,
      winningBid: null
    },
    battleRound: null,
    tournament: null,
    createdAt: Date.now(),
    unsoldRotationIndex: 0
  };

  const valuation = BotEngine.evaluateCharacterValue(ironMan, botPlayer, mockRoom);
  assert(valuation > 400, `High valuation calculated for Legendary Iron Man (${valuation} coins)`);

  const wtp = BotEngine.getWillingnessToPay(ironMan, botPlayer, mockRoom);
  assert(wtp >= 200 && wtp <= 400, `Willingness to pay computed within realistic budget bounds: ${wtp} coins`);

  // Reserve check: With 3 slots needed and 1000 coins, reserve preserves at least 150*2 = 300 coins.
  assert(wtp <= 380, `Iron Man WTP adheres to Legendary budget cap (WTP ${wtp} <= 380)`);

  // 2b. Test Hulk Specific Budget Protection (Fixing user's issue: Bot bidding $700 leaving $300)
  console.log('\n[Test 2b] Hulk Budget Protection & Future Slot Reserve:');
  const hulk = getCharacterById('hulk') || {
    id: 'hulk',
    name: 'Hulk',
    universe: 'Marvel',
    role: 'Tank' as const,
    rarity: 'Legendary' as const,
    stats: { power: 96, strength: 100, speed: 60, durability: 98, combat: 80, range: 40, intelligence: 55 },
    specialAbilities: ['Thunderclap', 'Rage Empowerment'],
    description: 'Green Goliath',
    visuals: { primaryColor: '#0f0', accentColor: '#080', badgeText: 'SMASH', comicQuote: 'Hulk Smash' },
    tacticalNotes: 'Immense physical force',
    matchupStrengths: ['Striker', 'Blaster'],
    matchupWeaknesses: ['Sorcerer']
  };

  const hulkWtp = BotEngine.getWillingnessToPay(hulk, botPlayer, mockRoom);
  assert(
    hulkWtp <= 380,
    `Hulk WTP is strictly capped under single-hero budget limit (${hulkWtp} <= 380 🪙). Bot will NEVER bid $700 and leave $300!`
  );
  assert(
    (botPlayer.coins - hulkWtp) >= 620,
    `Bot safely preserves at least 620🪙 for remaining slots after bidding on Hulk (remaining: ${botPlayer.coins - hulkWtp}🪙)`
  );

  // 2c. Test Superhero PhD Lore & Opponent Counter-Drafting (Magneto vs Metal heroes)
  console.log('\n[Test 2c] Superhero PhD Lore & Counter-Drafting (Magneto vs Metal heroes):');
  const magneto = getCharacterById('magneto') || {
    id: 'magneto',
    name: 'Magneto',
    universe: 'Marvel',
    role: 'Blaster' as const,
    rarity: 'Legendary' as const,
    stats: { power: 94, strength: 60, speed: 75, durability: 85, combat: 85, range: 95, intelligence: 96 },
    specialAbilities: ['Magnetic Mastery', 'Metallic Crush'],
    description: 'Master of Magnetism',
    visuals: { primaryColor: '#800', accentColor: '#400', badgeText: 'MUTANT', comicQuote: 'Never again' },
    tacticalNotes: 'Dominates metal opponents',
    matchupStrengths: ['Tank'],
    matchupWeaknesses: ['Speedster']
  };

  const humanWithoutMetal: Player = {
    id: 'p-human',
    sessionId: 's-human',
    name: 'HumanPlayer',
    isHost: true,
    isReady: true,
    connected: true,
    coins: 1000,
    characters: [], // No heroes yet
    wins: 0,
    eliminated: false,
    avatarSeed: 1
  };

  const humanWithIronMan: Player = {
    ...humanWithoutMetal,
    characters: [ironMan] // Opponent has drafted Iron Man!
  };

  const roomWithoutOppMetal: RoomState = { ...mockRoom, players: [botPlayer, humanWithoutMetal] };
  const roomWithOppMetal: RoomState = { ...mockRoom, players: [botPlayer, humanWithIronMan] };

  const magValNormal = BotEngine.evaluateCharacterValue(magneto, botPlayer, roomWithoutOppMetal);
  const magValCounter = BotEngine.evaluateCharacterValue(magneto, botPlayer, roomWithOppMetal);

  assert(
    magValCounter > magValNormal,
    `Magneto valuation rises significantly when opponent has Iron Man (${magValCounter} > ${magValNormal}) due to +18 combat counter!`
  );

  // 3. Test Bidding Decision when price is affordable
  console.log('\n[Test 3] Bot Bidding Decision Logic:');
  const decision1 = BotEngine.decideAuctionAction(botPlayer, mockRoom);
  assert(decision1.action === 'BID', `Bot decides to BID when currentBid is 0 (amount: ${decision1.amount}🪙)`);
  assert(decision1.delayMs > 0, `Bot provides human-like delay (${decision1.delayMs}ms)`);

  // 4. Test Decision when price is higher than WTP
  console.log('\n[Test 4] Bot Refuses to Bid When Overpriced:');
  mockRoom.auction!.currentBid = 950;
  mockRoom.auction!.currentLeaderId = 'p1';
  const decision2 = BotEngine.decideAuctionAction(botPlayer, mockRoom);
  assert(decision2.action !== 'BID', `Bot refuses to bid when currentBid (950) exceeds valuation/budget ceiling: action is ${decision2.action}`);

  // 5. Test RoomManager withBot creation
  console.log('\n[Test 5] RoomManager Create Room With Bot:');
  const broadcasts: { event: string; payload: any }[] = [];
  const roomManager = new RoomManager({
    broadcastToRoom: (roomCode, event, payload) => {
      broadcasts.push({ event, payload });
    },
    sendToPlayer: () => {}
  });

  const createRes = roomManager.createRoom('HumanPlayer', dummySettings, 'socket-human', true);
  const createdRoom = (roomManager as any).rooms.get(createRes.room.roomCode) as RoomState;
  assert(createdRoom.players.length === 2, `Room created with 2 players (human + bot)`);
  assert(createdRoom.players[0].name === 'HumanPlayer', `Player 1 is HumanPlayer`);
  assert(createdRoom.players[1].isBot === true, `Player 2 is Bot (${createdRoom.players[1].name})`);
  assert(createdRoom.players[1].isReady === true, `Bot player is ready to start`);

  // 5b. Test Start Room Button Reliability (Disconnect & Reconnect host preservation)
  console.log('\n[Test 5b] Start Room Button Reliability & Host Protection:');
  // Simulate human socket disconnect
  roomManager.handleDisconnect('socket-human');
  assert(createdRoom.hostId !== createdRoom.players[1].id, 'Bot was NOT made host upon human disconnect');

  // Simulate human reconnection with new socket
  const reconnectRes = roomManager.reconnect(createRes.sessionToken, createdRoom.roomCode, 'socket-human-reconnected');
  assert(reconnectRes.success === true, 'Human successfully reconnected');
  assert(reconnectRes.player?.isHost === true, 'Human retained host status');
  assert(createdRoom.hostId === reconnectRes.player?.id, 'Room hostId correctly points to human');

  // Test that human can start game immediately
  const startAfterReconnect = roomManager.startGame('socket-human-reconnected');
  assert(startAfterReconnect.success === true, 'Start Room works smoothly after reconnection!');

  // 6. Test Start Game & Bot Auction Bidding
  console.log('\n[Test 6] Bot Auction Automation in Active Room:');
  assert(createdRoom.phase === 'AUCTION', 'Room enters AUCTION phase');
  assert(Boolean(createdRoom.auction), 'Auction round initialized');

  // Verify Bot decision was triggered and scheduled
  const timers = (roomManager as any).botTimers.get(createdRoom.roomCode);
  assert(timers && timers.length > 0, 'Bot action timer was scheduled on auction launch');

  // 7. Test Bot Fighter Selection in Battle
  console.log('\n[Test 7] Bot Tactical Fighter Selection:');
  const botHero1 = getCharacterById('thor') || ironMan;
  const botHero2 = getCharacterById('hulk') || ironMan;
  const botWithHeroes: Player = {
    ...botPlayer,
    characters: [botHero1, botHero2],
    usedCharacterIds: [botHero1.id] // Thor already used
  };

  const chosenHero = BotEngine.chooseFighter(botWithHeroes);
  assert(chosenHero?.id === botHero2.id, `Bot chooses unused hero (${chosenHero?.name}) instead of already used hero`);

  console.log(`\n=== ALL BOT TESTS COMPLETED: ${passed} PASSED, ${failed} FAILED ===`);
  process.exit(failed > 0 ? 1 : 0);
}

runBotTests();
