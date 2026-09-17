import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '../../../shared/types';

// Connect to backend (supports VITE_SERVER_URL env var, localhost:3001 in dev, or origin in prod)
const SERVER_URL = 
  import.meta.env.VITE_SERVER_URL || 
  (import.meta.env.DEV ? 'http://localhost:3001' : window.location.origin);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 15,
  reconnectionDelay: 1000,
  transports: ['websocket', 'polling']
});

export const SessionStorage = {
  saveSession(sessionToken: string, roomCode: string, selfPlayerId: string) {
    try {
      sessionStorage.setItem('mba_session_token', sessionToken);
      sessionStorage.setItem('mba_room_code', roomCode);
      sessionStorage.setItem('mba_self_player_id', selfPlayerId);
    } catch {}
  },

  getSavedSession(): { sessionToken: string; roomCode: string; selfPlayerId: string } | null {
    try {
      const sessionToken = sessionStorage.getItem('mba_session_token');
      const roomCode = sessionStorage.getItem('mba_room_code');
      const selfPlayerId = sessionStorage.getItem('mba_self_player_id');
      if (sessionToken && roomCode && selfPlayerId) {
        return { sessionToken, roomCode, selfPlayerId };
      }
    } catch {}
    return null;
  },

  clearSession() {
    try {
      sessionStorage.removeItem('mba_session_token');
      sessionStorage.removeItem('mba_room_code');
      sessionStorage.removeItem('mba_self_player_id');
    } catch {}
  }
};
