require('dotenv').config();
import { logOut } from "../modules/logout";
import { checkCache } from "../modules/checkCache";
import { urlCharacters } from "../modules/urlCharacters.js";

const signOut = document.getElementById("sign-out");
const join = document.getElementById("join");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");

signOut.addEventListener("click", () => {
  logOut();
});

join.addEventListener("click", () => {
  window.location.href = "../register/index.html";
});

window.onload = async () => {
  const data = await checkCache(urlCharacters);
  card1.style.backgroundImage = `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`;
  card2.style.backgroundImage = `url(${data.data.results[1].thumbnail.path}.${data.data.results[1].thumbnail.extension})`;
  card3.style.backgroundImage = `url(${data.data.results[6].thumbnail.path}.${data.data.results[6].thumbnail.extension})`;
};
