import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { RoomManager } from './game/RoomManager';
import { setupSocketHandlers } from './socket/socketHandler';
import { ALL_CHARACTERS, MARVEL_CHARACTERS } from './data/characters';
import { ServerToClientEvents, ClientToServerEvents } from '../../shared/types';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for local Vite development and production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Serve local character artwork assets
app.use('/characters', express.static(path.join(__dirname, '../public/characters')));

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 30000,
  pingInterval: 10000
});

// Initialize Authoritative Room Manager
const roomManager = new RoomManager({
  broadcastToRoom: (roomCode, event, payload) => {
    io.to(roomCode).emit(event as any, payload);
  },
  sendToPlayer: (socketId, event, payload) => {
    io.to(socketId).emit(event as any, payload);
  }
});

// Setup Socket.IO Event Handlers
setupSocketHandlers(io, roomManager);

// REST API Endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), service: 'Battle Auction Multiverse Engine' });
});

app.get('/api/characters', (req, res) => {
  res.json({ total: ALL_CHARACTERS.length, characters: ALL_CHARACTERS });
});

app.get('/api/room/:code', (req, res) => {
  const room = roomManager.getRoomByCode(req.params.code);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  return res.json({
    roomCode: room.roomCode,
    phase: room.phase,
    playerCount: room.players.length,
    maxPlayers: room.settings.maxPlayers,
    joinable: room.phase === 'LOBBY' && room.players.length < room.settings.maxPlayers
  });
});

// Serve frontend in production if built
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api') || req.url.startsWith('/health')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) res.status(200).send('Battle Auction Multiverse API Server Running');
  });
});

server.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`💥 BATTLE AUCTION MULTIVERSE SERVER ONLINE`);
  console.log(`⚡ Port: ${PORT}`);
  console.log(`🔥 Ready for real-time superhero bidding & battles (200 Heroes)`);
  console.log(`================================================`);
});
