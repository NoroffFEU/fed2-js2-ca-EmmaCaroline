import { onLogout } from "../auth/logout";

export function setLogoutListener() {
  document.querySelectorAll(".logout-btn").forEach((logoutBtn) => {
    logoutBtn.addEventListener("click", () => {
      const userConfirmed = confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        onLogout();
      } else {
        window.location.reload();
      }
    });
  });
}
