let username = document.getElementById("username");
let password = document.getElementById("password");
let button = document.getElementById("bt");
let placeholder = document.querySelectorAll(".placeholder");
button.addEventListener("click", submit);

async function submit() {
  let user = username.value;
  let pass = password.value;

  if (user.includes(" ") || pass.includes(" ")) {
    placeholder[1].style.color = "red";
    placeholder[1].innerHTML = "no spaces allowed";
  } else {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashedPassword = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    if (
      localStorage.getItem(user) === null ||
      localStorage.getItem(user) != hashedPassword
    ) {
      const userData = {
        username: user,
        password: hashedPassword,
        stickers: [],
        credits: 1,
      };
      localStorage.setItem(user, JSON.stringify(userData));
      window.location.href = "../login/index.html";
    } else {
      placeholder[1].style.color = "red";
      placeholder[1].innerHTML = "user already exists";
    }
  }
}
