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
    const series = data.data.results[index].series.items;
    const events = data.data.results[index].events.items;
    const comics = data.data.results[index].comics.items;
    let card = new Card(result, album, image, series, events, comics);
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
  ("displaying album");
  if (userObject.stickers.length > 0) {
    for (let i = 0; i < userObject.stickers.length; i++) {
      const image = userObject.stickers[i].image;
      const series = userObject.stickers[i].series;
      const events = userObject.stickers[i].events;
      const comics = userObject.stickers[i].comics;
      const card = new Card(
        userObject.stickers[i],
        album,
        image,
        series,
        events,
        comics
      );
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
  displayAlbum();
} */

async function setFirstCard() {
  ("setting first");
  const data = await checkCache(urlCharacter);
  const result = data.data.results[0];
  const image = `${result.thumbnail.path}.${result.thumbnail.extension}`;
  const series = data.data.results[0].series.items;
  const events = data.data.results[0].events.items;
  const comics = data.data.results[0].comics.items;
  const card = new Card(result, album, image, series, events, comics);
  card.createCard();
  const toStorage = card.getCard();
  userObject.stickers.push(toStorage);
  updateUser();
}

let isOpen = false;

album.addEventListener("click", (e) => {
  const clickedImage = e.target;
  clickedImage;
  if (clickedImage.tagName == "IMG" || clickedImage.tagName == "H1") {
    const parentDiv = clickedImage.parentNode;
    const myPara = parentDiv.getElementsByTagName("p")[0];
    const myImg = parentDiv.getElementsByTagName("IMG")[0];
    const description = parentDiv.querySelector("#description");
    const seriesList = parentDiv.querySelector("#seriesList");
    const seriesTitle = parentDiv.querySelector("#seriesTitle");
    const eventsList = parentDiv.querySelector("#eventsList");
    const eventsTitle = parentDiv.querySelector("#eventsTitle");
    const comicsTitle = parentDiv.querySelector("#comicsTitle");
    const comicsList = parentDiv.querySelector("#comicsList");
    seriesList;
    if (myPara.innerText.length == 0 || myPara.innerText == " ") {
      myPara.innerText = "No description available.";
    }
    if (seriesList.innerText.length == 0 || seriesList.innerText == " ") {
      seriesList.innerText = "No series available.";
    }
    if (eventsList.innerText.length == 0 || eventsList.innerText == " ") {
      eventsList.innerText = "No events available.";
    }
    if (comicsList.innerText.length == 0 || comicsList.innerText == " ") {
      comicsList.innerText = "No comics available.";
    }

    //why this one is better than regular display none
    if (getComputedStyle(myPara).display == "none" && !isOpen) {
      isOpen = true;
      enlargeDiv(
        myPara,
        myImg,
        parentDiv,
        description,
        seriesList,
        eventsList,
        comicsList,
        seriesTitle,
        eventsTitle,
        comicsTitle
      );
    } else if (getComputedStyle(myPara).display == "block" && isOpen) {
      isOpen = false;
      revertDiv(
        myPara,
        parentDiv,
        description,
        seriesList,
        eventsList,
        comicsList,
        seriesTitle,
        eventsTitle,
        comicsTitle
      );
    }
  }
});

function enlargeDiv(
  myPara,
  myImg,
  parentDiv,
  description,
  seriesList,
  eventsList,
  comicsList,
  seriesTitle,
  eventsTitle,
  comicsTitle
) {
  eventsList.style.display = "block";
  comicsList.style.display = "block";
  seriesList.style.display = "block";
  description.style.display = "block";
  seriesTitle.style.display = "block";
  eventsTitle.style.display = "block";
  comicsTitle.style.display = "block";
  myPara.style.display = "block";
  myImg.style.opacity = "1";
  myImg.addEventListener("mouseover", function() {
    myImg.style.border = "none";
  });
  parentDiv.style.height = "500px";
  parentDiv.style.overflowY = "scroll";
  parentDiv.style.width = "100%";
  parentDiv.style.border = "solid 0.2vh #009acd";
  parentDiv.style.borderRadius = "1vh";
}

function revertDiv(
  myPara,
  parentDiv,
  description,
  seriesList,
  eventsList,
  comicsList,
  seriesTitle,
  eventsTitle,
  comicsTitle
) {
  seriesList.style.display = "none";
  description.style.display = "none";
  eventsList.style.display = "none";
  comicsList.style.display = "none";
  seriesTitle.style.display = "none";
  eventsTitle.style.display = "none";
  comicsTitle.style.display = "none";
  myPara.style.display = "none";
  parentDiv.style.height = "400px";
  parentDiv.style.overflowY = "hidden";
  parentDiv.style.width = "400px";
  parentDiv.style.background = "black";
  parentDiv.style.border = "none";
  myImg.addEventListener("mouseover", function() {
    myImg.style.border = "solid white 4px";
  });
}
