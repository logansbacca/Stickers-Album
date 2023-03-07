import { fetchCards } from "./fetchCards.js";

export async function checkCache(url) {
  try {
    const cache = await caches.open("my-cache");
    const request = new Request(url);
    const data = await cache.match(url);
    if (data) {
      const responseData = await data.json();
      responseData;
      return responseData;
    } else {
      cache.add(request);
      return await fetchCards(url);
    }
  } catch (error) {
    "there was an error", error;
  }
}
