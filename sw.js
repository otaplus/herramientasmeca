// sw.js
const CACHE_NAME = 'mecanizado-facil-gh-cache-v1';
const urlsToCache = [
  './',
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
  // Añade aquí otros archivos CSS, JS, imágenes si los tienes
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto y archivos principales cacheados');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Fallo al cachear durante la instalación:', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Servir desde caché si está disponible
        }
        // Si no está en caché, ir a la red
        return fetch(event.request).then(
          networkResponse => {
            // Opcional: Cachear la nueva respuesta si es una petición GET exitosa
            // if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            //   const responseToCache = networkResponse.clone();
            //   caches.open(CACHE_NAME)
            //     .then(cache => {
            //       cache.put(event.request, responseToCache);
            //     });
            // }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Fetch fallido; ni caché ni red disponibles:', error);
          // Podrías devolver una página offline por defecto aquí si la tienes cacheada
          // return caches.match('./offline.html');
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Solo el caché actual debe permanecer
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Tomar control inmediato de las páginas abiertas
});

// Listener para mensajes desde la página (cliente)
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'clearCache') {
    console.log('Service Worker: Recibida orden para borrar caché.');
    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => {
          console.log('Service Worker: Caché', CACHE_NAME, 'borrado exitosamente.');
          // Enviar mensaje de confirmación a todos los clientes controlados
          self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ action: 'cacheCleared' }));
          });
        })
        .catch(error => {
          console.error('Service Worker: Error al borrar el caché', CACHE_NAME, error);
          self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ action: 'clearCacheFailed' }));
          });
        })
    );
  }
});
