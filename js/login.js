let form = document.querySelector(".login__form");
let inputUsername = document.querySelector(".input__username");
let inputPassword = document.querySelector(".input__password");
let LOGIN__URL = "https://dummyjson.com";
let error = document.querySelector(".error");
let logInBtn = document.querySelector(".logIN__btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let usernameValue = inputUsername.value;
  let passwordValue = inputPassword.value;
  let user = {
    username: usernameValue,
    password: passwordValue,
  };
  signIn(user);
});

async function signIn(user) {
  await fetch(`${LOGIN__URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res>>>", res);
      if (res.message === "Invalid credentials") {
        return (error.style.opacity = 1);
      }
      localStorage.setItem("x-auth-token", res.token);
      window.open(`admin.html`, "_self");
      logInBtn.innerHTML = "Admin panel"
    })
    .catch((err) => console.log("err>>>", err));
}
