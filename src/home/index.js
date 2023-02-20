import { logOut } from "../modules/logout";
let signOut = document.getElementById("sign-out");
let join = document.getElementById("join");

signOut.addEventListener("click", () => {
  logOut();
});

join.addEventListener("click", () => {
  window.location.href = "../register/index.html";
});
