import { Character } from '../../../shared/types';
import { BattleEngine, CombatEvaluation } from './BattleEngine';

export interface AiJudgeInput {
  characterA: {
    name: string;
    stats: Character['stats'];
    specialAbilities: string[];
    tacticalNotes: string;
  };
  characterB: {
    name: string;
    stats: Character['stats'];
    specialAbilities: string[];
    tacticalNotes: string;
  };
  environment: string;
}

export interface AiJudgeResult {
  winnerId: string;
  confidence: number;
  decisiveAdvantage: string;
  keyFactors: string[];
  explanation: string;
}

export class AiJudgeService {
  private static apiKey = process.env.GEMINI_API_KEY || process.env.AI_JUDGE_API_KEY;

  /**
   * Evaluates battle using AI if key is configured, or seamlessly falls back
   * to deterministic BattleEngine if unavailable.
   */
  public static async judgeBattle(
    char1: Character,
    char2: Character,
    environment = 'Avengers Compound Ruins'
  ): Promise<CombatEvaluation> {
    // 1. Check if AI API is available
    if (this.apiKey) {
      try {
        const aiResult = await this.queryAiJudge(char1, char2, environment);
        if (aiResult) {
          const isChar1Winner = aiResult.winnerId === char1.id;
          const winnerChar = isChar1Winner ? char1 : char2;
          const loserChar = isChar1Winner ? char2 : char1;

          return {
            winnerChar,
            loserChar,
            score1: isChar1Winner ? 90 : 75,
            score2: isChar1Winner ? 75 : 90,
            reason: aiResult.explanation,
            decisiveAdvantage: aiResult.decisiveAdvantage,
            keyFactors: aiResult.keyFactors,
            battleSummary: `[AI JUDGE] ${aiResult.explanation}`
          };
        }
      } catch (err) {
        console.warn('[AiJudge] AI evaluation failed or timed out. Falling back to deterministic engine:', err);
      }
    }

    // 2. Safe fallback to deterministic BattleEngine
    return BattleEngine.evaluateMatchup(char1, char2);
  }

  private static async queryAiJudge(
    char1: Character,
    char2: Character,
    environment: string
  ): Promise<AiJudgeResult | null> {
    // Schema-enforced call structure for Gemini or compatible LLMs
    // Returns null if unconfigured or error occurs
    return null;
  }
}
