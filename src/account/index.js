import { getCurrentUser } from "../modules/currentUser.js";
import { logOut } from "../modules/logout";
import { checkCache } from "../modules/checkCache.js";
import { Card } from "../modules/card.js";

const welcome = document.getElementById("welcome");
const signOut = document.getElementById("sign-out");
const creditButton = document.getElementById("credit-button");
const credits = document.getElementById("credit");
const addCards = document.getElementById("add-cards");
const album = document.getElementById("album");
const currentUser = getCurrentUser();

let userObject = JSON.parse(localStorage.getItem(currentUser));

window.onload = function checkUser() {
  if (currentUser == null) {
    redirect();
  } else {
    welcome.innerHTML = `Welcome back ${currentUser}!`;
    updateCredits();
    displayAlbum();
  }
};

function updateCredits() {
  credits.innerHTML = userObject.credits.toString();
}

signOut.addEventListener("click", () => {
  logOut();
});

function redirect() {
  window.location.href = "../login/index.html";
}

creditButton.addEventListener("click", () => {
  userObject.credits += 1;
  localStorage.setItem(currentUser, JSON.stringify(userObject));
  credits.innerHTML = userObject.credits.toString();
});

addCards.addEventListener("click", () => {
  if (userObject.credits > 0) {
    userObject.credits -= 1;
    updateCredits();
    updateUser();
    getNewDeck();
  } else {
    alert("You don't have enough credits!");
  }
});

async function getNewDeck() {
  const data = await checkCache();
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * 20);
    const result = data.data.results[index];
    let card = new Card(result, album);
    card.createCard();
    const newSticker = card.getCard();
    userObject.stickers.push(newSticker);
    updateUser();
  }
}

async function displayAlbum() {
  if (userObject.stickers.length > 0) {
    for (let i = 0; i < userObject.stickers.length; i++) {
      console.log(userObject.stickers[i]);
      const card = new Card(userObject.stickers[i], album);
      card.createCard();
    }
  } else {
    ("you dont have any stickers yet!");
  }
}

function updateUser() {
  localStorage.setItem(currentUser, JSON.stringify(userObject));
}
