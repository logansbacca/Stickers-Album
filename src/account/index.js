import { getCurrentUser } from "../modules/currentUser.js";
import { logOut } from "../modules/logout";
import { Card } from "../modules/card.js";
import { checkCache } from "../modules/checkCache.js";
import { urlCharacter } from "../modules/urlCharacter.js";
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
  credits.style.color = "white";
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
    notEnoughCredits();
  }
});

function notEnoughCredits() {
  credits.style.color = "red";
  credits.style.animation = "none"; // reset the animation
  void credits.offsetWidth; // trigger reflow to restart the animation
  credits.style.animation = "horizontal-shaking 0.35s ";
}

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
      userObject.stickers;
    }
  }
}

async function displayAlbum() {
  if (userObject.stickers.length > 0) {
    for (let i = 0; i < userObject.stickers.length; i++) {
      const image = userObject.stickers[i].image;
      userObject.stickers[i];
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

async function setFirstCard() {
  const data = await checkCache(urlCharacter);
  const result = data.data.results[0];
  const image = `${result.thumbnail.path}.${result.thumbnail.extension}`;
  const card = new Card(result, album, image);
  card.createCard();
  const toStorage = card.getCard();
  userObject.stickers.push(toStorage);
  updateUser();
}

album.addEventListener("click", (e) => {
  const clickedImage = e.target;
  if (clickedImage.tagName == "IMG" || clickedImage.tagName == "H1") {
    const parentDiv = clickedImage.parentNode;
    const myPara = parentDiv.getElementsByTagName("p")[0];
    const myImg = parentDiv.getElementsByTagName("IMG")[0];
    myImg.style.opacity = "0.2";
    if (myPara.innerText.length == 0 || myPara.innerText == " ") {
      myPara.innerText = "No description available.";
    }
    if (myPara.style.display == "block") {
      myPara.style.display = "none";
      myImg.style.opacity = "1";
    } else {
      myPara.style.display = "block";
    }
  }
});
