import { getCurrentUser } from "../modules/currentUser.js";
import { hashPassword } from "../modules/hashPassword.js";
import { logOut } from "../modules/logout.js";
import { ValidateEmail } from "../modules/ValidateEmail.js";
import { checkUsernameAvailability } from "../modules/checkUsernameAvailability";

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
  const updatedEmail = email.value;

  if (ValidateEmail(updatedEmail)) {
    getUser.email = updatedEmail;
  } else {
    email.style.background = "red";
    email.value = "invalid";
    return;
  }

  if (getUser.password != password.value) {
    getUser.password = await hashPassword(password.value);
  }



  if (!checkUsernameAvailability(updatedUsername)) {
    username.style.background = "red";
    username.value = "invalid";
    setTimeout(function () {
      location.reload();
    }, 700);
    return;
  } else {
    getUser.username = updatedUsername;
  }

  localStorage.setItem(currentUser, JSON.stringify(getUser));

  logOut();
  window.location.href = "../login/index.html";
}

submitButton.addEventListener("click", submitNewValues);
