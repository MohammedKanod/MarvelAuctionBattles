import { RoomManager } from '../game/RoomManager';
import { RoomState } from '../../../shared/types';

function runPassAuctionTests() {
  console.log('=== TESTING AUCTION PASS & LOW POINTS MECHANICS ===\n');
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
    charactersPerPlayer: 3,
    startingCoins: 1000,
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
  assert(startRes.success, `Game started, auction round #1 launched`);
  assert(Boolean(room.auction), 'Auction is active');

  // Scenario 1: Players have 1000 coins (>= 100). Passing is NOT allowed!
  console.log('\n[Scenario 1] Passing is forbidden when coins >= minimum bid:');
  const forbiddenPass = roomManager.passAuction('socket-p1');
  assert(!forbiddenPass.success, `Pass rejected for player with 1000 coins: ${forbiddenPass.error}`);
  assert(forbiddenPass.error?.includes('below the minimum bid') === true, 'Error explains pass only allowed below minimum bid');

  // If both players don't bid when points >= 100, character gets UNSOLD
  console.log('\n[Scenario 1b] When both players have enough coins and neither bids, character gets UNSOLD:');
  const char1 = room.auction!.character!;
  (roomManager as any).handleNoBids(room, char1);
  assert(room.auction!.status === 'UNSOLD', 'Character is marked UNSOLD when no one bid and coins >= 100');
  assert(p1.characters.length === 0, 'Player 1 characters count is 0');
  assert(p2.characters.length === 0, 'Player 2 characters count is 0');

  // Scenario 2: Player 1 has 50 coins (< 100). Player 2 has 1000 coins. Player 2 does not bid.
  console.log('\n[Scenario 2] Player 1 has 50 coins (< 100). Player 2 does not bid. Player 1 did not pass:');
  (roomManager as any).launchNextAuctionRound(room);
  p1.coins = 50; // Player 1 is below minimum bid 100
  p2.coins = 1000;
  const char2 = room.auction!.character!;

  (roomManager as any).handleNoBids(room, char2);
  assert(room.auction!.status === 'SOLD', 'Character is SOLD to low-points player');
  assert(room.auction!.winnerId === p1.id, 'Player 1 receives the character');
  assert(room.auction!.isFreeAssignment === true, 'Assigned via low-points priority (isFreeAssignment = true)');
  assert(p1.characters.length === 1 && p1.characters[0].id === char2.id, 'Character added to Player 1 roster');
  assert(p1.coins === 50, 'Player 1 coins remain intact (not deducted below 0)');

  // Scenario 3: Player 1 has 50 coins (< 100). Player 1 decides to PASS on this hero.
  console.log('\n[Scenario 3] Player 1 has 50 coins and PASSES on character:');
  (roomManager as any).launchNextAuctionRound(room);
  const char3 = room.auction!.character!;
  assert(p1.passesRemaining === 3, 'Player 1 starts with 3 passes');

  const p1Pass = roomManager.passAuction('socket-p1');
  assert(p1Pass.success, 'Player 1 successfully passed because coins (50) < 100');
  assert(p1.passesRemaining === 2, 'Player 1 now has 2 passes left');
  assert(room.auction!.passedPlayerIds?.includes(p1.id) === true, 'Player 1 recorded in passedPlayerIds');

  // Player 2 does not bid, round ends
  (roomManager as any).handleNoBids(room, char3);
  assert(room.auction!.status === 'UNSOLD', 'Character is UNSOLD because Player 1 passed and Player 2 did not bid');
  assert(p1.characters.length === 1, 'Player 1 did NOT receive char3');

  // Scenario 4: Player 1 has 50 coins (< 100). Player 2 BIDS 100 on character.
  console.log('\n[Scenario 4] Player 1 has 50 coins, but Player 2 bids on character:');
  (roomManager as any).launchNextAuctionRound(room);
  const char4 = room.auction!.character!;
  const p2Bid = roomManager.placeBid('socket-p2', 100);
  assert(p2Bid.success, 'Player 2 bids 100');
  assert(room.auction!.currentLeaderId === p2.id, 'Player 2 is leader');

  // Complete round as sold to Player 2
  (roomManager as any).handleCharacterSold(room, p2.id, p2.name, char4, 100, false);
  assert(room.auction!.winnerId === p2.id, 'Player 2 wins the character with their bid');
  assert(p2.characters.length === 1, 'Character added to Player 2 roster');
  assert(p2.coins === 900, 'Player 2 coins deducted for winning bid (1000 - 100 = 900)');

  // Scenario 5: Both players have coins < 100 (Player 1 has 50, Player 2 has 20). Neither passes.
  console.log('\n[Scenario 5] Both players have coins < 100. Lower points player gets character:');
  (roomManager as any).launchNextAuctionRound(room);
  p1.coins = 50;
  p2.coins = 20;
  const char5 = room.auction!.character!;

  (roomManager as any).handleNoBids(room, char5);
  assert(room.auction!.winnerId === p2.id, 'Player 2 (20 coins) has lower points than Player 1 (50 coins) and receives hero');
  assert(p2.characters.length === 2, 'Player 2 receives character');

  // Scenario 6: Pass quota limit (3 passes max per player)
  console.log('\n[Scenario 6] Pass quota limit (max 3 passes):');
  (roomManager as any).launchNextAuctionRound(room);
  // Player 1 has 2 passes left
  const passRound2 = roomManager.passAuction('socket-p1');
  assert(passRound2.success, 'Player 1 uses 2nd pass');
  assert(p1.passesRemaining === 1, 'Player 1 has 1 pass left');

  (roomManager as any).launchNextAuctionRound(room);
  const passRound3 = roomManager.passAuction('socket-p1');
  assert(passRound3.success, 'Player 1 uses 3rd pass');
  assert(p1.passesRemaining === 0, 'Player 1 has 0 passes left');

  (roomManager as any).launchNextAuctionRound(room);
  const passRound4 = roomManager.passAuction('socket-p1');
  assert(!passRound4.success, `4th pass rejected: ${passRound4.error}`);
  assert(passRound4.error?.includes('no passes') === true, 'Error explains 0 passes left');

  console.log(`\n=== ALL PASS & LOW POINTS TESTS PASSED: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
  process.exit(0);
}

runPassAuctionTests();
