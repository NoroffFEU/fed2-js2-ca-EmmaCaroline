import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

// Header Navigation event listener
const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#mobile-menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
