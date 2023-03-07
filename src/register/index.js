const username = document.getElementById("username");
const password = document.getElementById("password");
const userEmail = document.getElementById("email");
const button = document.getElementById("bt");
const warning = document.getElementById("warning");
const selector = document.getElementById("sticker-selector");
import { hashPassword } from "../modules/hashPassword.js";
button.addEventListener("click", submit);

async function submit() {
  let email = userEmail.value;
  let user = username.value;
  let pass = password.value;
  let favHero = selector.value;

  if (user.includes(" ") || pass.includes(" ") || user === "" || pass === "") {
    warning.style.color = "red";
    warning.innerText = "insert data correctly : whitespace not allowed";
  } else if (!email.includes("@") || !email.includes(".")) {
    warning.style.color = "red";
    warning.innerText = "insert data correctly : email not valid";
  } else {
    try {
      const hashedPassword = await hashPassword(pass);
      if (localStorage.getItem(user) === null) {
        const userData = {
          username: user,
          password: hashedPassword,
          stickers: new Array(),
          credits: 1,
          email: email,
          favorite: favHero,
        };
        localStorage.setItem(user, JSON.stringify(userData));
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
