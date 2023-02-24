

export async function fetchCards(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`failed to fetch data : ${error}`);
  }
}
