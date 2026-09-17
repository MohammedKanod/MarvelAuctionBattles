import { RoomManager } from '../game/RoomManager';
import { RoomState } from '../../../shared/types';

function runPassAuctionTests() {
  console.log('=== TESTING AUCTION PASS & UNSOLD NO-ACQUISITION MECHANICS ===\n');
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

  const broadcasts: { event: string; payload: any }[] = [];
  const roomManager = new RoomManager({
    broadcastToRoom: (roomCode, event, payload) => {
      broadcasts.push({ event, payload });
    },
    sendToPlayer: () => {}
  });

  // Setup room with 2 players
  const createRes = roomManager.createRoom('Player1', {
    maxPlayers: 2,
    charactersPerPlayer: 2,
    startingCoins: 1500,
    bidIncrement: 50,
    allowDuplicates: false,
    auctionTimerSeconds: 10,
    battleFormat: 'RoundRobin'
  }, 'socket-p1');

  const p1 = createRes.player;
  const room = (roomManager as any).rooms.get(createRes.room.roomCode) as RoomState;
  const joinRes = roomManager.joinRoom(room.roomCode, 'Player2', 'socket-p2');
  const p2 = room.players.find(p => p.id !== p1.id)!;

  assert(Boolean(p1 && p2), 'Both players created in room');

  // Ready up player 2 (host starts isReady: true)
  roomManager.toggleReady('socket-p2');
  const startRes = roomManager.startGame('socket-p1');
  assert(startRes.success, `Game started, auction round #1 launched (error: ${startRes.error})`);
  assert(Boolean(room.auction), 'Auction is active');

  const char1 = room.auction!.character!;
  assert(Boolean(char1), `Hero for Round #1 is ${char1.name}`);

  // Test 1: Player 1 passes
  console.log('\n[Scenario 1] Player 1 passes auction:');
  const pass1 = roomManager.passAuction('socket-p1');
  assert(pass1.success, 'Player 1 successfully submitted pass');
  assert(room.auction!.passedPlayerIds?.includes(p1.id) === true, 'Player 1 recorded in passedPlayerIds');

  // Test 2: Player 1 cannot bid after passing on this hero
  console.log('\n[Scenario 2] Player 1 tries to bid after passing:');
  const illegalBid = roomManager.placeBid('socket-p1', 100);
  assert(!illegalBid.success, `Bid rejected: ${illegalBid.error}`);
  assert(illegalBid.error?.includes('already passed') === true, 'Error explains player already passed');

  // Test 3: Player 2 also passes -> BOTH pass -> Hero is UNSOLD, neither player receives hero!
  console.log('\n[Scenario 3] Player 2 also passes (both passed):');
  const pass2 = roomManager.passAuction('socket-p2');
  assert(pass2.success, 'Player 2 successfully submitted pass');
  assert(room.auction!.status === 'UNSOLD', 'Auction status is marked UNSOLD');
  assert(room.auction!.winnerId === null, 'winnerId is NULL');
  assert(p1.characters.length === 0, 'Player 1 characters count is 0 (did NOT get hero)');
  assert(p2.characters.length === 0, 'Player 2 characters count is 0 (did NOT get hero)');
  
  const unsoldBroadcast = broadcasts.find(b => b.event === 'CHARACTER_UNSOLD');
  assert(Boolean(unsoldBroadcast), 'CHARACTER_UNSOLD broadcasted to room');

  // Test 4: Scenario where one player bids and the other passes -> bidder gets hero immediately without clock delay
  console.log('\n[Scenario 4] One player bids and opponent passes:');
  // Wait or manually advance to next character round
  (roomManager as any).launchNextAuctionRound(room);
  assert(room.auction!.status === 'ACTIVE', 'Auction round #2 active');
  const char2 = room.auction!.character!;
  assert(Boolean(char2), `Hero for Round #2 is ${char2.name}`);

  // Player 1 bids 100
  const bidRes = roomManager.placeBid('socket-p1', 100);
  assert(bidRes.success, 'Player 1 bids 100');
  assert(room.auction!.currentLeaderId === p1.id, 'Player 1 is current leader');

  // Player 1 cannot pass while leading
  const leaderPass = roomManager.passAuction('socket-p1');
  assert(!leaderPass.success, `Leader cannot pass: ${leaderPass.error}`);

  // Player 2 passes -> Player 1 immediately gets the character
  const p2Pass = roomManager.passAuction('socket-p2');
  assert(p2Pass.success, 'Player 2 passes');
  assert(room.auction!.status === 'SOLD', 'Auction immediately marked SOLD');
  assert(room.auction!.winnerId === p1.id, 'Player 1 is the winner');
  assert(p1.characters.some(c => c.id === char2.id), 'Player 1 has character in roster');
  assert(!p2.characters.some(c => c.id === char2.id), 'Player 2 does NOT have character');

  console.log(`\n=== PASS AUCTION SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
  process.exit(0);
}

runPassAuctionTests();
