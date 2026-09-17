import { Player, TournamentState, TournamentMatch, TeamBattleResult } from '../../../shared/types';
import { BattleEngine } from '../battle/BattleEngine';

export class TournamentEngine {
  /**
   * Generates a tournament bracket tailored to the number of players (2 to 6).
   */
  public static createTournament(players: Player[]): TournamentState {
    const activePlayers = [...players];
    const matches: TournamentMatch[] = [];

    if (activePlayers.length === 2) {
      matches.push({
        matchId: 'match-final',
        roundNumber: 1,
        roundName: 'CHAMPIONSHIP FINAL',
        player1Id: activePlayers[0].id,
        player1Name: activePlayers[0].name,
        player2Id: activePlayers[1].id,
        player2Name: activePlayers[1].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
    } else if (activePlayers.length === 3) {
      // 3 players: P2 vs P3 in Semifinal, winner vs P1 in Final
      matches.push({
        matchId: 'match-sf-1',
        roundNumber: 1,
        roundName: 'SEMIFINAL ELIMINATOR',
        player1Id: activePlayers[1].id,
        player1Name: activePlayers[1].name,
        player2Id: activePlayers[2].id,
        player2Name: activePlayers[2].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-final',
        roundNumber: 2,
        roundName: 'CHAMPIONSHIP FINAL',
        player1Id: activePlayers[0].id,
        player1Name: activePlayers[0].name,
        player2Id: null, // Winner of SF
        player2Name: 'Winner of Semifinal',
        winnerId: null,
        winnerName: null,
        completed: false
      });
    } else if (activePlayers.length === 4) {
      // 4 players: Semifinal 1, Semifinal 2, Championship Final
      matches.push({
        matchId: 'match-sf-1',
        roundNumber: 1,
        roundName: 'SEMIFINAL 1',
        player1Id: activePlayers[0].id,
        player1Name: activePlayers[0].name,
        player2Id: activePlayers[1].id,
        player2Name: activePlayers[1].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-sf-2',
        roundNumber: 1,
        roundName: 'SEMIFINAL 2',
        player1Id: activePlayers[2].id,
        player1Name: activePlayers[2].name,
        player2Id: activePlayers[3].id,
        player2Name: activePlayers[3].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-final',
        roundNumber: 2,
        roundName: 'CHAMPIONSHIP FINAL',
        player1Id: null,
        player1Name: 'Winner SF 1',
        player2Id: null,
        player2Name: 'Winner SF 2',
        winnerId: null,
        winnerName: null,
        completed: false
      });
    } else if (activePlayers.length === 5) {
      // 5 players: Prelim (P4 vs P5), Semifinal 1 (P1 vs Winner Prelim), Semifinal 2 (P2 vs P3), Final
      matches.push({
        matchId: 'match-prelim',
        roundNumber: 1,
        roundName: 'PRELIMINARY BOUT',
        player1Id: activePlayers[3].id,
        player1Name: activePlayers[3].name,
        player2Id: activePlayers[4].id,
        player2Name: activePlayers[4].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-sf-1',
        roundNumber: 2,
        roundName: 'SEMIFINAL 1',
        player1Id: activePlayers[0].id,
        player1Name: activePlayers[0].name,
        player2Id: null,
        player2Name: 'Winner Prelim',
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-sf-2',
        roundNumber: 2,
        roundName: 'SEMIFINAL 2',
        player1Id: activePlayers[1].id,
        player1Name: activePlayers[1].name,
        player2Id: activePlayers[2].id,
        player2Name: activePlayers[2].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-final',
        roundNumber: 3,
        roundName: 'CHAMPIONSHIP FINAL',
        player1Id: null,
        player1Name: 'Winner SF 1',
        player2Id: null,
        player2Name: 'Winner SF 2',
        winnerId: null,
        winnerName: null,
        completed: false
      });
    } else {
      // 6 players: QF1 (P3 vs P6), QF2 (P4 vs P5), SF1 (P1 vs Winner QF1), SF2 (P2 vs Winner QF2), Final
      matches.push({
        matchId: 'match-qf-1',
        roundNumber: 1,
        roundName: 'QUARTERFINAL 1',
        player1Id: activePlayers[2].id,
        player1Name: activePlayers[2].name,
        player2Id: activePlayers[5].id,
        player2Name: activePlayers[5].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-qf-2',
        roundNumber: 1,
        roundName: 'QUARTERFINAL 2',
        player1Id: activePlayers[3].id,
        player1Name: activePlayers[3].name,
        player2Id: activePlayers[4].id,
        player2Name: activePlayers[4].name,
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-sf-1',
        roundNumber: 2,
        roundName: 'SEMIFINAL 1',
        player1Id: activePlayers[0].id,
        player1Name: activePlayers[0].name,
        player2Id: null,
        player2Name: 'Winner QF 1',
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-sf-2',
        roundNumber: 2,
        roundName: 'SEMIFINAL 2',
        player1Id: activePlayers[1].id,
        player1Name: activePlayers[1].name,
        player2Id: null,
        player2Name: 'Winner QF 2',
        winnerId: null,
        winnerName: null,
        completed: false
      });
      matches.push({
        matchId: 'match-final',
        roundNumber: 3,
        roundName: 'CHAMPIONSHIP FINAL',
        player1Id: null,
        player1Name: 'Winner SF 1',
        player2Id: null,
        player2Name: 'Winner SF 2',
        winnerId: null,
        winnerName: null,
        completed: false
      });
    }

    return {
      matches,
      currentMatchIndex: 0,
      championId: null,
      championName: null,
      standings: []
    };
  }

  /**
   * Executes and records the result of the current match in the tournament.
   */
  public static playCurrentMatch(tournament: TournamentState, players: Player[]): {
    updatedTournament: TournamentState;
    battleResult: TeamBattleResult | null;
    isFinished: boolean;
  } {
    const match = tournament.matches[tournament.currentMatchIndex];
    if (!match || match.completed || !match.player1Id || !match.player2Id) {
      return { updatedTournament: tournament, battleResult: null, isFinished: false };
    }

    const p1 = players.find(p => p.id === match.player1Id);
    const p2 = players.find(p => p.id === match.player2Id);

    if (!p1 || !p2) {
      return { updatedTournament: tournament, battleResult: null, isFinished: false };
    }

    // Execute battle
    const battleResult = BattleEngine.resolveTeamBattle(
      match.matchId,
      p1.id,
      p1.name,
      p1.characters,
      p2.id,
      p2.name,
      p2.characters
    );

    match.teamBattleResult = battleResult;
    match.winnerId = battleResult.winnerPlayerId;
    match.winnerName = battleResult.winnerPlayerName;
    match.completed = true;

    // Increment winner's win count
    const winningPlayer = players.find(p => p.id === battleResult.winnerPlayerId);
    if (winningPlayer) {
      winningPlayer.wins = (winningPlayer.wins || 0) + 1;
    }

    // Advance winner in bracket
    TournamentEngine.advanceWinner(tournament, match);

    // Check if tournament has reached completion
    const isLastMatch = tournament.currentMatchIndex === tournament.matches.length - 1;
    let isFinished = false;

    if (isLastMatch && match.winnerId) {
      tournament.championId = match.winnerId;
      tournament.championName = match.winnerName;
      tournament.standings = TournamentEngine.calculateFinalStandings(players, match.winnerId);
      isFinished = true;
    } else {
      tournament.currentMatchIndex++;
    }

    return {
      updatedTournament: tournament,
      battleResult,
      isFinished
    };
  }

  private static advanceWinner(tournament: TournamentState, completedMatch: TournamentMatch) {
    const matches = tournament.matches;
    const matchId = completedMatch.matchId;
    const winnerId = completedMatch.winnerId;
    const winnerName = completedMatch.winnerName;

    if (!winnerId || !winnerName) return;

    if (matchId === 'match-sf-1') {
      const finalMatch = matches.find(m => m.matchId === 'match-final');
      if (finalMatch) {
        finalMatch.player1Id = winnerId;
        finalMatch.player1Name = winnerName;
      }
    } else if (matchId === 'match-sf-2') {
      const finalMatch = matches.find(m => m.matchId === 'match-final');
      if (finalMatch) {
        finalMatch.player2Id = winnerId;
        finalMatch.player2Name = winnerName;
      }
    } else if (matchId === 'match-prelim') {
      const sf1 = matches.find(m => m.matchId === 'match-sf-1');
      if (sf1) {
        sf1.player2Id = winnerId;
        sf1.player2Name = winnerName;
      }
    } else if (matchId === 'match-qf-1') {
      const sf1 = matches.find(m => m.matchId === 'match-sf-1');
      if (sf1) {
        sf1.player2Id = winnerId;
        sf1.player2Name = winnerName;
      }
    } else if (matchId === 'match-qf-2') {
      const sf2 = matches.find(m => m.matchId === 'match-sf-2');
      if (sf2) {
        sf2.player2Id = winnerId;
        sf2.player2Name = winnerName;
      }
    }
  }

  public static calculateFinalStandings(players: Player[], championId: string) {
    const sorted = [...players].sort((a, b) => {
      if (a.id === championId) return -1;
      if (b.id === championId) return 1;
      if (b.wins !== a.wins) return b.wins - a.wins;
      const powerA = a.characters.reduce((s, c) => s + c.stats.power, 0);
      const powerB = b.characters.reduce((s, c) => s + c.stats.power, 0);
      return powerB - powerA;
    });

    return sorted.map((p, idx) => {
      const teamValue = p.characters.reduce((sum, c) => sum + c.stats.power, 0);
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
  }
}
