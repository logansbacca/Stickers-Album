import { getCurrentUser } from "../modules/currentUser.js";
import { createUniqueID } from "../modules/createUniqueID.js";

let currentUser = getCurrentUser();
let user = JSON.parse(localStorage.getItem(currentUser));
let currentUserName = user.username;

const statusID = createUniqueID();
let exchangedCards = localStorage.getItem("exchangedCards");
let data = JSON.parse(exchangedCards);
let userCardsContainer = document.getElementById("userCards");
let marketCardsContainer = document.getElementById("marketCards");

let selectedUserCard = null;

let trade = localStorage.getItem("trades");
let trades = trade ? JSON.parse(trade) : {};

let newTrade = {
  proposalMaker: null,
  userCard: null,
  marketCard: null,
  proposalReceiver: null,
};

Object.keys(data).forEach((key) => {
  let user = data[key];
  let cards = user.exchangedCards;
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card && card.name && card.image) {
      let cardOwner = JSON.parse(localStorage.getItem(key));
      let cardContainer = document.createElement("div");

      cardContainer.classList.add("card");

      let keyElement = document.createElement("p");
      keyElement.textContent = "Owner: " + cardOwner.username;
      cardContainer.appendChild(keyElement);

      let imageElement = document.createElement("img");
      if (card.status == "exchanging") {
        imageElement.style.opacity = "50%";
      }
      imageElement.src = card.image;
      cardContainer.appendChild(imageElement);

      let nameElement = document.createElement("p");
      nameElement.textContent = "Name: " + card.name;
      cardContainer.appendChild(nameElement);

      cardContainer.addEventListener("click", function () {
       
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
              proposalReceiver: null,
            };
          }
        } else if (
          card.status != "exchanging" &&
          newTrade.userCard != null &&
          newTrade.proposalMaker != null
        ) {
          newTrade.marketCard = card.identification;
          newTrade.proposalReceiver = cardOwner.username;
          card.status = "exchanging";
          trades[statusID] = { trading: newTrade };
          localStorage.setItem("trades", JSON.stringify(trades));
          localStorage.setItem("exchangedCards", JSON.stringify(data));
          selectedUserCard = null;
          location.reload();
        }
      });

      if (cardOwner.username === currentUserName) {
        if (card.status === "exchanging") {
          let acceptButton = document.createElement("button");
          acceptButton.textContent = "Accept";
          cardContainer.appendChild(acceptButton);

          let refuseButton = document.createElement("button");
          refuseButton.textContent = "Refuse";
          cardContainer.appendChild(refuseButton);

      /*     acceptButton.addEventListener("click", function () {
            let currentUserStickers = JSON.parse(
              localStorage.getItem(currentUserName)
            );
            currentUserStickers.push(card);
            localStorage.setItem(
              currentUserName,
              JSON.stringify(currentUserStickers)
            );
            delete data[key].exchangedCards[i];
            location.reload();
          }); */

          // must add the other person to also change the card status
          refuseButton.addEventListener("click", function () {
            delete trades[statusID];
            localStorage.setItem("trades", JSON.stringify(trades));
            card.status = "default";
            localStorage.setItem("exchangedCards", JSON.stringify(data));
            location.reload();
          });
        }
        userCardsContainer.appendChild(cardContainer);
      } else {
        marketCardsContainer.appendChild(cardContainer);
      }
    }
  }
});
