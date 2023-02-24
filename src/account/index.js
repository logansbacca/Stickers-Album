import { getCurrentUser } from "../modules/currentUser.js";
import { logOut } from "../modules/logout";
import { Card } from "../modules/card.js";
import {checkCache} from "../modules/checkCache.js";
import {urlCharacter}  from "../modules/urlCharacter.js";
import { urlCharacters } from "../modules/urlCharacters.js";


const signOut = document.getElementById("sign-out");
const albumName = document.getElementById("album-name");
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
    albumName.innerText = `${userObject.username.toUpperCase()}'S ALBUM`;
    updateCredits();
    displayAlbum();
  }
};

function updateCredits() {
  credits.innerText = `CREDITS : ${userObject.credits.toString()}`;
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
  updateCredits();
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
  for (let i = 0; i < 5; i++) {
    const data = await checkCache(urlCharacters);
    const index = Math.floor(Math.random() * 100);
    const result = data.data.results[index];
    const image = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    let card = new Card(result, album, image);
    const newSticker = card.getCard();
    if (
      newSticker.description == "" ||
      newSticker.image.includes("image_not_available")
    ) {
      i--;
    } else {
      card.createCard();
      userObject.stickers.push(newSticker);
      updateUser();
      console.log(userObject.stickers)
    }
  }
}

async function displayAlbum() {
  if (userObject.stickers.length > 0) {
    for (let i = 0; i < userObject.stickers.length; i++) {
      const image = userObject.stickers[i].image;
      console.log(userObject.stickers[i]);
      const card = new Card(userObject.stickers[i], album, image);
      card.createCard();
    }
  } else {
    setFirstCard();
  }
}

function updateUser() {
  localStorage.setItem(currentUser, JSON.stringify(userObject));
}

/* function clearSticker() {
  userObject.stickers = [];
  localStorage.setItem(currentUser, JSON.stringify(userObject));
  updateUser();
} */

async function setFirstCard(){
  const data = await checkCache(urlCharacter);
  const result = data.data.results[0];
  const image = `${result.thumbnail.path}.${result.thumbnail.extension}`
  const card = new Card(result, album, image);
  card.createCard();
  card.getCard();
  userObject.stickers.push(card);
  updateUser();
  localStorage.getItem(currentUser.stickers);

}

setFirstCard();