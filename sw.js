// Service Worker for Mecanizado Fácil
const CACHE_NAME = 'mecanizado-facil-industrial-v2';
const urlsToCache = [
  './',
  'index.html',
  'style.css',
  'manifest.json',
  // Files linked in index.html
  'Calculadora Avanzada de Engranajes.html',
  'Calculadora de Avances Para Freasadoras - Mecanizado Fácil.html',
  'Calculadora de Código G G76 (Fanuc) y Guía.html',
  'Calculadora de Cuerdas y Coordenadas de Agujeros.html',
  'Calculadora de Desarrollo de Cilindros y Conos.html',
  'Calculadora de Inclinación y Conicidad.html',
  'Calculadora de Peso de Materiales.html',
  'Calculadora de Tolerancias ISO - Mecanizado Fácil.html',
  'Calculadora de Triángulos.html',
  'Calculadora para Cabezal Divisor.html',
  'Consejos para Principiantes en Mecanizado - Mecanizado Fácil.html',
  'Consultor de Roscas para Taller.html',
  'Conversiones Técnicas para Talleres Mecánicos.html',
  'Generador de Código G71 y Guía para Torno CNC.html',
  'Glosario.html',
  'Mecanizado Fácil - Calculadora de Chaveteros.html',
  'Mecanizado Fácil - Calculadora de Inclinación de Cabezal.html',
  'Mecanizado Fácil - Suite Integral para Talleres Mecánicos.html',
  'Renuncia de Responsabilidad - Mecanizado Fácil.html',
  'Seguridad en Talleres de Mecanizado - Mecanizado Fácil.html',
  'Test de Seguridad en Mecanizado.html',
  'ventas.html',
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