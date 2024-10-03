import { onLogout } from "../auth/logout";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", onLogout);
  }
}

// REMEMBER: I need to find the right place to call this function
