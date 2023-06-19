import { getCurrentUser } from "../modules/currentUser.js";
var currentUser = getCurrentUser();

var exchangedCards = localStorage.getItem("exchangedCards");
var data = JSON.parse(exchangedCards);

var userCardsContainer = document.getElementById("userCards");
var marketCardsContainer = document.getElementById("marketCards");

Object.keys(data).forEach((key) => {
  let user = data[key];
  let cards = user.exchangedCards;
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card && card.name && card.image) {
      let cardContainer = document.createElement("div");
      cardContainer.classList.add("card");

      let keyElement = document.createElement("p");
      keyElement.textContent = "Owner: " + key;
      cardContainer.appendChild(keyElement);

      let imageElement = document.createElement("img");
      imageElement.src = card.image;
      cardContainer.appendChild(imageElement);

      let nameElement = document.createElement("p");
      nameElement.textContent = "Name: " + card.name;
      cardContainer.appendChild(nameElement);

      if (key === currentUser) {
        userCardsContainer.appendChild(cardContainer);
      } else {
        marketCardsContainer.appendChild(cardContainer);
      }
    }
  }
});
