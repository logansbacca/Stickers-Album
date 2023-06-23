export async function fetchCards(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    `failed to fetch data : ${error}`;
  }
}
