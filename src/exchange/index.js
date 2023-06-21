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
            newTrade.userCard = card.uniqueID;
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
          newTrade.marketCard = card.uniqueID;
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
          if (tradingArray.marketCard == card.uniqueID) {
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

          acceptButton.addEventListener("click", function (e) {
            e.stopPropagation();
            let newproposalMaker = null;
            let newproposedCard = null;
            let newmarketCard = null;
            let newproposalReceiver = null;
            let tradeKey = null;

            Object.keys(trades).forEach((key) => {
              if (trades[key].trading.marketCard == card.uniqueID) {
                newproposalMaker = trades[key].trading.proposalMaker;
                newproposedCard = trades[key].trading.userCard;
                newmarketCard = trades[key].trading.marketCard;
                newproposalReceiver = trades[key].trading.proposalReceiver;
                tradeKey = key;
              }
            });

            let pm = JSON.parse(localStorage.getItem(newproposalMaker));
            let pr = JSON.parse(localStorage.getItem(newproposalReceiver));
            let makerID = pm.userID;
            let recieverID = pr.userID;
            let offeredCardIndex = data[makerID].exchangedCards.findIndex(
              (card) => card.uniqueID === newproposedCard
            );
            let recievedCardIndex = data[recieverID].exchangedCards.findIndex(
              (card) => card.uniqueID === newmarketCard
            );
            let offeredCard = data[makerID].exchangedCards[offeredCardIndex];
            let recievedCard =
              data[recieverID].exchangedCards[recievedCardIndex];
            data[makerID].exchangedCards.splice(recievedCardIndex, 1);
            data[recieverID].exchangedCards.splice(offeredCardIndex, 1);
            localStorage.setItem("exchangedCards", JSON.stringify(data));
            let pmProfile = JSON.parse(localStorage.getItem(makerID));
            let prProfile = JSON.parse(localStorage.getItem(recieverID));
            pmProfile.stickers.push(recievedCard);
            prProfile.stickers.push(offeredCard);
            localStorage.setItem(makerID, JSON.stringify(pmProfile));
            localStorage.setItem(recieverID, JSON.stringify(prProfile));
          });

          refuseButton.addEventListener("click", function (e) {
            e.stopPropagation();
            let currentProposalMaker = null;
            let proposedCard = null;
            let targetKey = null;

            Object.keys(trades).forEach((key) => {
              if (trades[key].trading.marketCard == card.uniqueID) {
                currentProposalMaker = trades[key].trading.proposalMaker;
                proposedCard = trades[key].trading.userCard;
                targetKey = key;
              }
            });

            const index = data[currentProposalMaker].exchangedCards.findIndex(
              (obj) => obj.uniqueID === proposedCard
            );

            data[currentProposalMaker].exchangedCards[index].status = "default";

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
