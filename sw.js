const CACHE_NAME = 'ujian-offline-v1';

// Daftar file web yang akan di-download ke HP siswa untuk mode offline
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Saat aplikasi pertama kali dibuka (Install Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Mengambil file dari Cache saat Offline
self.addEventListener('fetch', event => {
  // Biarkan Firebase mengurus permintaannya sendiri ke database
  if (event.request.url.includes('firestore.googleapis.com') || event.request.url.includes('securetoken.googleapis.com')) {
      return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache (offline), gunakan cache. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});