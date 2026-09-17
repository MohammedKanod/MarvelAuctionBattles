import { Server, Socket } from 'socket.io';
import { RoomManager } from '../game/RoomManager';
import { ServerToClientEvents, ClientToServerEvents } from '../../../shared/types';

export function setupSocketHandlers(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  roomManager: RoomManager
) {
  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    socket.on('CREATE_ROOM', ({ playerName, settings }) => {
      try {
        const { room, player, sessionToken } = roomManager.createRoom(playerName, settings, socket.id);
        socket.join(room.roomCode);
        socket.emit('ROOM_CREATED', { room, selfPlayerId: player.id, sessionToken });
      } catch (err: any) {
        socket.emit('ERROR_NOTIFICATION', { message: err.message || 'Failed to create room' });
      }
    });

    socket.on('JOIN_ROOM', ({ roomCode, playerName }) => {
      try {
        const result = roomManager.joinRoom(roomCode, playerName, socket.id);
        if (!result.success || !result.room || !result.player || !result.sessionToken) {
          socket.emit('ERROR_NOTIFICATION', { message: result.error || 'Failed to join room' });
          return;
        }

        socket.join(result.room.roomCode);
        socket.emit('ROOM_JOINED', {
          room: result.room,
          selfPlayerId: result.player.id,
          sessionToken: result.sessionToken
        });
      } catch (err: any) {
        socket.emit('ERROR_NOTIFICATION', { message: err.message || 'Failed to join room' });
      }
    });

    socket.on('RECONNECT_SESSION', ({ sessionToken, roomCode }) => {
      try {
        const result = roomManager.reconnect(sessionToken, roomCode, socket.id);
        if (result.success && result.room && result.player) {
          socket.join(result.room.roomCode);
          socket.emit('ROOM_JOINED', {
            room: result.room,
            selfPlayerId: result.player.id,
            sessionToken
          });
        }
      } catch (err: any) {
        console.warn(`[Socket] Reconnect failed for ${socket.id}:`, err.message);
      }
    });

    socket.on('TOGGLE_READY', () => {
      roomManager.toggleReady(socket.id);
    });

    socket.on('UPDATE_SETTINGS', ({ settings }) => {
      roomManager.updateSettings(socket.id, settings);
    });

    socket.on('START_GAME', () => {
      const result = roomManager.startGame(socket.id);
      if (!result.success && result.error) {
        socket.emit('ERROR_NOTIFICATION', { message: result.error });
      }
    });

    socket.on('PLACE_BID', ({ amount }) => {
      const result = roomManager.placeBid(socket.id, amount);
      if (!result.success && result.error) {
        socket.emit('ERROR_NOTIFICATION', { message: result.error });
      }
    });

    socket.on('LOCK_FIGHTER', ({ characterId }) => {
      const result = roomManager.lockFighter(socket.id, characterId);
      if (!result.success && result.error) {
        socket.emit('ERROR_NOTIFICATION', { message: result.error });
      }
    });

    socket.on('NEXT_BOUT', () => {
      const result = roomManager.nextBout(socket.id);
      if (!result.success && result.error) {
        socket.emit('ERROR_NOTIFICATION', { message: result.error });
      }
    });

    socket.on('PLAY_AGAIN', () => {
      roomManager.playAgain(socket.id);
    });

    socket.on('disconnect', () => {
      roomManager.handleDisconnect(socket.id);
    });
  });
}
