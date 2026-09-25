import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '../../../shared/types';

// Helper to determine the target backend server URL
function resolveServerUrl(): string {
  // 1. Explicit Vite build environment variable
  if (import.meta.env.VITE_SERVER_URL) {
    return import.meta.env.VITE_SERVER_URL;
  }

  if (typeof window !== 'undefined') {
    // 2. Window runtime global override (e.g. window.__MAB_SERVER_URL__ = 'https://...')
    if (window.__MAB_SERVER_URL__) {
      return window.__MAB_SERVER_URL__;
    }

    // 3. Query string override (?server=https://your-server.com)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryServer = urlParams.get('server');
      if (queryServer) {
        localStorage.setItem('mab_server_url', queryServer);
        return queryServer;
      }

      // 4. Stored server URL
      const savedServer = localStorage.getItem('mab_server_url');
      if (savedServer) {
        return savedServer;
      }
    } catch {}

    // 5. If hosted on CrazyGames iframe/CDN, use configured backend or origin
    if (window.location.hostname.includes('crazygames')) {
      const savedOrFallback = localStorage.getItem('mab_server_url');
      if (savedOrFallback) return savedOrFallback;
    }

    // 6. Local development or production standard origin
    if (import.meta.env.DEV) {
      return 'http://localhost:3001';
    }
    return window.location.origin;
  }

  return 'http://localhost:3001';
}

const SERVER_URL = resolveServerUrl();

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

// Automatic reconnect & session re-sync when Android TWA returns to foreground
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (!socket.connected) {
        socket.connect();
      }
      const saved = SessionStorage.getSavedSession();
      if (saved) {
        socket.emit('RECONNECT_SESSION', {
          sessionToken: saved.sessionToken,
          roomCode: saved.roomCode
        });
      }
    }
  });
}
