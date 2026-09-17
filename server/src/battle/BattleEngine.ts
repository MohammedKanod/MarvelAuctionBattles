import { Character, BattleMatchup, TeamBattleResult } from '../../../shared/types';

export interface CombatEvaluation {
  winnerChar: Character;
  loserChar: Character;
  score1: number;
  score2: number;
  reason: string;
  decisiveAdvantage: string;
  keyFactors: string[];
  battleSummary: string;
}

export class BattleEngine {
  /**
   * Deterministically resolves a 1v1 matchup between char1 and char2.
   * Takes into account composite stats, role matchups, range vs melee counters,
   * speed blitz advantages, tactical intelligence prep, and unique counters.
   */
  public static evaluateMatchup(char1: Character, char2: Character, roundIndex = 1): CombatEvaluation {
    const s1 = char1.stats;
    const s2 = char2.stats;

    // 1. Base Combat Score Calculation (Weighted)
    // Strength (20%), Durability (20%), Combat Skill (25%), Speed (15%), Range (10%), Intelligence (10%)
    let score1 = (s1.strength * 0.20) + 
                 (s1.durability * 0.20) + 
                 (s1.combat * 0.25) + 
                 (s1.speed * 0.15) + 
                 (s1.range * 0.10) + 
                 (s1.intelligence * 0.10);

    let score2 = (s2.strength * 0.20) + 
                 (s2.durability * 0.20) + 
                 (s2.combat * 0.25) + 
                 (s2.speed * 0.15) + 
                 (s2.range * 0.10) + 
                 (s2.intelligence * 0.10);

    const keyFactors: string[] = [];
    let decisiveAdvantage = '';

    // 2. Tactical Archetype & Role Matchups
    // Speedster vs Blaster: Speedster can close distance before big charge-up attacks
    if (char1.role === 'Speedster' && char2.role === 'Blaster' && s1.speed > s2.speed + 10) {
      score1 += 7;
      keyFactors.push(`${char1.name}'s extreme velocity bypassed ${char2.name}'s targeting matrix.`);
    } else if (char2.role === 'Speedster' && char1.role === 'Blaster' && s2.speed > s1.speed + 10) {
      score2 += 7;
      keyFactors.push(`${char2.name}'s supersonic mobility evaded ${char1.name}'s ranged bombardment.`);
    }

    // Sorcerer vs Physical Tank: Magic bypasses pure physical durability
    if (char1.role === 'Sorcerer' && char2.role === 'Tank' && s1.range >= 85) {
      score1 += 8;
      keyFactors.push(`${char1.name}'s dimensional magic ignored ${char2.name}'s brute armor.`);
    } else if (char2.role === 'Sorcerer' && char1.role === 'Tank' && s2.range >= 85) {
      score2 += 8;
      keyFactors.push(`${char2.name}'s arcane spells dismantled ${char1.name}'s physical defenses.`);
    }

    // Tactician vs High Raw Power: Intelligence & counter-strategy bonus
    if (char1.role === 'Tactician' && s1.intelligence >= 90 && s2.intelligence < 80) {
      score1 += 6;
      keyFactors.push(`${char1.name}'s tactical brilliance exploited structural flaws in ${char2.name}'s stance.`);
    } else if (char2.role === 'Tactician' && s2.intelligence >= 90 && s1.intelligence < 80) {
      score2 += 6;
      keyFactors.push(`${char2.name}'s field strategy outmaneuvered ${char1.name}'s predictable combat patterns.`);
    }

    // Range Kiting Advantage (Range difference > 25 while speed is comparable)
    if (s1.range > s2.range + 25 && s1.speed >= s2.speed - 5) {
      score1 += 5;
      keyFactors.push(`${char1.name} dominated distance control, bombarding ${char2.name} from outside striking range.`);
    } else if (s2.range > s1.range + 25 && s2.speed >= s1.speed - 5) {
      score2 += 5;
      keyFactors.push(`${char2.name} maintained distance dominance, punishing ${char1.name} with sustained artillery.`);
    }

    // Specific Iconic Counters
    // Magneto vs Metal Armor / Weaponry
    if (char1.id === 'magneto' && ['iron-man', 'wolverine', 'colossus', 'war-machine', 'ultron'].includes(char2.id)) {
      score1 += 18;
      keyFactors.push(`Magneto completely controlled ${char2.name}'s metallic biology/armor.`);
      decisiveAdvantage = 'Electromagnetic Dominance';
    } else if (char2.id === 'magneto' && ['iron-man', 'wolverine', 'colossus', 'war-machine', 'ultron'].includes(char1.id)) {
      score2 += 18;
      keyFactors.push(`Magneto crumpled ${char1.name}'s metallic components with a thought.`);
      decisiveAdvantage = 'Electromagnetic Dominance';
    }

    // Sonic / Fire counters against Symbiotes
    if (char2.id === 'venom' && (char1.id === 'electro' || char1.id === 'ghost-rider' || char1.specialAbilities.some((a: string) => a.toLowerCase().includes('fire') || a.toLowerCase().includes('lightning')))) {
      score1 += 10;
      keyFactors.push(`${char1.name}'s elemental energy destabilized the Venom symbiote bond.`);
    } else if (char1.id === 'venom' && (char2.id === 'electro' || char2.id === 'ghost-rider' || char2.specialAbilities.some((a: string) => a.toLowerCase().includes('fire') || a.toLowerCase().includes('lightning')))) {
      score2 += 10;
      keyFactors.push(`${char2.name}'s thermal/electrical attacks melted through the Venom symbiote.`);
    }

    // Healing factor stamina war of attrition (Wolverine / Deadpool / Hulk)
    if (s1.durability >= 95 && char1.specialAbilities.some((a: string) => a.toLowerCase().includes('healing') || a.toLowerCase().includes('regeneration'))) {
      if (s2.durability < 85) {
        score1 += 6;
        keyFactors.push(`${char1.name} absorbed lethal punishment and outlasted ${char2.name} in an attrition war.`);
      }
    } else if (s2.durability >= 95 && char2.specialAbilities.some((a: string) => a.toLowerCase().includes('healing') || a.toLowerCase().includes('regeneration'))) {
      if (s1.durability < 85) {
        score2 += 6;
        keyFactors.push(`${char2.name}'s hyper-healing factor negated ${char1.name}'s offensive momentum.`);
      }
    }

    // Deterministic tie-breaker based on ID hash if score is exact tie
    if (Math.abs(score1 - score2) < 0.01) {
      if (char1.id < char2.id) {
        score1 += 0.5;
      } else {
        score2 += 0.5;
      }
    }

    const winnerChar = score1 >= score2 ? char1 : char2;
    const loserChar = score1 >= score2 ? char2 : char1;
    const winningScore = Math.max(score1, score2);
    const losingScore = Math.min(score1, score2);
    const winnerStats = winnerChar.stats;
    const loserStats = loserChar.stats;

    // Determine primary decisive advantage if not yet set
    if (!decisiveAdvantage) {
      if (winnerStats.combat > loserStats.combat + 8) {
        decisiveAdvantage = 'Superior Combat Mastery';
      } else if (winnerStats.durability > loserStats.durability + 10) {
        decisiveAdvantage = 'Unbreakable Durability';
      } else if (winnerStats.speed > loserStats.speed + 10) {
        decisiveAdvantage = 'Supersonic Reaction Speed';
      } else if (winnerStats.range > loserStats.range + 15) {
        decisiveAdvantage = 'Ranged Suppression';
      } else if (winnerStats.strength > loserStats.strength + 12) {
        decisiveAdvantage = 'Overwhelming Physical Might';
      } else {
        decisiveAdvantage = 'Tactical Superiority';
      }
    }

    // Formulate rich comic narrative reason
    let reason = '';
    if (winnerChar.role === 'Sorcerer') {
      reason = `${winnerChar.name}'s reality-altering magic and arcane shields disoriented ${loserChar.name}, breaching defenses with ${winnerChar.specialAbilities[0]}.`;
    } else if (winnerChar.role === 'Tank' && winnerStats.durability >= 90) {
      reason = `${winnerChar.name} weathered ${loserChar.name}'s fiercest offensive waves, retaliating with crushing force that broke through.`;
    } else if (winnerChar.role === 'Speedster' || winnerStats.speed >= 88) {
      reason = `${winnerChar.name}'s lightning-fast reflexes allowed flawless evasions, punishing ${loserChar.name} before counter-strikes could land.`;
    } else if (winnerChar.role === 'Blaster') {
      reason = `${winnerChar.name}'s continuous heavy artillery kept ${loserChar.name} under relentless suppression until their guard collapsed.`;
    } else {
      reason = `${winnerChar.name}'s battle discipline and calculated execution overwhelmed ${loserChar.name} in decisive close-quarters combat.`;
    }

    if (keyFactors.length === 0) {
      keyFactors.push(`${winnerChar.name}'s ${decisiveAdvantage} proved the deciding factor.`);
      keyFactors.push(`Effective combat rating: ${winningScore.toFixed(1)} vs ${losingScore.toFixed(1)}.`);
    }

    const battleSummary = `After a fierce clash, ${winnerChar.name} secured victory over ${loserChar.name} with ${winnerChar.visuals.comicQuote || 'overwhelming power'}!`;

    return {
      winnerChar,
      loserChar,
      score1,
      score2,
      reason,
      decisiveAdvantage,
      keyFactors,
      battleSummary
    };
  }

  /**
   * Evaluates a full Team vs Team battle between two players.
   * Matches up characters 1-on-1 according to lineup order.
   * If there's a tie in individual wins, uses remaining team total power as tiebreaker.
   */
  public static resolveTeamBattle(
    matchId: string,
    player1Id: string,
    player1Name: string,
    team1: Character[],
    player2Id: string,
    player2Name: string,
    team2: Character[]
  ): TeamBattleResult {
    const fightCount = Math.min(team1.length, team2.length);
    const individualFights: BattleMatchup[] = [];
    let team1Wins = 0;
    let team2Wins = 0;

    for (let i = 0; i < fightCount; i++) {
      const char1 = team1[i];
      const char2 = team2[i];
      const evalResult = BattleEngine.evaluateMatchup(char1, char2, i + 1);

      const isChar1Winner = evalResult.winnerChar.id === char1.id;
      if (isChar1Winner) {
        team1Wins++;
      } else {
        team2Wins++;
      }

      individualFights.push({
        id: `${matchId}-bout-${i + 1}`,
        roundIndex: i + 1,
        matchTitle: `BOUT 0${i + 1}: ${char1.name.toUpperCase()} VS ${char2.name.toUpperCase()}`,
        player1Id,
        player1Name,
        player2Id,
        player2Name,
        char1,
        char2,
        winnerId: isChar1Winner ? player1Id : player2Id,
        winnerName: isChar1Winner ? player1Name : player2Name,
        loserId: isChar1Winner ? player2Id : player1Id,
        loserName: isChar1Winner ? player2Name : player1Name,
        reason: evalResult.reason,
        keyFactors: evalResult.keyFactors,
        battleSummary: evalResult.battleSummary,
        decisiveAdvantage: evalResult.decisiveAdvantage,
        char1Score: Number(evalResult.score1.toFixed(1)),
        char2Score: Number(evalResult.score2.toFixed(1))
      });
    }

    let winnerPlayerId = '';
    let winnerPlayerName = '';
    let tiebreakerUsed = false;
    let tiebreakerExplanation: string | undefined;

    if (team1Wins > team2Wins) {
      winnerPlayerId = player1Id;
      winnerPlayerName = player1Name;
    } else if (team2Wins > team1Wins) {
      winnerPlayerId = player2Id;
      winnerPlayerName = player2Name;
    } else {
      // Tiebreaker: Total Team Power Score
      tiebreakerUsed = true;
      const team1Power = team1.reduce((sum, c) => sum + c.stats.power, 0);
      const team2Power = team2.reduce((sum, c) => sum + c.stats.power, 0);

      if (team1Power >= team2Power) {
        winnerPlayerId = player1Id;
        winnerPlayerName = player1Name;
        tiebreakerExplanation = `Deadlock tie broken by Total Team Power! ${player1Name} (${team1Power} Power) edged out ${player2Name} (${team2Power} Power).`;
      } else {
        winnerPlayerId = player2Id;
        winnerPlayerName = player2Name;
        tiebreakerExplanation = `Deadlock tie broken by Total Team Power! ${player2Name} (${team2Power} Power) edged out ${player1Name} (${team1Power} Power).`;
      }
    }

    return {
      matchId,
      team1PlayerId: player1Id,
      team1PlayerName: player1Name,
      team2PlayerId: player2Id,
      team2PlayerName: player2Name,
      team1Wins,
      team2Wins,
      winnerPlayerId,
      winnerPlayerName,
      individualFights,
      tiebreakerUsed,
      tiebreakerExplanation
    };
  }
}
