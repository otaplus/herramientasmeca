// c:\Users\isaac\Downloads\Mecanizado Facil - copia\sw.js
const CACHE_NAME = 'mecanizado-facil-gh-cache-v1'; // Cambiado para evitar conflictos si usas el mismo dominio
const urlsToCache = [
  './', // Representa el directorio raíz, usualmente sirve index.html
  'index.html',
  'metalesindustriales.html',
  'conversiones.html',
  'cilindrosyconos.html',
  'avances.html',
  'roscas.html',
  'pesos.html',
  'agujerosypcd.html',
  'cabezaldivisor.html',
  'tolerancias.html',
  'inclinacabezal.html',
  'engranajes.html',
  'chavetas.html',
  'triangulos.html',
  'calcientifica.html',
  'guiacnc.html',
  'codigog71.html',
  'g76roscado.html',
  'ciclotaladro.html',
  'perfiles.html',
  'editorcnc.html'
  // Si tuvieras CSS o JS en archivos separados, también deberías añadirlos aquí.
  // Por ejemplo: 'styles/main.css', 'scripts/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto y archivos principales cacheados');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request); // No se cachean nuevas peticiones en este ejemplo simplificado
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});