import { fetchCards } from "./fetchCards.js";

export async function checkCache(url) {
  try {



   /*  The caches.open() method first checks if a cache with that name already exists. If it doesn’t, it creates it and returns a Promise that resolves with the Cache object. */
    const cache = await caches.open("my-cache");
    const request = new Request(url);
    const data = await cache.match(url);
    if (data) {
      const responseData = await data.json();
      return responseData;
    } else {
      cache.add(request);
      return await fetchCards(url);
    }
  } catch (error) {
    "there was an error", error;
  }
}
