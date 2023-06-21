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
  userCardName: null,
  marketCard: null,
  proposalReceiver: null,
  marketCardName: null,
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

      if (cardOwner.userID == currentUser) {
        userCardsContainer.appendChild(cardContainer);
      } else {
        marketCardsContainer.appendChild(cardContainer);
      }

      cardContainer.addEventListener("click", function () {
        if (cardOwner.username === currentUserName) {
          if (selectedUserCard === null && card.status != "exchanging") {
            newTrade.userCard = card.identification;
            newTrade.proposalMaker = key;
            newTrade.userCardName = card.name;
            card.status = "exchanging";
          } else {
            selectedUserCard = null;
            newTrade = {
              proposalMaker: null,
              userCard: null,
              marketCard: null,
              proposalReceiver: null,
              marketCardName: null,
            };
          }
        } else if (
          card.status != "exchanging" &&
          newTrade.userCard != null &&
          newTrade.proposalMaker != null
        ) {
          newTrade.marketCard = card.identification;
          newTrade.marketCardName = card.name;
          newTrade.proposalReceiver = key;
          card.status = "exchanging";
          trades[statusID] = { trading: newTrade };
          localStorage.setItem("trades", JSON.stringify(trades));
          localStorage.setItem("exchangedCards", JSON.stringify(data));
          selectedUserCard = null;
          location.reload();
        }
      });

      let currentCardOwner = "";
      let proposedCard = "";
      for (const tradeKey in trades) {
        if (trades.hasOwnProperty(tradeKey)) {
          const trade = trades[tradeKey];
          const tradingArray = trade.trading;
          if (tradingArray.marketCard == card.identification) {
            currentCardOwner = tradingArray.proposalReceiver;
            proposedCard = tradingArray.userCardName;
          }
        }
      }

      if (currentCardOwner == currentUser) {
        if (card.status === "exchanging") {
          let offer = document.createElement("p");
          offer.textContent = "TRADE FOR: " + proposedCard;
          offer.style.color = "red";

          cardContainer.appendChild(offer);
          let acceptButton = document.createElement("button");
          acceptButton.textContent = "Accept";
          cardContainer.appendChild(acceptButton);

          let refuseButton = document.createElement("button");
          refuseButton.textContent = "Refuse";
          cardContainer.appendChild(refuseButton);

          refuseButton.addEventListener("click", function () {
            let currentProposalMaker = null;
            let proposedCard = null;
            let targetKey = null;

            Object.keys(trades).forEach((key) => {
              if (trades[key].trading.marketCard == card.identification) {
                currentProposalMaker = trades[key].trading.proposalMaker;
                proposedCard = trades[key].trading.userCard;
                targetKey = key;
              }
            });

            const test = data[currentProposalMaker].exchangedCards.findIndex(
              (obj) => obj.identification === proposedCard
            );

            data[currentProposalMaker].exchangedCards[test].status = "default";

            card.status = "default";
            localStorage.setItem("exchangedCards", JSON.stringify(data));
           
          
            delete trades[targetKey];
           
            localStorage.setItem("trades", JSON.stringify(trades)); 
            location.reload(); 
          });
        }
      }
    }
  }
});
