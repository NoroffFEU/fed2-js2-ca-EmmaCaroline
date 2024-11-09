import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

// Header Navigation event listener
const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#mobile-menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Dark mode theme toggle function and event listener
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle("dark");

  document.querySelector("#sun").classList.toggle("hidden", isDarkMode);
  document.querySelector("#moon").classList.toggle("hidden", !isDarkMode);
}

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", toggleTheme);
