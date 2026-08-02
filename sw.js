// Minimal service worker.
// Its only job is to exist, so Chrome/Android considers this page installable.
// It doesn't cache anything or work offline - data still needs the internet (Firebase).
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => { /* pass-through, no caching */ });
