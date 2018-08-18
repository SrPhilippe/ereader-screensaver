self.addEventListener('install', event => {
    event.waitUntil(caches.open('eScreensaver').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/dist/style.css',
            '/js/main.js',
            '/manifest.json',
            '/fonts/san-francisco-regular.ttf',
            '/images/'
        ])
    }))
})

self.addEventListener('fetch', event => {
    console.log(event.request.url)
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    )
})