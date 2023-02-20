import { logOut } from "../modules/logout";
let signOut = document.getElementById("sign-out");

signOut.addEventListener("click", () => {
  logOut();
});
