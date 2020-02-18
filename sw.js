// various serviceWorker lifecycle
// BASIC LIFECYCLE EVENTS:
// 1. install event
// 2. activate event
// 3. fetch event

// implement caching
// CACHE NAME
const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/js/ui.js',
  '/js/main.js',
  '/pages/about.html',
  '/pages/contact.html',
  '/styles/main.css',
  '/manifest.json',
  '/statics/android-chrome-192x192.png',
  '/statics/favicon.ico',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
];
// installation event
self.addEventListener('install', evt => {
  // console.log('serviceWorker installed successfully...');
  // implement caches
  evt.waitUntil(
    // because cashing process is async, we need to pass it to the waitUntil() method of the evt Object
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
  console.log('Activated');
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then(cache => cache || fetch(evt.request))
      .catch(err => console.log('error: ', err))
  );
});
