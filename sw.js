// Minimaler Service Worker: erfuellt Chromes Kriterium fuer ein echtes
// installierbares App-Icon (statt nur Lesezeichen), speichert aber
// absichtlich NICHTS zwischen, solange der Player noch aktiv weiterentwickelt
// wird — jede Anfrage geht immer direkt ans Netz.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
