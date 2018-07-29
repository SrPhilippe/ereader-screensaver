self.addEventListener('install', event => {
    event.waitUntil(caches.open('eScreensaver').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/dist/style.css',
            '/js/main.js',
            '/manifest.json'
        ])
    }))
})