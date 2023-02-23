import { url } from "./url";

export async function fetchCards() {
  const fetchUrl = url;
  try {
    let res = await fetch(fetchUrl);
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`failed to fetch data : ${error}`);
  }
}
