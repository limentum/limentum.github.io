// Define the name of the current cache
var APP_PREFIX = 'LmntnPrjcts_';
var VERSION = 'v_01';
var SITE_CACHE = APP_PREFIX + VERSION;
var URLS = [
    '/index.html',
    '/styles/style.css',
    '/styles/chapter.css',
    '/vestige/index.html',
    '/images/logo.jpg'
    ]

// The install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(SITE_CACHE)
      .then(function(cache) {
        return cache.addAll(URLS);
      })
  );
});

// The fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          // If the request is in the cache, return it
          return response;
        }
        // Otherwise, fetch the request from the network
        return fetch(event.request);
      })
  );
});

// The activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith(APP_PREFIX) && cacheName != SITE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});