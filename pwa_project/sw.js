var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    './',
    './index.html',
    './index.js'
];
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request)
                    .then(function (response) {
                        return caches.open(urlsToCache)
                            .then(function (cache) {
                                cache.put(event.request, response.clone());
                                return response;
                            })
                            .catch(function () {

                                return caches.match('./index.html');
                            });
                    });
            })
    );
});
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});
