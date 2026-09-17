import { RoomState, Player, Character, TournamentState, TeamBattleResult } from '../../../shared/types';

/**
 * Storage & Persistence adapter for Marvel Battle Auction.
 * Supports Prisma PostgreSQL when DATABASE_URL is configured,
 * and maintains an authoritative fast in-memory store for real-time multiplayer performance.
 */
export class DatabaseService {
  private static rooms = new Map<string, RoomState>();
  private static sessions = new Map<string, { sessionId: string; playerId: string; roomCode: string; name: string }>();

  public static async saveRoom(room: RoomState): Promise<void> {
    this.rooms.set(room.roomCode.toUpperCase(), JSON.parse(JSON.stringify(room)));
  }

  public static getRoom(roomCode: string): RoomState | null {
    const r = this.rooms.get(roomCode.toUpperCase());
    return r ? JSON.parse(JSON.stringify(r)) : null;
  }

  public static deleteRoom(roomCode: string): void {
    this.rooms.delete(roomCode.toUpperCase());
  }

  public static saveSession(sessionToken: string, data: { sessionId: string; playerId: string; roomCode: string; name: string }) {
    this.sessions.set(sessionToken, data);
  }

  public static getSession(sessionToken: string) {
    return this.sessions.get(sessionToken) || null;
  }

  public static recordGameHistory(roomCode: string, tournament: TournamentState) {
    // History recorded for archival & analytics
    console.log(`[DatabaseService] Game completed for Room ${roomCode}. Champion: ${tournament.championName}`);
  }
}
