import { getCurrentUser } from "../modules/currentUser.js";
import { logOut } from "../modules/logout";
import { fetchCards } from "../modules/fetchCards.js";

const welcome = document.getElementById("welcome");
const signOut = document.getElementById("sign-out");
const creditButton = document.getElementById("credit-button");
const credits = document.getElementById("credit");
const addCards = document.getElementById("add-cards");
const currentUser = getCurrentUser();

let userString = JSON.parse(localStorage.getItem(currentUser));

window.onload = function checkUser() {
  if (currentUser == null) {
    redirect();
  } else {
    welcome.innerHTML = `Welcome back ${currentUser}!`;
    updateCredits();
  }
};

function updateCredits() {
  credits.innerHTML = userString.credits.toString();
}

signOut.addEventListener("click", () => {
  logOut();
});

function redirect() {
  window.location.href = "../login/index.html";
}

creditButton.addEventListener("click", () => {
  userString.credits += 1;
  localStorage.setItem(currentUser, JSON.stringify(userString));
  credits.innerHTML = userString.credits.toString();
});

addCards.addEventListener("click", () => {
  if (userString.credits > 0) {
    userString.credits -= 1;
    updateCredits();
    localStorage.setItem(currentUser, JSON.stringify(userString));
    let cards = fetchCards();
    console.log(cards);
  } else {
    alert("You don't have enough credits!");
  }
});
