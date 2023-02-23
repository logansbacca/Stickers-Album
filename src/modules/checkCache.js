import { fetchCards } from "./fetchCards.js";
import { url } from "./url.js";

export async function checkCache() {
  try {
    const cache = await caches.open("my-cache");
    const request = new Request(url);
    const data = await cache.match(url);
    if (data) {
      const responseData = await data.json();
      console.log(responseData)
      return responseData;
    } else {
      cache.add(request);
      return await fetchCards();
    }
  } catch (error) {
    console.log("there was an error", error);
  }
}
