import { onLogout } from "../auth/logout";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const userConfirmed = confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        onLogout();
      } else {
        window.location.reload();
      }
    });
  }
}
