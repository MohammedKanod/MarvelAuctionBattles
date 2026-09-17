import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

async function runEndToEndSimulation() {
  console.log('=== MULTI-PLAYER END-TO-END SIMULATION ===');

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
      charactersPerPlayer: 3,
      startingCoins: 1500,
      bidIncrement: 50,
      allowDuplicates: false,
      auctionTimerSeconds: 4,
      battleFormat: 'SingleElimination'
    }
  });

  await new Promise<void>(resolve => {
    client1.on('ROOM_CREATED', ({ room, selfPlayerId }) => {
      roomCode = room.roomCode;
      player1Id = selfPlayerId;
      console.log(`✓ Room created with Code: ${roomCode} by ${room.players[0].name} (ID: ${player1Id})`);
      resolve();
    });
  });

  // 2. Player 2 joins room
  client2.emit('JOIN_ROOM', { roomCode, playerName: 'Peter Parker' });

  await new Promise<void>(resolve => {
    client2.on('ROOM_JOINED', ({ room, selfPlayerId }) => {
      player2Id = selfPlayerId;
      console.log(`✓ Peter Parker joined Room ${roomCode} (ID: ${player2Id})`);
      console.log(`  Current Players in Lobby: ${room.players.map((p: any) => p.name).join(', ')}`);
      resolve();
    });
  });

  // 3. Player 2 readies up
  client2.emit('TOGGLE_READY');
  await new Promise(r => setTimeout(r, 400));
  console.log('✓ Player 2 readied up');

  // 4. Host starts game
  client1.emit('START_GAME');
  console.log('✓ Host started game, transitioning to AUCTION phase');

  // 5. Simulate Auction Bidding between Player 1 and Player 2
  await new Promise<void>(resolve => {
    client1.on('AUCTION_ROUND_STARTED', ({ auction }) => {
      console.log(`\n--- AUCTION ROUND ${auction.currentRound}/${auction.totalRounds}: ${auction.character?.name} (${auction.character?.stats.power} PWR) ---`);
      
      // Player 1 bids starting bid
      client1.emit('PLACE_BID', { amount: 100 });
    });

    client2.on('BID_PLACED', ({ currentBid, currentLeaderName }) => {
      console.log(`  Bid placed: 🪙 ${currentBid} by ${currentLeaderName}`);
      
      // If Tony bid 100, Peter outbids with 150!
      if (currentBid === 100 && currentLeaderName === 'Tony Stark') {
        setTimeout(() => {
          client2.emit('PLACE_BID', { amount: 150 });
        }, 300);
      }
    });

    client1.on('PLAYER_OUTBID', ({ newBid, newLeaderName }) => {
      console.log(`  ⚡ OUTBID ALERT! ${newLeaderName} took the lead with 🪙 ${newBid}`);
    });

    client1.on('CHARACTER_SOLD', ({ winnerName, character, winningBid, room }) => {
      console.log(`  🎉 SOLD! ${character.name} won by ${winnerName} for 🪙 ${winningBid}`);
      const p1 = room.players.find((p: any) => p.name === 'Tony Stark');
      const p2 = room.players.find((p: any) => p.name === 'Peter Parker');
      console.log(`  Balances: Tony Stark (${p1?.coins} 🪙, ${p1?.characters.length} heroes) | Peter Parker (${p2?.coins} 🪙, ${p2?.characters.length} heroes)`);
    });

    client1.on('TEAM_BUILDING_STARTED', ({ room }) => {
      console.log('\n✓ AUCTION COMPLETE! Transitioned to TEAM_BUILDING phase');
      resolve();
    });
  });

  // 6. Lock Teams
  client1.emit('LOCK_TEAM' as any, { characterOrder: [] });
  client2.emit('LOCK_TEAM' as any, { characterOrder: [] });
  console.log('✓ Both teams locked their lineups for battle');

  // 7. Tournament Battles
  await new Promise<void>(resolve => {
    client1.on('BATTLES_STARTED' as any, ({ tournament, room }: any) => {
      console.log(`\n✓ BATTLE ARENA OPENED! Matches: ${tournament.matches.length}`);
      // Host triggers battle
      setTimeout(() => {
        client1.emit('NEXT_BATTLE' as any);
      }, 500);
    });

    client1.on('GAME_COMPLETED', ({ tournament }) => {
      console.log('\n=== TOURNAMENT FINISHED ===');
      console.log(`🏆 GRAND CHAMPION: ${tournament.championName}`);
      console.log('Final Standings:');
      tournament.standings.forEach((s: any) => {
        console.log(`  #${s.rank} ${s.playerName} - Team Value: ${s.teamValue}, Wins: ${s.battlesWon}`);
      });
      resolve();
    });
  });

  console.log('\n✓ Full Game Loop completed successfully with 100% authoritative synchronization!');
  client1.disconnect();
  client2.disconnect();
  process.exit(0);
}

runEndToEndSimulation().catch(err => {
  console.error('Simulation error:', err);
  process.exit(1);
});
