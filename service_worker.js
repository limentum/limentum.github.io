// Define the name of the current cache
var APP_PREFIX = 'LmntnPrjcts_';
var VERSION = 'v_03';
var SITE_CACHE = APP_PREFIX + VERSION;
var URLS = [
  '/index.html',
  '/assets/css/style.min.css',
  '/assets/css/chapter.min.css',
  '/vestige/index.html',
  '/minecraft.html',
  '/assets/images/logo.webp',
  '/assets/images/logo512.png',
  '/assets/images/favicon.ico',
  '/assets/images/sun.svg',
  '/assets/js/async.js',
  '/assets/js/script.js'
];

// The install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    fetch('/vestige.json')
      .then(response => response.json())
      .then(data => {
        URLS = URLS.concat(data);
        return caches.open(SITE_CACHE)
          .then(function(cache) {
            return cache.addAll(URLS);
          });
      })
  );
});

// The fetch event
self.addEventListener('fetch', function(event) { // Fetch event
  event.respondWith( // Respond with
    caches.open(SITE_CACHE).then(function(cache) { // Open the cache
      return cache.match(event.request).then(function(response) { // Match the request with the cache content
        if (response) {
          return response; // Return the cached response
        }
        var fetchPromise = fetch(event.request).then(function(networkResponse) { // Fetch the request from the network and store it in a variable to cache
          cache.put(event.request, networkResponse.clone()); // Put the request in the cache
          return networkResponse; // Return the network response
        })
        return fetchPromise; // Return the network response if there's no cached response
      })
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