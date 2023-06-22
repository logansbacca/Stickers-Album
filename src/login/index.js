const username = document.getElementById("username");
const password = document.getElementById("password");
const warning = document.querySelector(".warning");
const button = document.getElementById("bt");
button.addEventListener("click", submit);
import { hashPassword } from "../modules/hashPassword.js";
import { setCurrentUser } from "../modules/currentUser.js";


async function submit() {
  let user = username.value;
  let pass = password.value;
  if (user.includes(" ") || pass.includes(" ")) {
    warning.style.color = "red";
    warning.innerText = "no spaces allowed";
  } else {
    try {
      const hashedPassword = await hashPassword(pass);
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedUser = JSON.parse(localStorage.getItem(key));

        if (
          storedUser != null &&
          storedUser.username === user &&
          storedUser.password === hashedPassword
        ) {
          setCurrentUser(storedUser.userID);

          warning.style.color = "green";
          warning.innerText = "login successful";
          window.location.href = "../home/index.html";
          break;
        }
      }
    } catch (error) {
      warning.style.color = "red";
      warning.innerText = "please input correct information";
      "error has occured", error;
    }
  }
}
