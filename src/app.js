import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

// Apply initial theme
function applyInitialTheme() {
  const userPreference = localStorage.getItem("theme");
  const systemPreferenceIsDark = window.matchMedia(
    "prefers-color-scheme: dark"
  ).matches;
  const isDarkMode =
    userPreference === "dark" || (!userPreference && systemPreferenceIsDark);

  document.documentElement.classList.toggle("dark", isDarkMode);

  document.querySelector("#sun").classList.toggle("hidden", isDarkMode);
  document.querySelector("#moon").classList.toggle("hidden", !isDarkMode);
}

applyInitialTheme();

// Dark mode theme toggle function and event listener
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle("dark");

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  document.querySelector("#sun").classList.toggle("hidden", isDarkMode);
  document.querySelector("#moon").classList.toggle("hidden", !isDarkMode);
}

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", toggleTheme);

// Toggle the search icon
document.getElementById("search-icon").addEventListener("click", function () {
  const searchIconContainer = document.querySelector(".searchicon");
  const searchInput = document.getElementById("search-input");

  // Toggle the visibility of the search input
  searchIconContainer.classList.toggle("active");

  // Toggle the search input visibility using Tailwind's utility classes
  if (searchIconContainer.classList.contains("active")) {
    searchInput.classList.remove("hidden", "opacity-0", "visibility-hidden");
    searchInput.classList.add("opacity-100", "visibility-visible");
    searchInput.focus();
  } else {
    searchInput.classList.add("hidden", "opacity-0", "visibility-hidden");
    searchInput.classList.remove("opacity-100", "visibility-visible");
  }
});
