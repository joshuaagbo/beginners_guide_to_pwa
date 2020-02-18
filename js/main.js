// validate SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => {
      return;
    })
    .catch(err => console.log('service worker not registered', err));
}
