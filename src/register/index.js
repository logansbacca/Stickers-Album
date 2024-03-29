import { hashPassword } from "../modules/hashPassword.js";
import { createUniqueID } from "../modules/createUniqueID.js";
import { checkUsernameAvailability } from "../modules/checkUsernameAvailability.js";
import { ValidateEmail } from "../modules/ValidateEmail.js";
const username = document.getElementById("username");
const password = document.getElementById("password");
const userEmail = document.getElementById("email");
const button = document.getElementById("bt");
const warning = document.getElementById("warning");
const selector = document.getElementById("sticker-selector");

button.addEventListener("click", submit);

async function submit() {
  let email = userEmail.value;
  let user = username.value;
  let userID = createUniqueID();
  let pass = password.value;
  let favHero = selector.value;

  if (user.includes(" ") || pass.includes(" ") || user === "" || pass === "") {
    warning.style.color = "red";
    warning.innerText = "insert data correctly : whitespace not allowed";
  } else if (!ValidateEmail(email)) {
    warning.style.color = "red";
    warning.innerText = "insert data correctly : email not valid";
  } else {
    try {
      const hashedPassword = await hashPassword(pass);
      if (checkUsernameAvailability(user)) {
     
        const userData = {
          username: user,
          password: hashedPassword,
          userID: userID,
          stickers: new Array(),
          credits: 1,
          email: email,
          favorite: favHero,
        };
        localStorage.setItem(userID, JSON.stringify(userData));
        window.location.href = "../login/index.html";
      } else {
        warning.style.color = "red";
        warning.innerText = "user already exists";
   
      }
    } catch (error) {
      "error has occured", error;
    }
  }
}


