// various serviceWorker lifecycle
// BASIC PWA LIFECYCLE METHODS:
// 1. install event
// 2. activate event
// 3. fetch event

// implement caching
// CACHE NAME
const staticCacheName = 'site-static';
const site_dynamic = 'site-dynamic-v1';
// assets to be cached
const assets = [
  '/',
  '/index.html',
  '/js/ui.js',
  '/js/main.js',
  '/styles/main.css',
  '/manifest.json',
  '/statics/android-chrome-192x192.png',
  '/statics/favicon.ico',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
];
// installation event
self.addEventListener('install', evt => {
  // install msg
  // console.log('serviceWorker installed successfully...');
  /* because cashing process is async, 
    we need to pass it to the waitUntil() func of the evt object,
    so it waits until the process is complete
    */
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        console.log('Caching shell files');
        cache.addAll(assets); //accept arr args (i.e files to cache)
        // unlike cache.add(); take one arg (i.e file to cache)
      })
      .catch(err => console.log('Error: ', err))
  );
});

// activation event
self.addEventListener('activate', evt => {
  // activation message
  // console.log('Activated');
  // deleting old cache
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        cache =>
          cache ||
          fetch(evt.request).then(fetchRes =>
            // create cache dynamically and store url as key and result as assets
            caches.open(site_dynamic).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            })
          )
      )
      .catch(err => console.log('error: ', err))
  );
});
