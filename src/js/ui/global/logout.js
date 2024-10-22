import { onLogout } from "../auth/logout";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", onLogout);
  }
}
