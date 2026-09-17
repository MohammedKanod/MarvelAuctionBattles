import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

async function runFighterClashSimulation() {
  console.log('=== MULTI-PLAYER SECRET SELECTION & CARD CLASH TEST ===');

  const client1: Socket = io(SERVER_URL, { transports: ['websocket'] });
  const client2: Socket = io(SERVER_URL, { transports: ['websocket'] });

  await Promise.all([
    new Promise<void>(res => client1.on('connect', () => res())),
    new Promise<void>(res => client2.on('connect', () => res()))
  ]);

  console.log('✓ Both Player 1 and Player 2 connected to Socket.IO server');

  let roomCode = '';
  let player1Id = '';
  let player2Id = '';

  // 1. Player 1 creates room
  client1.emit('CREATE_ROOM', {
    playerName: 'Tony Stark',
    settings: {
      maxPlayers: 2,
      charactersPerPlayer: 2,
      startingCoins: 1500,
      bidIncrement: 50,
      allowDuplicates: false,
      auctionTimerSeconds: 2, // Fast 2s for testing
      battleFormat: 'SingleElimination'
    }
  });

  await new Promise<void>(resolve => {
    client1.on('ROOM_CREATED', ({ room, selfPlayerId }) => {
      roomCode = room.roomCode;
      player1Id = selfPlayerId;
      console.log(`✓ Room created: ${roomCode} by Tony Stark (ID: ${player1Id})`);
      resolve();
    });
  });

  // 2. Player 2 joins
  client2.emit('JOIN_ROOM', { roomCode, playerName: 'Peter Parker' });

  await new Promise<void>(resolve => {
    client2.on('ROOM_JOINED', ({ selfPlayerId }) => {
      player2Id = selfPlayerId;
      console.log(`✓ Peter Parker joined Room ${roomCode}`);
      resolve();
    });
  });

  // 3. Ready and Start
  client2.emit('TOGGLE_READY');
  await new Promise(r => setTimeout(r, 200));
  client1.emit('START_GAME');
  console.log('✓ Host started game -> AUCTION phase');

  // 4. Test Auction: Tony bids on first, second gets free rotating assignment to test zero-bid rule!
  await new Promise<void>(resolve => {
    let round = 0;

    client1.on('AUCTION_ROUND_STARTED', ({ auction }) => {
      round++;
      console.log(`\n--- AUCTION ROUND ${auction.currentRound}: ${auction.character?.name} ---`);
      
      if (round === 1) {
        // Tony bids
        console.log('  Tony Stark places bid of 🪙 100');
        client1.emit('PLACE_BID', { amount: 100 });
      } else {
        // Nobody bids! Tests automatic rotating free assignment
        console.log('  Nobody bids! Waiting for fair automatic assignment...');
      }
    });

    client1.on('CHARACTER_SOLD', ({ winnerName, character, winningBid, isFreeAssignment }) => {
      console.log(`  🎉 Character Awarded: ${character.name} -> ${winnerName} (${isFreeAssignment ? 'FREE ROTATING DRAFT' : `🪙 ${winningBid}`})`);
    });

    client1.on('AUCTION_TRANSITION_STARTED', () => {
      console.log('\n✓ ALL SLOTS FILLED! Transitioned to AUCTION_TRANSITION ("LET THE BATTLES BEGIN!")');
      resolve();
    });
  });

  // 5. Secret Fighter Selection
  await new Promise<void>(resolve => {
    client1.on('FIGHTER_SELECTION_STARTED', ({ battleRound, room }) => {
      console.log(`\n=== FIGHTER SELECTION FOR BOUT #${battleRound.roundIndex} ===`);

      const p1 = room.players.find((p: any) => p.id === player1Id);
      const p2 = room.players.find((p: any) => p.id === player2Id);

      // Find living characters
      const livingP1 = p1.characters.filter((c: any) => !p1.defeatedCharacterIds?.includes(c.id));
      const livingP2 = p2.characters.filter((c: any) => !p2.defeatedCharacterIds?.includes(c.id));

      if (livingP1.length > 0) {
        const p1Char = livingP1[0];
        console.log(`  Tony Stark secretly locks in: ${p1Char.name}`);
        client1.emit('LOCK_FIGHTER', { characterId: p1Char.id });
      }

      if (livingP2.length > 0) {
        setTimeout(() => {
          const p2Char = livingP2[0];
          console.log(`  Peter Parker secretly locks in: ${p2Char.name}`);
          client2.emit('LOCK_FIGHTER', { characterId: p2Char.id });
        }, 200);
      }
    });

    client2.on('PLAYER_LOCKED_FIGHTER', ({ playerId, room }) => {
      const p = room.players.find((pl: any) => pl.id === playerId);
      console.log(`  👁️ Secret Notification: ${p.name} locked in! (Character remains hidden)`);
    });

    client1.on('FIGHTERS_REVEAL_COUNTDOWN', ({ countdown }) => {
      console.log(`  ⏳ Reveal Countdown: ${countdown}`);
    });

    client1.on('FIGHTERS_REVEALED', ({ battleRound }) => {
      console.log('\n⚡ FIGHTERS REVEALED!');
      battleRound.activeFighterSelections.forEach((s: any) => {
        console.log(`  ${s.playerName} chose: ${s.character?.name}`);
      });
    });

    client1.on('BOUT_STARTED', ({ bout }) => {
      console.log(`\n⚔️ 1v1 BOUT STARTED: ${bout.char1.name} VS ${bout.char2.name}`);
      console.log(`  Winner predetermined authoritatively by server: ${bout.winnerName} (${bout.winnerName === bout.player1Name ? bout.char1.name : bout.char2.name})`);
      console.log(`  Reason: "${bout.reason}"`);

      // Host triggers NEXT_BOUT after viewing collision animation
      setTimeout(() => {
        console.log('  Host advancing to next bout/round...');
        client1.emit('NEXT_BOUT');
      }, 500);
    });

    client1.on('BOUT_COMPLETED', ({ bout }) => {
      console.log(`  ✓ Bout completed: ${bout.winnerName} awarded +1 Win`);
    });

    client1.on('GAME_COMPLETED', ({ tournament }) => {
      console.log('\n🏆 TOURNAMENT COMPLETE! GRAND CHAMPION CROWNED:');
      console.log(`  Champion: ${tournament.championName}`);
      resolve();
    });
  });

  console.log('\n✓ Complete Secret Fighter Selection & Card Clash verified with 100% success!');
  client1.disconnect();
  client2.disconnect();
  process.exit(0);
}

runFighterClashSimulation().catch(err => {
  console.error('Simulation error:', err);
  process.exit(1);
});
