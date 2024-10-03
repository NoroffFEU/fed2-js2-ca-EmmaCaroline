import { remove } from "../../api/auth/key";

export function onLogout() {
  try {
    remove("token");
    remove("user");
    alert("You are signed out. See you next time!"); // The use of alert here is a placeholder until a less non-blocking notification is made with styling, for a better user experience
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}
