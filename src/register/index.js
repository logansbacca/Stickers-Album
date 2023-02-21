let username = document.getElementById("username");
let password = document.getElementById("password");
let userEmail = document.getElementById("email");
let button = document.getElementById("bt");
let warning = document.querySelector(".warning");
import { hashPassword } from "../modules/hashPassword.js";
button.addEventListener("click", submit);

async function submit() {
  let email = userEmail.value;
  let user = username.value;
  let pass = password.value;
  if (user.includes(" ") || pass.includes(" ") || user === "" || pass === "") {
    warning.style.color = "red";
    warning.innerHTML = "insert data correctly : whitespace not allowed";
  } else {
    const hashedPassword = await hashPassword(pass);
    alert(hashedPassword);
    if (localStorage.getItem(user) === null) {
      const userData = {
        username: user,
        password: hashedPassword,
        stickers: [],
        credits: 1,
        email: email,
      };
      localStorage.setItem(user, JSON.stringify(userData));
      window.location.href = "../login/index.html";
    } else {
      warning.style.color = "red";
      warning.innerHTML = "user already exists";
    }
  }
}
