import { getCurrentUser } from "../modules/currentUser.js";
import {createUniqueID} from "../modules/createUniqueID.js"
let currentUser = getCurrentUser();

let user = JSON.parse(localStorage.getItem(currentUser));

let currentUserName = user.username;

let exchangedCards = localStorage.getItem("exchangedCards");
let data = JSON.parse(exchangedCards);
let userCardsContainer = document.getElementById("userCards");
let marketCardsContainer = document.getElementById("marketCards");



let selectedUserCard = null;

let trade = localStorage.getItem("trades")
let trades =  trade ? JSON.parse(trade) : {};

let newTrade = {
  proposalMaker: null,
  userCard: null,
  marketCard: null,
  proposalReciever: null,
}


Object.keys(data).forEach((key) => {

  let user = data[key];
  let cards = user.exchangedCards;
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card && card.name && card.image ) {
      let cardOwner = JSON.parse(localStorage.getItem(key));
      let cardContainer = document.createElement("div");
      if (card.status == "exchanging") {
        cardContainer.style.opacity = "50%";
      }


      cardContainer.classList.add("card");

      let keyElement = document.createElement("p");
      keyElement.textContent = "Owner: " + cardOwner.username;
      cardContainer.appendChild(keyElement);

      let imageElement = document.createElement("img");
      imageElement.src = card.image;
      cardContainer.appendChild(imageElement);

      let nameElement = document.createElement("p");
      nameElement.textContent = "Name: " + card.name;
      cardContainer.appendChild(nameElement);

   
      cardContainer.addEventListener("click", function () {
      console.log(card.status)
        if (cardOwner.username === currentUserName) {
          if (selectedUserCard === null && card.status != "exchanging") {
            newTrade.userCard = card.identification;
            newTrade.proposalMaker = cardOwner.username;
            card.status = "exchanging";
          } else {
            selectedUserCard = null;
            newTrade = {
            proposalMaker: null,
            userCard: null,
            marketCard: null,
            proposalReciever: null,
            };
          }
        } else if (card.status != "exchanging" && newTrade.userCard != null && 
          newTrade.proposalMaker != null) {
          newTrade.marketCard = card.identification;
          newTrade.proposalReciever = cardOwner.username;
          card.status = "exchanging";
          let statusID = createUniqueID();
          trades[statusID] = {trading : newTrade};
          localStorage.setItem("trades", JSON.stringify(trades));
          localStorage.setItem("exchangedCards", JSON.stringify(data));
          selectedUserCard = null;
          location.reload();
        }
      });

      if (cardOwner.username === currentUserName) {
        userCardsContainer.appendChild(cardContainer);
      } else {
        marketCardsContainer.appendChild(cardContainer);
      }
    }
  }
});


