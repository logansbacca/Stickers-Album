export async function fetchCards() {
  const hash = "02e073f6adf82ccac85e3345759bb8d0";
  const ts = "1";
  const apiKey = "e01d3bd89456ed75be357df6ef25b30f";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(`failed to fetch data : ${error}`);
  }
}
