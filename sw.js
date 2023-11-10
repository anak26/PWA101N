// asignar nombre 
const CACHE_NAME='v1_cache_pwa';

// ficheros que se van a guardar en la aplicacion pwa
// varlos off line

var urlsToCache=[
    './',
    './css/style.css',
    '.img/about.jpg',
    '.img/about16.jpg',
    '.img/about32.jpg',
    '.img/about64.jpg',
    '.img/about96.jpg',
    '.img/about128.jpg',
    '.img/about192.jpg',
    '.img/about256.jpg',
    '.img/about384.jpg',
    '.img/about512.jpg',
    '.img/about1024.jpg',
    '.img/carousel-1.jpg',
    '.img/carousel-1-16.jpg',
    '.img/carousel-1-32.jpg',
    '.img/carousel-1-64.jpg',
    '.img/carousel-1-96.jpg',
    '.img/carousel-1-128.jpg',
    '.img/carousel-1-192.jpg',
    '.img/carousel-1-256.jpg',
    '.img/carousel-1-384.jpg',
    '.img/carousel-1-512.jpg',
    '.img/carousel-1-1024.jpg',
    '.img/carousel-2.jpg',
    '.img/carousel-2-16.jpg',
    '.img/carousel-2-32.jpg',
    '.img/carousel-2-64.jpg',
    '.img/carousel-2-96.jpg',
    '.img/carousel-2-128.jpg',
    '.img/carousel-2-192.jpg',
    '.img/carousel-2-256.jpg',
    '.img/carousel-2-384.jpg',
    '.img/carousel-2-512.jpg',
    '.img/carousel-2-1024.jpg',
    '.img/cucurucho-de-helado.png',
    '.img/cucurucho-de-helado16.png',
    '.img/cucurucho-de-helado32.png',
    '.img/cucurucho-de-helado64.png',
    '.img/cucurucho-de-helado96.png',
    '.img/cucurucho-de-helado128.png',
    '.img/cucurucho-de-helado192.png',
    '.img/cucurucho-de-helado256.png',
    '.img/cucurucho-de-helado384.png',
    '.img/cucurucho-de-helado512.png',
    '.img/cucurucho-de-helado1024.png', 
    './js/main.js',
];

self.addEventListener
('install',e=>
    e.waitUntil
    (
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache)
            .then(() => {
                self.skipWaiting();
            })

            .catch(err =>
                {
                    console.log('No se registro el cache',err);
                })
        })
    )
)

self.addEventListener('activate', e=>{
    const cacheWiteList=[CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheNames=>{
                    if(cacheWiteList.indexOf(cacheNames)===-1){
                        return caches.delete(cacheNames);
                    }
                })
            );
        })
        .then(()=>{self.clients.claim();})
    );
});

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});