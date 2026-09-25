import { Character, Player, RoomState, RoomSettings } from '../../../shared/types';
import { DEFAULT_PASSES_PER_PLAYER } from '../../../shared/constants';

export interface BotAuctionDecision {
  action: 'BID' | 'PASS' | 'WAIT' | 'NONE';
  amount?: number;
  delayMs: number;
  reason?: string;
}

const BOT_NAMES = [
  'Ultron AI',
  'JARVIS Bot',
  'Cerebro AI',
  'Brainiac AI',
  'Zola Core',
  'Friday AI',
  'Vision Subroutine',
  'Nimrod Sentinel'
];

export class BotEngine {
  /**
   * Generates a new bot player instance configured for the room.
   */
  public static createBotPlayer(settings: RoomSettings, existingBotNames: string[] = []): Player {
    const availableNames = BOT_NAMES.filter(name => !existingBotNames.includes(name));
    const botName = availableNames.length > 0 
      ? availableNames[Math.floor(Math.random() * availableNames.length)]
      : `AI Bot ${Math.floor(Math.random() * 900) + 100}`;

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
   * Calculates intrinsic character valuation based on rarity, power, attribute averages,
   * role synergy, and universe synergy.
   */
  public static evaluateCharacterValue(character: Character, bot: Player, room: RoomState): number {
    // 1. Rarity baseline in coins
    const rarityBases: Record<string, number> = {
      Common: 180,
      Rare: 290,
      Epic: 440,
      Legendary: 660,
      Cosmic: 920
    };
    const baseRarityValue = rarityBases[character.rarity] || 250;

    // 2. Power Index (60-99) scaling
    const power = character.stats?.power ?? 75;
    const powerNorm = Math.max(0, Math.min(1, (power - 60) / 39));
    const powerMultiplier = 0.70 + (powerNorm * 0.45); // 0.70 to 1.15

    // 3. Stats attribute average (strength, speed, durability, combat, range, intelligence)
    const stats = character.stats || {
      strength: 50, speed: 50, durability: 50,
      combat: 50, range: 50, intelligence: 50
    };
    const statAvg = (
      (stats.strength || 50) +
      (stats.speed || 50) +
      (stats.durability || 50) +
      (stats.combat || 50) +
      (stats.range || 50) +
      (stats.intelligence || 50)
    ) / 6;
    const statNorm = Math.max(0, Math.min(1, (statAvg - 40) / 60));
    const statMultiplier = 0.85 + (statNorm * 0.30); // 0.85 to 1.15

    // 4. Role Balance & Team Synergy
    // If bot has no hero in this role yet, high synergy bonus!
    const roleCount = bot.characters.filter(c => c.role === character.role).length;
    let roleMultiplier = 1.0;
    if (roleCount === 0) {
      roleMultiplier = 1.25; // High priority to diversify squad
    } else if (roleCount === 1) {
      roleMultiplier = 0.95; // Acceptable second option
    } else {
      roleMultiplier = 0.70; // Penalize excessive role duplication
    }

    // 5. Universe Synergy
    const universeCount = bot.characters.filter(c => c.universe === character.universe).length;
    let universeMultiplier = 1.0;
    if (universeCount >= 2) {
      universeMultiplier = 1.10; // +10% synergy bonus for thematic cohesion
    }

    // 6. Matchup Versatility
    const strengthsCount = character.matchupStrengths?.length || 0;
    const versatilityMultiplier = 1.0 + (strengthsCount * 0.03);

    const rawValuation = baseRarityValue * powerMultiplier * statMultiplier * roleMultiplier * universeMultiplier * versatilityMultiplier;
    return Math.round(rawValuation);
  }

  /**
   * Computes the maximum coins the bot is willing to pay (WTP) in this round,
   * factoring in safe budget reserves for remaining slots and tournament urgency.
   */
  public static getWillingnessToPay(character: Character, bot: Player, room: RoomState): number {
    const slotsNeeded = room.settings.charactersPerPlayer - bot.characters.length;
    if (slotsNeeded <= 0) return 0;

    const minBid = room.auction?.startingBid || 100;

    // Safety Reserve: Ensure bot keeps at least minBid coins for each future slot
    const futureSlots = slotsNeeded - 1;
    const safetyReserve = futureSlots * minBid;
    const maxAffordable = Math.max(0, bot.coins - safetyReserve);

    if (maxAffordable < minBid) {
      return 0;
    }

    const intrinsicValue = this.evaluateCharacterValue(character, bot, room);

    // Urgency factor based on remaining auction rounds
    const currentRound = room.auction?.currentRound || 1;
    const totalRounds = room.players.length * room.settings.charactersPerPlayer;
    const roundsRemaining = Math.max(1, totalRounds - currentRound + 1);

    let urgencyMultiplier = 1.0;
    if (slotsNeeded >= roundsRemaining) {
      // Danger of not filling roster! Bid aggressively
      urgencyMultiplier = 1.35;
    } else if (slotsNeeded === 1 && bot.characters.length === room.settings.charactersPerPlayer - 1) {
      // Final slot: Bot can spend up to its entire remaining budget
      urgencyMultiplier = 1.20;
    }

    // Coin richness factor:
    // If bot has high coins relative to slots needed, be more aggressive
    const coinsPerSlot = bot.coins / slotsNeeded;
    if (coinsPerSlot > 450) {
      urgencyMultiplier *= 1.15;
    } else if (coinsPerSlot < 220) {
      urgencyMultiplier *= 0.85;
    }

    // Subtle personality variance (±6%) using character id and bot id
    const seed = (character.id.charCodeAt(0) || 1) + (bot.id.charCodeAt(bot.id.length - 1) || 1);
    const varianceFactor = 0.94 + ((seed % 13) * 0.01);

    const calculatedWTP = intrinsicValue * urgencyMultiplier * varianceFactor;

    // Cap at maxAffordable
    const finalWTP = Math.min(maxAffordable, calculatedWTP);

    // Snap to increment
    const increment = room.settings.bidIncrement || 50;
    return Math.floor(finalWTP / increment) * increment;
  }

  /**
   * Evaluates current auction state and decides whether to BID, PASS, WAIT, or DO NOTHING.
   * Returns action along with a human-like simulated delay.
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
      // Check if eligible to pass
      const canPass = bot.coins < startingBid && (bot.passesRemaining ?? 0) > 0;
      if (canPass) {
        return {
          action: 'PASS',
          delayMs: 1200 + Math.floor(Math.random() * 800),
          reason: `Insufficient coins (${bot.coins} < ${minRequiredBid}), passing character.`
        };
      }
      return { action: 'NONE', delayMs: 0, reason: 'Cannot afford required bid' };
    }

    // Calculate Bot's Willingness To Pay
    const wtp = this.getWillingnessToPay(character, bot, room);

    // Decision: Compare required bid to WTP
    if (minRequiredBid <= wtp) {
      // DECISION: BID!
      // Human-like response timing:
      let delayMs: number;
      if (room.auction.status === 'EXTENDED' || room.auction.timerSeconds <= 3) {
        // Anti-snipe: Fast reaction (650ms - 1100ms)
        delayMs = 650 + Math.floor(Math.random() * 450);
      } else if (room.auction.currentBid === 0) {
        // Opening bid: Give human 1.6s - 2.8s before bot steps in
        delayMs = 1600 + Math.floor(Math.random() * 1200);
      } else {
        // Counter-bid: 1.2s - 2.2s thinking time
        delayMs = 1200 + Math.floor(Math.random() * 1000);
      }

      return {
        action: 'BID',
        amount: minRequiredBid,
        delayMs,
        reason: `Valuation acceptable (Bid ${minRequiredBid} <= WTP ${wtp})`
      };
    } else {
      // DECISION: DO NOT BID (overpriced according to algorithm)
      // Check if bot has < 100 coins and can pass
      const canPass = bot.coins < startingBid && (bot.passesRemaining ?? 0) > 0;
      if (canPass) {
        return {
          action: 'PASS',
          delayMs: 1400 + Math.floor(Math.random() * 900),
          reason: `Character over budget and coins low, choosing to pass.`
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
   * Chooses the optimal fighter for the bot in a battle round.
   * Evaluates available heroes against opponent's remaining roster.
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

    // Opponent unused heroes for tactical matchup analysis
    const oppUsed = opponent?.usedCharacterIds || [];
    const oppDefeated = opponent?.defeatedCharacterIds || [];
    const oppAvailable = opponent?.characters.filter(
      c => !oppUsed.includes(c.id) && !oppDefeated.includes(c.id)
    ) || [];

    // Score each candidate
    let bestCandidate = available[0];
    let bestScore = -Infinity;

    for (const candidate of available) {
      const stats = candidate.stats || { power: 75, combat: 70, durability: 70, strength: 70 };
      let score = (stats.power * 2) + (stats.combat * 1.2) + (stats.durability * 1.1) + (stats.strength * 1.0);

      // Matchup analysis against opponent's remaining roster
      if (oppAvailable.length > 0) {
        for (const oppChar of oppAvailable) {
          // Check if candidate has strengths against opponent's character or role
          const hasStrength = candidate.matchupStrengths?.some(
            s => s.toLowerCase().includes(oppChar.name.toLowerCase()) || 
                 s.toLowerCase().includes(oppChar.role.toLowerCase())
          );
          if (hasStrength) {
            score += 25;
          }

          const hasWeakness = candidate.matchupWeaknesses?.some(
            w => w.toLowerCase().includes(oppChar.name.toLowerCase()) || 
                 w.toLowerCase().includes(oppChar.role.toLowerCase())
          );
          if (hasWeakness) {
            score -= 15;
          }
        }
      }

      // Add small random noise (±5) for organic playstyle
      score += (Math.random() * 10) - 5;

      if (score > bestScore) {
        bestScore = score;
        bestCandidate = candidate;
      }
    }

    return bestCandidate;
  }
}
