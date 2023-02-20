let username = document.getElementById("username");
let password = document.getElementById("password");
let button = document.getElementById("bt");
let warning = document.querySelector(".warning");
button.addEventListener("click", submit);

async function submit() {
  let user = username.value;
  let pass = password.value;

  if (user.includes(" ") || pass.includes(" ") || user === "" || pass === "") {
    warning.style.color = "red";
    warning.innerHTML = "insert data correctly : whitespace not allowed";
  } else {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashedPassword = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    if (
      localStorage.getItem(user) === null
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
      warning.style.color = "red";
      warning.innerHTML = "user already exists";
    }
  }
}
