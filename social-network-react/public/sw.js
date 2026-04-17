const CACHE_NAME = 'happytalk-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/happytalk.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // ⚠️ Dev mode bypass: never intercept Vite's internal dev server requests.
    // These paths only exist in development and must reach the Vite server directly.
    const isViteInternal = (
        url.pathname.startsWith('/@vite') ||
        url.pathname.startsWith('/@react-refresh') ||
        url.pathname.startsWith('/src/') ||
        url.pathname.startsWith('/node_modules/') ||
        url.pathname.includes('?t=') // Vite HMR timestamp queries
    );

    if (isViteInternal || url.hostname !== self.location.hostname) {
        // Let it go straight to the network — no caching, no fallback
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    // Only apply 408 fallback for non-critical requests
                    return new Response('Network error occurred', {
                        status: 408,
                        statusText: 'Network error occurred'
                    });
                });
            })
    );
});
