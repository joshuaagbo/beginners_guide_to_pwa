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
  '/index.js',
  '/js/ui.js',
  '/js/main.js',
  '/pages/about.html',
  '/pages/contact.html',
  '/styles/main.css',
  '/manifest.json',
  '/statics/android-chrome-192x192.png',
  '/statics/favicon.ico',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  ' https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'
];
// installation event
self.addEventListener('install', evnt => {
  // installation msg
  // console.log('serviceWorker installed successfully...');
  // implement caches
  evnt.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        cache.addAll(assets);
      })
      .catch(err => console.log('Error: ', err))
  );
});

// activation event
self.addEventListener('activate', evnt => {
  // activation message
  // console.log('serviceWorker activated successfully...');
});

// fetch event
self.addEventListener('fetch', evnt => {
  // console.log('Fetch fired....!', evnt)
  evnt.respondWith(
    caches
      .match(evnt.request)
      .then(cachres => cachres || fetch(evnt.request))
      .catch(err => console.log('error: ', err))
  );
});
