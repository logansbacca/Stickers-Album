import { getCurrentUser } from "../modules/currentUser.js";
import { logOut } from "../modules/logout";

let welcome = document.getElementById("welcome");
let signOut = document.getElementById("sign-out");
let creditButton = document.getElementById("credit-button");
let credits = document.getElementById("credit");
/* let addCards = document.getElementById("add-cards"); */
const currentUser = getCurrentUser();

window.onload = function checkUser() {
  if (currentUser == null) {
    redirect();
  } else {
    welcome.innerHTML = `Welcome back ${currentUser}!`;
  }
};

let userString = JSON.parse(localStorage.getItem(currentUser));

credits.innerHTML = userString.credits.toString();

signOut.addEventListener("click", () => {
  logOut();
});

function redirect() {
  window.location.href = "../login/index.html";
}

creditButton.addEventListener("click", () => {
  userString.credits += 1;
  localStorage.setItem(currentUser, JSON.stringify(userString));
  credits.innerHTML = userString.credits.toString();
});
