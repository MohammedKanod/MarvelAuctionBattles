import { Character, Player, RoomState, RoomSettings } from '../../../shared/types';
import { DEFAULT_PASSES_PER_PLAYER } from '../../../shared/constants';
import { BattleEngine } from '../battle/BattleEngine';

export interface BotAuctionDecision {
  action: 'BID' | 'PASS' | 'WAIT' | 'NONE';
  amount?: number;
  delayMs: number;
  reason?: string;
}

const BOT_NAMES = [
  'Doctor Doom AI',
  'Brainiac 5',
  'JARVIS Omega',
  'Cerebro Prime',
  'Vision Subroutine',
  'Ultron Strategic Core',
  'Zola Multiverse Matrix',
  'Nimrod Mastermind'
];

// Iconic metal-based character IDs for Magneto counter calculation
const METALLIC_HERO_IDS = ['iron-man', 'wolverine', 'colossus', 'war-machine', 'ultron', 'cyborg', 'steel'];

// Physical brute tank IDs with low magical/range defense
const PHYSICAL_BRUTE_IDS = ['hulk', 'colossus', 'thing', 'juggernaut', 'abomination', 'bane', 'rhino'];

// Ranged blaster IDs susceptible to supersonic blitzes
const BLASTER_HERO_IDS = ['iron-man', 'cyclops', 'star-lord', 'human-torch', 'havok', 'electro'];

export class BotEngine {
  /**
   * Generates a new bot player instance configured for the room.
   */
  public static createBotPlayer(settings: RoomSettings, existingBotNames: string[] = []): Player {
    const availableNames = BOT_NAMES.filter(name => !existingBotNames.includes(name));
    const botName = availableNames.length > 0 
      ? availableNames[Math.floor(Math.random() * availableNames.length)]
      : `AI Tactician ${Math.floor(Math.random() * 900) + 100}`;

    const botId = `bot-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const sessionId = `session-${botId}`;

    return {
      id: botId,
      sessionId,
      name: botName,
      isHost: false,
      isReady: true,
      connected: true,
      coins: settings.startingCoins,
      characters: [],
      wins: 0,
      eliminated: false,
      avatarSeed: 4, // Special cyber/AI seed
      passesRemaining: DEFAULT_PASSES_PER_PLAYER,
      defeatedCharacterIds: [],
      usedCharacterIds: [],
      isBot: true
    };
  }

  /**
   * PhD-Level Superhero Valuation Algorithm.
   * Synthesizes raw BattleEngine combat weightings, role archetype balance (Tank/Blaster/Speedster trinity),
   * iconic passive traits (regeneration, reality warping), universe chemistry, and opponent counter-scouting.
   */
  public static evaluateCharacterValue(character: Character, bot: Player, room: RoomState): number {
    // 1. Rarity baseline in coins calibrated for 1000-1500 starting bankrolls
    const rarityBases: Record<string, number> = {
      Common: 140,
      Rare: 220,
      Epic: 340,
      Legendary: 480,
      Cosmic: 640
    };
    const baseRarityValue = rarityBases[character.rarity] || 250;

    // 2. BattleEngine-Aligned Combat Power Rating
    // Strength (20%), Durability (20%), Combat Skill (25%), Speed (15%), Range (10%), Intelligence (10%)
    const stats = character.stats || {
      strength: 50, speed: 50, durability: 50,
      combat: 50, range: 50, intelligence: 50, power: 75
    };

    const weightedCombatScore = (
      (stats.strength * 0.20) +
      (stats.durability * 0.20) +
      (stats.combat * 0.25) +
      (stats.speed * 0.15) +
      (stats.range * 0.10) +
      (stats.intelligence * 0.10)
    );

    // Normalize weighted combat score around average baseline of 70 (multiplier ~0.75 to 1.25)
    const combatMultiplier = Math.max(0.70, Math.min(1.30, 0.70 + ((weightedCombatScore - 50) / 45) * 0.50));

    // Power index (60-99) scaling factor
    const power = stats.power ?? 75;
    const powerMultiplier = 0.85 + Math.max(0, Math.min(0.35, ((power - 60) / 39) * 0.35));

    // 3. Special Iconic Abilities & Battle Mechanics
    let abilityBonus = 1.0;
    const abilitiesLower = (character.specialAbilities || []).map(a => a.toLowerCase());

    // Hyper-regeneration / Healing factor attrition advantage (+6 in BattleEngine)
    if (stats.durability >= 90 && abilitiesLower.some(a => a.includes('healing') || a.includes('regeneration'))) {
      abilityBonus += 0.14; // Wolverine, Deadpool, Hulk
    }

    // Reality alteration & Dimensional magic (bypasses physical tank armor)
    if (character.role === 'Sorcerer' || abilitiesLower.some(a => a.includes('magic') || a.includes('reality') || a.includes('mystic'))) {
      abilityBonus += 0.12; // Doctor Strange, Scarlet Witch
    }

    // Tactical Mastermind / Prep Time bonus
    if (stats.intelligence >= 92 || character.role === 'Tactician') {
      abilityBonus += 0.10; // Batman, Iron Man, Captain America
    }

    // 4. Role Balance & Team Archetype Trinity (Tank + Blaster/Sorcerer + Speedster/Tactician)
    const sameRoleCount = bot.characters.filter(c => c.role === character.role).length;
    let roleMultiplier = 1.0;
    if (sameRoleCount === 0) {
      // First character of this archetype is high priority to achieve squad balance
      roleMultiplier = 1.30;
    } else if (sameRoleCount === 1) {
      roleMultiplier = 0.95;
    } else {
      // Severe diminishing returns penalty for drafting 3+ of the same role
      roleMultiplier = 0.60;
    }

    // 5. Universe / Multiverse Thematic Cohesion
    const universeCount = bot.characters.filter(c => c.universe === character.universe).length;
    let universeMultiplier = 1.0;
    if (universeCount >= 2) {
      universeMultiplier = 1.10;
    }

    // 6. Opponent Counter-Scouting (PhD Superhero Lore & Hate-Drafting)
    // Inspect what heroes human opponents have already drafted
    let counterMultiplier = 1.0;
    const opponents = room.players.filter(p => p.id !== bot.id);
    const opponentHeroes = opponents.flatMap(p => p.characters);

    if (opponentHeroes.length > 0) {
      const oppHeroIds = opponentHeroes.map(h => h.id.toLowerCase());
      const oppRoles = opponentHeroes.map(h => h.role);

      // A. Magneto Metal Annihilation (+18 in BattleEngine!)
      const opponentHasMetal = oppHeroIds.some(id => METALLIC_HERO_IDS.includes(id));
      if (character.id === 'magneto' && opponentHasMetal) {
        counterMultiplier += 0.40; // Hard counter auto-win against opponent's metal roster
      }

      // Denial pick: If bot has metal heroes and opponent might draft Magneto, bot values Magneto
      const botHasMetal = bot.characters.some(h => METALLIC_HERO_IDS.includes(h.id.toLowerCase()));
      if (character.id === 'magneto' && botHasMetal) {
        counterMultiplier += 0.25;
      }

      // B. Sorcerer vs Heavy Physical Brutes (+8 in BattleEngine)
      const oppHasPhysicalBrutes = oppHeroIds.some(id => PHYSICAL_BRUTE_IDS.includes(id)) || oppRoles.includes('Tank');
      if (character.role === 'Sorcerer' && oppHasPhysicalBrutes) {
        counterMultiplier += 0.25;
      }

      // C. Speedster Blitz vs Ranged Blasters (+7 in BattleEngine)
      const oppHasBlasters = oppHeroIds.some(id => BLASTER_HERO_IDS.includes(id)) || oppRoles.includes('Blaster');
      if (character.role === 'Speedster' && oppHasBlasters) {
        counterMultiplier += 0.22;
      }

      // D. Elemental Energy vs Venom Symbiote (+10 in BattleEngine)
      if (oppHeroIds.includes('venom')) {
        const hasElemental = abilitiesLower.some(a => a.includes('fire') || a.includes('lightning') || a.includes('flame'));
        if (hasElemental || character.id === 'electro' || character.id === 'ghost-rider') {
          counterMultiplier += 0.25;
        }
      }
    }

    const rawValuation = baseRarityValue * combatMultiplier * powerMultiplier * abilityBonus * roleMultiplier * universeMultiplier * counterMultiplier;
    return Math.round(rawValuation);
  }

  /**
   * PhD-Level Budget Allocation & Willingness-To-Pay (WTP) Engine.
   * Ensures the bot NEVER blows its bankroll on one character (e.g. $700 on Hulk) and starves remaining slots.
   * Enforces a dynamic future-slot reserve and strict rarity tier budget caps.
   */
  public static getWillingnessToPay(character: Character, bot: Player, room: RoomState): number {
    const slotsNeeded = room.settings.charactersPerPlayer - bot.characters.length;
    if (slotsNeeded <= 0) return 0;

    const minBid = room.auction?.startingBid || 100;
    const increment = room.settings.bidIncrement || 50;
    const startingCoins = room.settings.startingCoins || 1000;
    const totalSlots = room.settings.charactersPerPlayer || 3;

    // ==================== 1. DYNAMIC SAFETY RESERVE ====================
    // A PhD master never leaves themselves with only $100 for future slots.
    // They reserve at least 150-250 coins per future slot to remain competitive.
    let maxAffordable = bot.coins;
    let singleHeroBudgetCap = bot.coins;

    if (slotsNeeded > 1) {
      const futureSlots = slotsNeeded - 1;
      const targetAvgPerSlot = startingCoins / totalSlots;
      const currentAvgPerSlot = bot.coins / slotsNeeded;

      // Reserve at least minBid + 1 increment (e.g. 150), scaling with average available funds
      const reservePerFutureSlot = Math.max(
        minBid + increment,
        Math.min(260, Math.floor(Math.min(targetAvgPerSlot, currentAvgPerSlot) * 0.65))
      );

      const safetyReserve = futureSlots * reservePerFutureSlot;
      maxAffordable = Math.max(0, bot.coins - safetyReserve);

      if (maxAffordable < minBid) {
        return 0;
      }

      // ==================== 2. TIER EXPENDITURE CAPS ====================
      // Enforces the Golden Budget Ratio:
      // When multiple slots remain, no single hero can consume more than their fair share of starting bankroll.
      if (slotsNeeded >= 3) {
        // Early Draft: Diversification is paramount
        const maxSpendPercentageByRarity: Record<string, number> = {
          Common: 0.16,     // Max $160 on $1000 budget
          Rare: 0.22,       // Max $220 on $1000 budget
          Epic: 0.30,       // Max $300 on $1000 budget
          Legendary: 0.38,  // Max $380 on $1000 budget (Hulk will NEVER exceed ~$380!)
          Cosmic: 0.44      // Max $440 on $1000 budget for god-tier titans
        };
        const percentage = maxSpendPercentageByRarity[character.rarity] || 0.28;
        singleHeroBudgetCap = Math.floor(startingCoins * percentage);
      } else if (slotsNeeded === 2) {
        // Mid Draft (2 slots left):
        // Allow up to 58% of remaining coins, ensuring at least 42% is preserved for the closer
        const maxSpendPercentageByRarity: Record<string, number> = {
          Common: 0.25,
          Rare: 0.35,
          Epic: 0.48,
          Legendary: 0.58,
          Cosmic: 0.62
        };
        const percentage = maxSpendPercentageByRarity[character.rarity] || 0.45;
        singleHeroBudgetCap = Math.floor(bot.coins * percentage);
      }
    } else {
      // Final Slot (slotsNeeded === 1):
      // Bot can spend up to 100% of remaining coins on its final hero!
      maxAffordable = bot.coins;
      singleHeroBudgetCap = bot.coins;
    }

    // ==================== 3. INTRINSIC VALUATION & URGENCY ====================
    const intrinsicValue = this.evaluateCharacterValue(character, bot, room);

    // Urgency scaling based on draft progress
    const currentRound = room.auction?.currentRound || 1;
    const totalRounds = room.players.length * totalSlots;
    const roundsRemaining = Math.max(1, totalRounds - currentRound + 1);

    let urgencyMultiplier = 1.0;
    if (slotsNeeded >= roundsRemaining) {
      // Danger of failing to draft full roster: be slightly more aggressive
      urgencyMultiplier = 1.20;
    } else if (slotsNeeded === 1) {
      // Closer slot: push to acquire best remaining anchor
      urgencyMultiplier = 1.15;
    }

    // Bankroll wealth multiplier
    const coinsPerSlot = bot.coins / slotsNeeded;
    if (coinsPerSlot > 450) {
      urgencyMultiplier *= 1.08;
    } else if (coinsPerSlot < 200) {
      urgencyMultiplier *= 0.88;
    }

    // Subtle deterministic personality variance (±4%)
    const seed = (character.id.charCodeAt(0) || 1) + (bot.id.charCodeAt(bot.id.length - 1) || 1);
    const varianceFactor = 0.96 + ((seed % 9) * 0.01);

    const calculatedWTP = intrinsicValue * urgencyMultiplier * varianceFactor;

    // Hard ceiling: Combine calculated valuation with safety reserve and tier budget cap
    const finalWTP = Math.min(calculatedWTP, maxAffordable, singleHeroBudgetCap);

    if (finalWTP < minBid) {
      return 0;
    }

    // Snap cleanly to room bid increment
    return Math.floor(finalWTP / increment) * increment;
  }

  /**
   * PhD-Level Auction Decision Engine.
   * Features human-like response timing, anti-snipe triggers, strategic price discipline (bleeding opponent's bankroll),
   * and disciplined pass management.
   */
  public static decideAuctionAction(bot: Player, room: RoomState): BotAuctionDecision {
    if (!room.auction || (room.auction.status !== 'ACTIVE' && room.auction.status !== 'EXTENDED')) {
      return { action: 'NONE', delayMs: 0, reason: 'Auction not active' };
    }

    const character = room.auction.character;
    if (!character) {
      return { action: 'NONE', delayMs: 0, reason: 'No active character' };
    }

    // Check if bot already completed roster
    if (bot.characters.length >= room.settings.charactersPerPlayer) {
      return { action: 'NONE', delayMs: 0, reason: 'Roster full' };
    }

    // Check if bot already passed on this character
    if (room.auction.passedPlayerIds?.includes(bot.id)) {
      return { action: 'NONE', delayMs: 0, reason: 'Already passed' };
    }

    // If bot is currently holding highest bid, WAIT
    if (room.auction.currentLeaderId === bot.id) {
      return { action: 'WAIT', delayMs: 0, reason: 'Already leading bid' };
    }

    const startingBid = room.auction.startingBid || 100;
    const increment = room.settings.bidIncrement || 50;
    const minRequiredBid = room.auction.currentBid === 0
      ? startingBid
      : room.auction.currentBid + increment;

    // Check if bot has enough coins for minimum required bid
    if (bot.coins < minRequiredBid) {
      const canPass = bot.coins < startingBid && (bot.passesRemaining ?? 0) > 0;
      if (canPass) {
        return {
          action: 'PASS',
          delayMs: 1200 + Math.floor(Math.random() * 600),
          reason: `Insufficient coins (${bot.coins} < ${minRequiredBid}), passing character.`
        };
      }
      return { action: 'NONE', delayMs: 0, reason: 'Cannot afford required bid' };
    }

    // Calculate Bot's Willingness To Pay
    const wtp = this.getWillingnessToPay(character, bot, room);

    // ==================== BIDDING LOGIC ====================
    if (minRequiredBid <= wtp) {
      // Timing dynamics:
      let delayMs: number;
      if (room.auction.status === 'EXTENDED' || room.auction.timerSeconds <= 3) {
        // Anti-snipe: Fast tactical reaction (500ms - 900ms)
        delayMs = 500 + Math.floor(Math.random() * 400);
      } else if (room.auction.currentBid === 0) {
        // Opening bid: 1.2s - 2.2s
        delayMs = 1200 + Math.floor(Math.random() * 1000);
      } else {
        // Counter-bid: 900ms - 1.7s
        delayMs = 900 + Math.floor(Math.random() * 800);
      }

      return {
        action: 'BID',
        amount: minRequiredBid,
        delayMs,
        reason: `Valuation acceptable (Bid ${minRequiredBid} <= WTP ${wtp})`
      };
    } else {
      // OVERPRICED: Bot refuses to overpay and lets opponent have it
      const canPass = bot.coins < startingBid && (bot.passesRemaining ?? 0) > 0;
      if (canPass) {
        return {
          action: 'PASS',
          delayMs: 1300 + Math.floor(Math.random() * 700),
          reason: `Character price exceeds valuation and coins low, passing character.`
        };
      }

      return {
        action: 'NONE',
        delayMs: 0,
        reason: `Required bid (${minRequiredBid}) exceeds valuation ceiling (${wtp})`
      };
    }
  }

  /**
   * PhD-Level Tactical Fighter Deployment (Minimax / Game-Theoretic Optimal).
   * Evaluates available heroes against opponent's remaining roster using BattleEngine combat simulations.
   * Optimizes overall match win probability: avoids wasting trump cards on bait, and deploys hard counters decisively.
   */
  public static chooseFighter(bot: Player, opponent?: Player): Character | null {
    const usedIds = bot.usedCharacterIds || [];
    const defeatedIds = bot.defeatedCharacterIds || [];
    const available = bot.characters.filter(
      c => !usedIds.includes(c.id) && !defeatedIds.includes(c.id)
    );

    if (available.length === 0) {
      return bot.characters[0] || null;
    }

    if (available.length === 1) {
      return available[0];
    }

    // Opponent available heroes
    const oppUsed = opponent?.usedCharacterIds || [];
    const oppDefeated = opponent?.defeatedCharacterIds || [];
    const oppAvailable = opponent?.characters.filter(
      c => !oppUsed.includes(c.id) && !oppDefeated.includes(c.id)
    ) || [];

    // Fallback if opponent has no available heroes
    if (oppAvailable.length === 0) {
      // Pick hero with highest composite combat rating
      return available.reduce((best, curr) => {
        const bestPower = curr.stats?.power || 75;
        const currPower = best.stats?.power || 75;
        return bestPower > currPower ? curr : best;
      }, available[0]);
    }

    // ==================== SCENARIO 1: OPPONENT HAS EXACTLY 1 HERO LEFT ====================
    // Endgame certainty: Opponent MUST deploy this exact hero.
    // Pick the hero that guarantees or maximizes victory against this specific opponent.
    if (oppAvailable.length === 1) {
      const targetOpp = oppAvailable[0];
      let bestCandidate = available[0];
      let bestMargin = -Infinity;

      for (const candidate of available) {
        const combat = BattleEngine.evaluateMatchup(candidate, targetOpp);
        const isBotWin = combat.winnerChar.id === candidate.id;
        const margin = isBotWin ? (combat.score1 - combat.score2) : (combat.score2 - combat.score1);

        if (margin > bestMargin) {
          bestMargin = margin;
          bestCandidate = candidate;
        }
      }

      return bestCandidate;
    }

    // ==================== SCENARIO 2: MULTI-HERO TACTICAL MINIMAX ====================
    // Score each candidate across the entire opponent pool
    let bestCandidate = available[0];
    let highestTacticalScore = -Infinity;

    for (const candidate of available) {
      let winCount = 0;
      let totalMargin = 0;
      let minMargin = Infinity;
      let hasDecisiveAdvantage = false;

      for (const oppChar of oppAvailable) {
        const combat = BattleEngine.evaluateMatchup(candidate, oppChar);
        const isBotWin = combat.winnerChar.id === candidate.id;
        const margin = isBotWin ? (combat.score1 - combat.score2) : -(combat.score2 - combat.score1);

        if (isBotWin) winCount++;
        totalMargin += margin;
        if (margin < minMargin) minMargin = margin;

        if (combat.decisiveAdvantage && isBotWin) {
          hasDecisiveAdvantage = true;
        }
      }

      const winRate = winCount / oppAvailable.length;
      const avgMargin = totalMargin / oppAvailable.length;
      const candidatePower = candidate.stats?.power || 75;

      // Base tactical score from win rate and worst-case security level (Minimax)
      let score = (winRate * 50) + (avgMargin * 1.5) + (minMargin * 2.0);

      // Decisive counter bonus
      if (hasDecisiveAdvantage) {
        score += 15;
      }

      // TRUMP CARD CONSERVATION:
      // If candidate is a 90+ god-tier hero, don't deploy them if another available hero
      // already has a >60% win rate against the opponent's pool! Save the titan for when needed!
      const otherViableCandidates = available.filter(
        c => c.id !== candidate.id && (c.stats?.power || 75) < candidatePower
      );

      const hasViableBackup = otherViableCandidates.some(b => {
        const backupWins = oppAvailable.filter(
          opp => BattleEngine.evaluateMatchup(b, opp).winnerChar.id === b.id
        ).length;
        return (backupWins / oppAvailable.length) >= 0.50;
      });

      if (candidatePower >= 90 && hasViableBackup && oppAvailable.length > 2) {
        score -= 12; // Conserve trump card
      }

      // Slight natural variance (±2 points)
      score += (Math.random() * 4) - 2;

      if (score > highestTacticalScore) {
        highestTacticalScore = score;
        bestCandidate = candidate;
      }
    }

    return bestCandidate;
  }
}
