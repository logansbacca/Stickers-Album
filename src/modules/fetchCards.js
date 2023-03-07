export async function fetchCards(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    data;
    return data;
  } catch (error) {
    `failed to fetch data : ${error}`;
  }
}
