const CACHE_NAME = "cache";
const STATIC_ASSETS = [
    "/",
    "./",
    "./index.html",
    "./css/style.css",
    "../css/style.css",
    "./js/index.js",
    "./assets/black/bishop.png",
    "./assets/black/king.png",
    "./assets/black/knight.png",
    "./assets/black/pawn.png",
    "./assets/black/queen.png",
    "./assets/black/rook.png",
    "./assets/white/bishop.png",
    "./assets/white/king.png",
    "./assets/white/knight.png",
    "./assets/white/queen.png",
    "./assets/white/pawn.png",
    "./assets/white/rook.png",
    "../favicon.ico"
]

async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    //fetches the files
    return cache.addAll(STATIC_ASSETS)
}

//installs the file when offline
self.addEventListener("install", event => {
    console.log("[SW] installed");
    event.waitUntil(preCache())
})

self.addEventListener("activate", event => {
    console.log("[SW] activated");
})

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

// fetches files from the stored cache
self.addEventListener("fetch", event => {
    console.log("[SW] fetched");
    event.respondWith(fetchAssets(event));
})