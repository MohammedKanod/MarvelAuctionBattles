import { MARVEL_CHARACTERS, getCharacterById } from '../data/characters';
import { BattleEngine } from '../battle/BattleEngine';
import { TournamentEngine } from '../tournament/TournamentEngine';
import { Player } from '../../../shared/types';

function runTests() {
  console.log('=== STARTING AUTOMATED TEST SUITE ===');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. Character Database Test
  console.log('\n[Test 1] Character Database Integrity:');
  assert(MARVEL_CHARACTERS.length >= 50, `Contains >= 50 characters (Actual: ${MARVEL_CHARACTERS.length})`);
  const missingStats = MARVEL_CHARACTERS.filter(c => 
    !c.stats.power || !c.stats.strength || !c.stats.speed || 
    !c.stats.durability || !c.stats.combat || !c.stats.range || !c.stats.intelligence
  );
  assert(missingStats.length === 0, 'All characters possess full 7 combat stats');

  // 2. Battle Engine Matchup Tests
  console.log('\n[Test 2] Deterministic Battle Engine:');
  const magneto = getCharacterById('magneto')!;
  const ironMan = getCharacterById('iron-man')!;
  assert(Boolean(magneto && ironMan), 'Magneto and Iron Man exist in database');

  const magVsIron = BattleEngine.evaluateMatchup(magneto, ironMan);
  assert(magVsIron.winnerChar.id === 'magneto', 'Magneto decisively defeats Iron Man due to electromagnetic counter');
  assert(magVsIron.decisiveAdvantage.includes('Electromagnetic'), `Matchup cites electromagnetic advantage: "${magVsIron.decisiveAdvantage}"`);

  const thor = getCharacterById('thor')!;
  const daredevil = getCharacterById('daredevil')!;
  const thorVsDd = BattleEngine.evaluateMatchup(thor, daredevil);
  assert(thorVsDd.winnerChar.id === 'thor', 'Thor overcomes Daredevil on raw cosmic durability and lightning range');

  // 3. Team Battle & Tiebreaker Test
  console.log('\n[Test 3] Team Battle & Tiebreaker:');
  const teamA = [thor, ironMan];
  const teamB = [magneto, daredevil];
  const teamMatch = BattleEngine.resolveTeamBattle('test-match', 'p1', 'Player 1', teamA, 'p2', 'Player 2', teamB);
  assert(teamMatch.individualFights.length === 2, 'Evaluated all 2 individual bouts');
  assert(Boolean(teamMatch.winnerPlayerId), `Team winner determined: ${teamMatch.winnerPlayerName}`);

  // 4. Tournament Bracket Generation Test (2 to 6 players)
  console.log('\n[Test 4] Tournament Bracket Structure:');
  const dummyPlayers: Player[] = [
    { id: 'p1', sessionId: 's1', name: 'P1', isHost: true, isReady: true, connected: true, coins: 1500, characters: [thor], wins: 0, eliminated: false, avatarSeed: 1 },
    { id: 'p2', sessionId: 's2', name: 'P2', isHost: false, isReady: true, connected: true, coins: 1500, characters: [ironMan], wins: 0, eliminated: false, avatarSeed: 2 },
    { id: 'p3', sessionId: 's3', name: 'P3', isHost: false, isReady: true, connected: true, coins: 1500, characters: [magneto], wins: 0, eliminated: false, avatarSeed: 3 },
    { id: 'p4', sessionId: 's4', name: 'P4', isHost: false, isReady: true, connected: true, coins: 1500, characters: [daredevil], wins: 0, eliminated: false, avatarSeed: 4 },
  ];

  const tourney2 = TournamentEngine.createTournament(dummyPlayers.slice(0, 2));
  assert(tourney2.matches.length === 1, '2-player bracket produces 1 Championship Final');

  const tourney4 = TournamentEngine.createTournament(dummyPlayers);
  assert(tourney4.matches.length === 3, '4-player bracket produces 2 Semifinals + 1 Final (3 matches total)');

  console.log(`\n=== TEST RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  if (failed > 0) process.exit(1);
}

runTests();
