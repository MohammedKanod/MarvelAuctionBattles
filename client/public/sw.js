/**
 * Marvel Battle Auction — PWA Service Worker
 * Designed specifically for Real-Time Multiplayer & Authoritative State Synchronization
 */

const CACHE_NAME = 'mba-static-v1.0.0';

// Essential static shell to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-192x192-maskable.png',
  '/icons/icon-512x512-maskable.png',
  '/icons/icon.svg'
];

// URLs that must NEVER be touched or cached by the Service Worker
function isDynamicOrRealtimeRequest(url) {
  return (
    url.includes('/socket.io/') ||
    url.includes('/api/') ||
    url.startsWith('ws:') ||
    url.startsWith('wss:') ||
    url.includes('chrome-extension:')
  );
}

// Check if request is for static hashed build assets (Vite chunks)
function isHashedStaticAsset(url) {
  return url.includes('/assets/') && /\.[a-f0-9]{8,}\.(js|css|png|jpg|svg|woff2)$/i.test(url);
}

// Check if request is for static game content (character portraits, fonts, icons)
function isStaticContent(url) {
  return (
    url.includes('/characters/') ||
    url.includes('/icons/') ||
    url.includes('fonts.googleapis.com') ||
    url.includes('fonts.gstatic.com')
  );
}

// Install Event — Precache essential app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // NOTE: Do NOT call self.skipWaiting() here automatically.
  // We wait for the client to send SKIP_WAITING to avoid disrupting live auctions/battles.
});

// Activate Event — Clean up stale previous versions and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Message Event — Controlled update activation triggered by user reload prompt
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Event — Tailored caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = request.url;

  // 1. Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // 2. Strict bypass for Socket.IO, WebSockets, APIs, and real-time multiplayer traffic
  if (isDynamicOrRealtimeRequest(url)) {
    return; // Let browser handle via native network stack
  }

  // 3. Navigation requests (Opening the app, reloading pages): Network-First
  // Guarantees latest Vercel deployment is always loaded when online, with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Fallback to cached shell when offline or network drops
          const cached = await caches.match('/index.html') || await caches.match('/');
          return cached || new Response('Offline - Reconnecting to Multiverse...', {
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  // 4. Hashed Static Bundles (/assets/*.js, /assets/*.css): Cache-First
  if (isHashedStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 5. Static Content (Images, Fonts, Icons): Stale-While-Revalidate
  if (isStaticContent(url)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 6. All other requests: Network-First with cache fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});
