import { logOut } from "../modules/logout";
import { fetchCards } from "../modules/fetchCards.js";
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

window.onload = () => {
  fetchCards().then((data) => {
    console.log(data)
    card1.style.backgroundImage = `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`;
  });
};
