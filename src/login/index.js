let username = document.getElementById("username");
let password = document.getElementById("password");
let warning = document.querySelector(".warning");
let button = document.getElementById("bt");
button.addEventListener("click", submit);
import { hashPassword } from "../modules/hashPassword.js";
import { setCurrentUser } from "../modules/currentUser.js";

async function submit() {
  let user = username.value;
  let pass = password.value;
  if (user.includes(" ") || pass.includes(" ")) {
    warning.style.color = "red";
    warning.innerHTML = "no spaces allowed";
  } else {
    const hashedPassword = await hashPassword(pass);
    let newUser = JSON.parse(localStorage.getItem(user));
    if (newUser != null && newUser.password === hashedPassword) {
      setCurrentUser(user);
      warning.style.color = "green";
      warning.innerHTML = "login successful";
      window.location.href = "../home/index.html";
    } else {
      warning.style.color = "red";
      warning.innerHTML = "please input correct information";
    }
  }
}
