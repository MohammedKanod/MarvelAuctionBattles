# MARVEL BATTLE AUCTION
> **BID. BUILD. BATTLE.**

A real-time multiplayer browser party game for 2–6 players. Players create a private room, invite friends using a room code, compete in a live superhero character auction with an authoritative server timer, assemble their tactical lineups, and clash in cinematic tournament battles.

---

## ⚡ Core Game Loop

```
LANDING PAGE
  ↓
CREATE / JOIN ROOM (6-char Code, e.g. X7K9PQ)
  ↓
MULTIPLAYER LOBBY (Real-time Ready States & Host Settings)
  ↓
CHARACTER AUCTION (Authoritative Countdown, Anti-Snipe Extension, Live Outbid Alerts)
  ↓
TEAM BUILDING (Roster Strategy, Order Selection, Lineup Lock-in)
  ↓
BATTLE ARENA (Cinematic 1v1 Clashes, Multi-Factor Evaluation, Narrative Reasoning)
  ↓
TOURNAMENT BRACKET (Semifinals → Championship Final, Tiebreakers)
  ↓
GRAND RESULTS (Podium, MVP Hero, Roster Value, Play Again)
```

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS (Custom Comic Theme: Halftone Dots, Action Lines, Tactile Comic Buttons, Bold Borders)
  - Lucide Icons & Canvas Confetti
- **Backend**:
  - Node.js & TypeScript
  - Express
  - Socket.IO (Authoritative synchronized real-time state machine)
  - Prisma ORM (PostgreSQL) with in-memory persistence adapter for zero-friction local dev
- **Audio**:
  - Custom Web Audio API procedural sound synthesizer (Auction gavels, coin blips, urgency ticks, battle clashes, victory fanfare, mute toggle). Zero external asset dependencies.
- **Combat Engine**:
  - Multi-factor deterministic combat solver (Strength, Speed, Durability, Combat Skill, Range, Intelligence, Role counters, Iconic comic matchup advantages)
  - Optional AI Battle Judge interface (Gemini API) with automated fallback.

---

## 🦸 Character Database (52 Iconic Marvel Heroes)

The database includes 52 characters balanced across MCU and comic tiers:
- **Tanks**: Thor, Thanos, Hulk, She-Hulk, Namor, Groot, Red Guardian, Venom, Ghost Rider, Colossus.
- **Strikers**: Black Panther, Wolverine, Shang-Chi, Hela, Moon Knight, Gamora, Winter Soldier, Deadpool, Black Widow, Cable.
- **Blasters**: Captain Marvel, Iron Man, Ikaris, Vision, White Vision, Electro, Ultron, Magneto, Rocket Raccoon, War Machine, Storm, Green Goblin.
- **Tacticians**: Captain America, Daredevil, Loki, Ant-Man, Mantis, Hawkeye, Star-Lord, Cyclops, Punisher.
- **Speedsters**: Spider-Man, Falcon, Silver Surfer, Nightcrawler.
- **Sorcerers**: Wanda Maximoff, Doctor Strange, Agatha Harkness, Ebony Maw, Doctor Doom, Jean Grey (Phoenix).

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
# In the server directory
cd server
npm install

# In the client directory
cd ../client
npm install
```

### 2. Start Backend Server
```bash
cd server
npm run dev
# Server will run on http://localhost:3001
```

### 3. Start Frontend Client
```bash
cd client
npm run dev
# Frontend will run on http://localhost:5173
```

---

## 🌐 Production Deployment

### Frontend (Vercel)
1. Link repository to Vercel.
2. Root Directory: `client` or configure `vercel.json` at root.
3. Build Command: `npm run build:client`
4. Output Directory: `client/dist`

### Backend (Railway / Render / Fly.io)
1. Use `server/Dockerfile` or configure Node.js environment.
2. Set Environment Variables:
   - `PORT=3001`
   - `DATABASE_URL=postgresql://...` (Supabase / Neon / Railway PostgreSQL)
   - `GEMINI_API_KEY=...` (Optional, for AI Battle Judge)
3. Deploy!
