import { MARVEL_CHARACTERS, DC_CHARACTERS, ALL_CHARACTERS, getCharacterById } from '../data/characters';
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
  assert(MARVEL_CHARACTERS.length === 102, `Total Marvel characters in roster: 102 (Actual: ${MARVEL_CHARACTERS.length})`);
  assert(DC_CHARACTERS.length === 98, `Total DC characters in roster: 98 (Actual: ${DC_CHARACTERS.length})`);
  assert(ALL_CHARACTERS.length === 200, `Total combined multiverse characters: 200 (Actual: ${ALL_CHARACTERS.length})`);
  
  const uniqueIds = new Set(ALL_CHARACTERS.map(c => c.id));
  assert(uniqueIds.size === 200, `All 200 characters have unique IDs (Unique: ${uniqueIds.size})`);

  const missingImages = ALL_CHARACTERS.filter(c => !c.imageUrl || !c.artwork);
  assert(missingImages.length === 0, `All 200 characters have valid imageUrl and artwork (Missing: ${missingImages.length})`);

  // Verify all 200 image files exist on disk
  const fs = require('fs');
  const path = require('path');
  const clientDir = path.resolve(__dirname, '../../../client/public/characters');
  let missingFiles = 0;
  for (const c of ALL_CHARACTERS) {
    const file = path.join(clientDir, `${c.id}.jpg`);
    if (!fs.existsSync(file) || fs.statSync(file).size < 5000) {
      missingFiles++;
    }
  }
  assert(missingFiles === 0, `All 200 characters have verified JPG image files (>5KB) on disk`);

  // Verify specific image accuracy (no duplicate copies)
  const ikarisSize = fs.statSync(path.join(clientDir, 'ikaris.jpg')).size;
  const helaSize = fs.statSync(path.join(clientDir, 'hela.jpg')).size;
  assert(ikarisSize !== helaSize, `Ikaris has his own authentic photo, not Hela copy (${ikarisSize} vs ${helaSize} bytes)`);

  const ebonySize = fs.statSync(path.join(clientDir, 'ebony-maw.jpg')).size;
  const thanosSize = fs.statSync(path.join(clientDir, 'thanos.jpg')).size;
  assert(ebonySize !== thanosSize, `Ebony Maw has his own authentic photo, not Thanos copy (${ebonySize} vs ${thanosSize} bytes)`);

  const redGuardianSize = fs.statSync(path.join(clientDir, 'red-guardian.jpg')).size;
  const capSize = fs.statSync(path.join(clientDir, 'captain-america.jpg')).size;
  assert(redGuardianSize !== capSize, `Red Guardian has his own authentic photo, not Cap copy (${redGuardianSize} vs ${capSize} bytes)`);

  const agathaSize = fs.statSync(path.join(clientDir, 'agatha-harkness.jpg')).size;
  const wandaSize = fs.statSync(path.join(clientDir, 'wanda.jpg')).size;
  assert(agathaSize !== wandaSize, `Agatha Harkness has her own authentic photo, not Wanda copy (${agathaSize} vs ${wandaSize} bytes)`);

  const whiteVisionSize = fs.statSync(path.join(clientDir, 'white-vision.jpg')).size;
  const visionSize = fs.statSync(path.join(clientDir, 'vision.jpg')).size;
  assert(whiteVisionSize !== visionSize, `White Vision has his own authentic photo, not Vision copy (${whiteVisionSize} vs ${visionSize} bytes)`);

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
