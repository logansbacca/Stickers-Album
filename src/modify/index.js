import { getCurrentUser } from "../modules/currentUser.js";
import { hashPassword } from "../modules/hashPassword.js";
import {logOut}  from "../modules/logout.js";

let email = document.getElementById('email')
let password = document.getElementById('password')
let username = document.getElementById('username')
let submitButton = document.getElementById('sbmt-btn')


const currentUser = getCurrentUser();
let getUser = JSON.parse(localStorage.getItem(currentUser));

console.log(getUser);

email.value = getUser.email;
password.value = getUser.password;
username.value = getUser.username;

async function submitNewValues () {
    localStorage.removeItem(getUser.username);
    getUser.email = email.value;
    getUser.password =  await hashPassword(password.value);
    getUser.username = username.value
    localStorage.setItem(username.value, JSON.stringify(getUser));
    logOut();
    window.location.href = "../login/index.html";
}



submitButton.addEventListener("click", submitNewValues);





