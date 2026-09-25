# 🎮 CrazyGames Publishing & Optimization Guide

This game is fully optimized for **CrazyGames** using the official **CrazyGames SDK v3**, while maintaining **100% compatibility with standard web browsers, PWAs, and mobile versions** without any performance penalties, unwanted ads, or console errors.

---

## ⚡ How the Dual-Mode Architecture Works

The game automatically inspects its environment at runtime:

| Environment | Platform Mode | Behavior |
| :--- | :--- | :--- |
| `*.crazygames.com` / `*.crazygamescdn.com` | **CrazyGames** | SDK v3 auto-initializes, tracks gameplay lifecycle, plays midgame ads with audio muting, syncs player username, and fires `happytime` celebrations. |
| `localhost` (with QA Tool / SDK) | **Local Testing** | SDK v3 enables mock ads and testing logs. |
| Standard Browser (Vercel, Chrome, Safari, etc.) | **Standard Web** | SDK safely disables (`environment: 'disabled'`). All CrazyGames ad/lifecycle hooks **silently no-op with zero delay and zero interference**. |

---

## 🛠️ Integrated CrazyGames SDK v3 Features

### 1. **Lifecycle Management (`game.loadingStart` / `game.loadingStop`)**
- `loadingStart()` is called as soon as the app starts loading.
- `loadingStop()` is called the moment the HTML splash screen dismisses and the game is fully interactive.

### 2. **Gameplay Session Tracking (`game.gameplayStart` / `game.gameplayStop`)**
- `gameplayStart()` is triggered when entering active gameplay (**Auction Stage** or **Battle Arena**).
- `gameplayStop()` is triggered whenever gameplay pauses or stops (**Lobby**, **How to Play**, or **Match Results**).

### 3. **Midgame Video Ads with Mandatory Audio Muting**
- CrazyGames requires games to mute all sound while ads play.
- Between the **Auction Stage** and **Battle Arena** (during `AUCTION_TRANSITION`), the game triggers `crazyGamesService.requestMidgameAd()`.
- The procedural audio synthesizer (`SoundManager`) is automatically muted before the ad starts and restored to the player's previous sound setting as soon as the ad completes.
- In standard browsers, this ad request resolves immediately with **zero delay**.

### 4. **Celebration Fanfare (`game.happytime`)**
- When a player wins the tournament championship (`GAME_COMPLETED`), the game fires `crazyGamesService.happytime()`, triggering festive celebratory confetti on the CrazyGames portal!

### 5. **CrazyGames User Profile Auto-Sync**
- If a player is signed into their CrazyGames account, the game retrieves their username via `window.CrazyGames.SDK.user.getUser()` and pre-fills their player name in the lobby and rooms.

### 6. **Responsive Iframe Scaling & PWA Optimization**
- Inside the CrazyGames iframe, the layout dynamically fits 100% width and height without double scrollbars.
- PWA install banners are automatically hidden inside CrazyGames to maintain an unbranded web experience.

---

## 🚀 How to Build & Upload to CrazyGames

### Step 1: Set Your Backend Server URL (Optional / Production)
When hosted statically on CrazyGames, the frontend client connects to your multiplayer backend. You can provide your backend URL in any of these ways:

1. **Build Environment Variable**:
   ```bash
   # In client/.env or build command
   VITE_SERVER_URL=https://your-backend-server.onrender.com
   ```
2. **Query Parameter**:
   ```
   https://your-crazygames-embed-url/?server=https://your-backend-server.onrender.com
   ```
3. **Runtime Config in `client/index.html`**:
   ```html
   <script>
     window.__MAB_SERVER_URL__ = 'https://your-backend-server.onrender.com';
   </script>
   ```

### Step 2: Build the Client
From the repository root or `client` folder:
```bash
cd client
npm run build
```
This outputs the optimized production bundle to `client/dist`.

### Step 3: Create the Upload Archive (.zip)
Compress the **contents** of `client/dist` into a `.zip` file:
- On Windows (PowerShell):
  ```powershell
  Compress-Archive -Path client\dist\* -DestinationPath battle-auction-crazygames.zip -Force
  ```
- Or simply open `client/dist`, select all files (`index.html`, `assets/`, etc.), and click **Send to → Compressed (zipped) folder**.

### Step 4: Test in CrazyGames QA Tool
1. Go to the [CrazyGames Developer Portal](https://developer.crazygames.com/).
2. Use the **CrazyGames Preview & QA Tool** to test `battle-auction-crazygames.zip`.
3. Verify:
   - Loading bar completes and game loads.
   - Ads display correctly and audio mutes.
   - Gameplay starts and stops trigger cleanly in the SDK console.

### Step 5: Submit for Publishing
Submit the zip file in your CrazyGames dashboard.
