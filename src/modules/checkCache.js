export async function checkCache () {
    const cache = await caches.open('my-cache');
    const response = await cache.match(request);

}