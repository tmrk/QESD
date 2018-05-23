var cacheName = 'qse-cache';
var urlsToCache = [
  'folkets_en_sv_public.xdxf',
  'index.html',
  'main.js',
  'offline.js',
  'sax.min.js',
  'style.css',
  'xml-js.min.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        }).then(function(cache) {
            console.log('Files added to cache: ' + urlsToCache.join(', '))
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            console.log('Fetching');
            console.log(response);
            return response || fetch(event.request);
        })
    );
});
