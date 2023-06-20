import { getCurrentUser } from "../modules/currentUser.js";
import { hashPassword } from "../modules/hashPassword.js";
import { logOut } from "../modules/logout.js";

let email = document.getElementById("email");
let password = document.getElementById("password");
let username = document.getElementById("username");
let submitButton = document.getElementById("sbmt-btn");

const currentUser = getCurrentUser();
let getUser = JSON.parse(localStorage.getItem(currentUser));

console.log(getUser);

email.value = getUser.email;
password.value = getUser.password;
username.value = getUser.username;

async function submitNewValues() {
  
  const updatedUsername = username.value;

   if (localStorage.getItem(currentUser).username == null){
    getUser.username = updatedUsername;
    localStorage.removeItem(getUser.username);
    getUser.email = email.value;
  if (getUser.password != password.value) {
    getUser.password = await hashPassword(password.value);
  }
  }else {
    username.style.background = "red";
    username.value ="invalid"
    setTimeout(function() {
      location.reload();
    }, 700);
    return
  } 
  localStorage.setItem(currentUser, JSON.stringify(getUser));

  logOut();
  window.location.href = "../login/index.html"; 
  
}



submitButton.addEventListener("click", submitNewValues);
