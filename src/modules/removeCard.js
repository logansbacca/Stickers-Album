
import { getCurrentUser } from "../modules/currentUser.js";

const userName = getCurrentUser();


let user = JSON.parse(localStorage.getItem(userName));




export function removeCard(id) {
    if (user.stickers.length > 1){
        const index = user.stickers.findIndex((card) => JSON.stringify(card.uniqueID) === id);
        if (index > -1) { 
            user.stickers.splice(index, 1); 
          }
        
        localStorage.setItem(userName, JSON.stringify(user)) 
        location.reload();
    }
}


