// Basic Service Worker for caching static assets

const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
  '/',             // Home
  '/favicon.ico',  // Favicon
];

// Install event: cache the listed files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  console.log('[ServiceWorker] Installed and cached initial resources.');
});

// Fetch event: serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve cached version if available, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  console.log('[ServiceWorker] Activated and cleaned old caches.');
});
