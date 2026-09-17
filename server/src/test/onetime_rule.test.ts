import { MARVEL_CHARACTERS, getCharacterById } from '../data/characters';
import { RoomManager } from '../game/RoomManager';
import { RoomState, Player } from '../../../shared/types';

function runOnetimeDeploymentTests() {
  console.log('=== TESTING ONE-TIME BATTLE DEPLOYMENT & IMAGE ASSETS ===\n');
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

  // 1. Character Database Image Verification
  console.log('[Test 1] Character Artwork & Image Links:');
  assert(MARVEL_CHARACTERS.length === 52, `Total characters in roster: 52 (Actual: ${MARVEL_CHARACTERS.length})`);
  const missingImages = MARVEL_CHARACTERS.filter(c => !c.imageUrl || !c.artwork);
  assert(missingImages.length === 0, `All characters have valid imageUrl and artwork (Missing: ${missingImages.length})`);

  // 2. RoomManager One-Time Battle Deployment Rule
  console.log('\n[Test 2] One-Time Battle Deployment Enforcement:');

  const broadcasts: { event: string; payload: any }[] = [];
  const roomManager = new RoomManager({
    broadcastToRoom: (roomCode, event, payload) => {
      broadcasts.push({ event, payload });
    },
    sendToPlayer: () => {}
  });

  // Create room with 2 players, 2 characters each
  const thor = getCharacterById('thor')!;
  const ironMan = getCharacterById('iron-man')!;
  const thanos = getCharacterById('thanos')!;
  const wanda = getCharacterById('wanda')!;

  const createRes = roomManager.createRoom('HostPlayer', {
    maxPlayers: 2,
    charactersPerPlayer: 2,
    startingCoins: 1500,
    bidIncrement: 50,
    allowDuplicates: false,
    auctionTimerSeconds: 10,
    battleFormat: 'RoundRobin'
  }, 'socket-p1');

  assert(Boolean(createRes.room), 'Host created room');
  const room = (roomManager as any).rooms.get(createRes.room.roomCode) as RoomState;
  assert(Boolean(room), 'Room retrieved');

  // Add second player
  const joinRes = roomManager.joinRoom(room.roomCode, 'OpponentPlayer', 'socket-p2');
  assert(joinRes.success, 'Opponent joined room');

  // Assign 2 characters to each player
  room.players[0].characters = [thor, ironMan];
  room.players[0].usedCharacterIds = [];
  room.players[1].characters = [thanos, wanda];
  room.players[1].usedCharacterIds = [];

  // Directly initiate Battle Phase
  room.phase = 'BATTLE';
  (roomManager as any).startFighterSelectionRound(room, 1);
  assert(room.battleRound?.roundIndex === 1, 'Bout #1 Fighter Selection started');

  // P1 locks in Thor
  const p1Lock = roomManager.lockFighter('socket-p1', 'thor');
  assert(p1Lock.success, 'Player 1 successfully locked in Thor for Bout #1');

  // P2 locks in Thanos
  const p2Lock = roomManager.lockFighter('socket-p2', 'thanos');
  assert(p2Lock.success, 'Player 2 successfully locked in Thanos for Bout #1');

  // Trigger reveal so bouts are generated
  (roomManager as any).revealFightersAndLaunchBouts(room);

  // Complete Bout #1 via nextBout
  assert(room.battleRound?.bouts.length === 1, '1v1 bout created for Thor vs Thanos');
  const nextBoutRes = roomManager.nextBout('socket-p1');
  assert(nextBoutRes.success, 'Bout #1 completed');

  // Verify BOTH combatants are retired to usedCharacterIds
  assert(
    room.players[0].usedCharacterIds?.includes('thor') === true,
    'Player 1 character "thor" is added to usedCharacterIds'
  );
  assert(
    room.players[1].usedCharacterIds?.includes('thanos') === true,
    'Player 2 character "thanos" is added to usedCharacterIds'
  );

  // Advance to Bout #2 selection round
  assert(room.battleRound?.roundIndex === 2, 'Advanced to Bout #2 Selection Round');

  // Attempt to deploy Thor AGAIN in Bout #2 (MUST BE REJECTED!)
  const p1ReplayThor = roomManager.lockFighter('socket-p1', 'thor');
  assert(
    !p1ReplayThor.success,
    'Player 1 is REJECTED from reusing Thor: ' + p1ReplayThor.error
  );

  // Attempt to deploy Thanos AGAIN in Bout #2 (MUST BE REJECTED!)
  const p2ReplayThanos = roomManager.lockFighter('socket-p2', 'thanos');
  assert(
    !p2ReplayThanos.success,
    'Player 2 is REJECTED from reusing Thanos: ' + p2ReplayThanos.error
  );

  // Deploying remaining fresh heroes (Iron Man and Wanda) MUST SUCCEED
  const p1IronMan = roomManager.lockFighter('socket-p1', 'iron-man');
  assert(p1IronMan.success, 'Player 1 successfully locks in fresh hero Iron Man for Bout #2');

  const p2Wanda = roomManager.lockFighter('socket-p2', 'wanda');
  assert(p2Wanda.success, 'Player 2 successfully locks in fresh hero Wanda for Bout #2');

  // Trigger reveal for round 2
  (roomManager as any).revealFightersAndLaunchBouts(room);

  // Complete Bout #2
  const bout2Res = roomManager.nextBout('socket-p1');
  assert(bout2Res.success, 'Bout #2 completed');

  // Verify tournament finishes and crowns champion because all heroes have fought!
  const currentPhase: string = room.phase;
  assert(
    currentPhase === 'RESULTS',
    'Game transitions to RESULTS after all heroes have completed their single deployment!'
  );
  assert(
    Boolean(room.tournament?.championName),
    `Grand Champion crowned: ${room.tournament?.championName}`
  );

  console.log(`\n=== SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
  if (failed > 0) process.exit(1);
}

runOnetimeDeploymentTests();
