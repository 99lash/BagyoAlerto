const CACHE_NAME = "bagyoalerto-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/checklist.html",
  "/emergency.html",
  "/guide.html",
  "/styles/index.css",
  "/scripts/index.js",
  "/assets/img/apple-touch-icon.png"
];

// Install event → cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event → clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch event → serve from cache then network fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // fallback offline
        )
      );
    })
  );
});
