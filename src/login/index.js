let username = document.getElementById("username");
let password = document.getElementById("password");
let elements = document.querySelectorAll(".parag");
let button = document.getElementById("bt");
button.addEventListener("click", submit);
import { setCurrentUser } from "../modules/currentUser.js";

async function submit() {
  let user = username.value;
  let pass = password.value;
  if (user.includes(" ") || pass.includes(" ")) {
    elements[1].style.color = "red";
    elements[1].innerHTML = "no spaces allowed";
  } else {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashedPassword = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    let newUser = JSON.parse(localStorage.getItem(user));
    if (newUser != null && newUser.password === hashedPassword) {
      setCurrentUser(user);
      elements[1].style.color = "green";
      elements[1].innerHTML = "login successful";
      window.location.href = "../home/index.html";
    } else {
      elements[1].style.color = "red";
      elements[1].innerHTML = "please input correct information";
    }
  }
}
