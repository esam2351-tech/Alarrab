// Service worker for بيت البن.
// Its main job is to force every page load (especially the installed app icon)
// to fetch a FRESH copy from the network instead of relying on the browser's
// HTTP cache — this is what fixes "I have to delete and reinstall the app to
// see my updates". It still doesn't do offline caching: the app needs internet
// anyway to talk to Firebase.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });

self.addEventListener('fetch', (e) => {
  // Only handle simple GET requests; let everything else (Firestore, fonts, etc.) pass through untouched.
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => {
      return new Response(
        'تعذر تحميل التطبيق - تأكد من اتصال الإنترنت وحاول تاني.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    })
  );
});
