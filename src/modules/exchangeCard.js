import { getCurrentUser } from "../modules/currentUser.js";

const userName = getCurrentUser();
let user = JSON.parse(localStorage.getItem(userName));

export function exchangeCard(id) {
    const index = user.stickers.findIndex(
    (card) => JSON.stringify(card.uniqueID) === id
  );

  const cardToExchange = user.stickers[index];
  let exchangedCards;
  try {
    const storedValue = localStorage.getItem("exchangedCards");
    exchangedCards = storedValue ? JSON.parse(storedValue) : {};
  } catch (error) {
    exchangedCards = {};
    console.error("error", error);
  }

  if (exchangedCards[userName]) { 
      exchangedCards[userName].exchangedCards.push(cardToExchange);
    } else {
    exchangedCards[userName] = {
      exchangedCards: [cardToExchange],
    }; 
  }

  localStorage.setItem("exchangedCards", JSON.stringify(exchangedCards));

}
