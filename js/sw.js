self.addEventListener('message', async (evt) => {
  console.log('message', evt);
  console.log(self);
  console.log(self.navigator);
  // evt.sourse.postMessage(self.navigator.userAgent);
});

self.addEventListener('install', evt => evt.waitUntil(self.skipWaiting()))
self.addEventListener('activate', evt => evt.waitUntil(self.clients.claim()))
