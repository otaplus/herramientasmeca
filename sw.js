// Service Worker for Mecanizado Fácil
const CACHE_NAME = 'mecanizado-facil-industrial-v2';
const urlsToCache = [
  './',
  'index.html',
  'style.css',
  'manifest.json',
  // Files linked in index.html
  'engranajes_avanzada.html',
  'calculadora_cientifica.html',
  'avances_fresadora.html',
  'codigo_g76_fanuc.html',
  'coordenadas_agujeros.html',
  'desarrollo_cilindros_conos.html',
  'inclinacion_conicidad.html',
  'peso_materiales.html',
  'tolerancias_iso.html',
  'calculadora_triangulos.html',
  'cabezal_divisor.html',
  'consejos_principiantes.html',
  'consultor_roscas.html',
  'conversiones_tecnicas.html',
  'codigo_g71_torno.html',
  'Glosario.html',
  'calculadora_chaveteros.html',
  'inclinacion_cabezal.html',
  'suite_integral.html',
  'renuncia_responsabilidad.html',
  'seguridad_talleres.html',
  'test_seguridad.html',
  // 'ventas.html',
  // Icons
  'icons/icon-72x72.png',
  'icons/icon-96x96.png',
  'icons/icon-128x128.png',
  'icons/icon-144x144.png',
  'icons/icon-152x152.png',
  'icons/icon-192x192.png',
  'icons/icon-384x384.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
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