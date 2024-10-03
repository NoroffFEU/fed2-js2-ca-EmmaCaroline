import { remove } from "../../api/auth/key";

export function onLogout() {
  try {
    remove("token");
    remove("user");
    alert("You are signed out. See you next time!");
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}
