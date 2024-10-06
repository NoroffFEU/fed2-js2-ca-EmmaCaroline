import { remove } from "../../api/auth/key";

/**
 * Handles the user logout process.
 *
 * This function removes the user's token and user data from storage, displays a logout message,
 * and redirects the user to the login page. If an error occurs during the logout process,
 * it logs the error to the console.
 *
 * @returns {void}
 * @throws {Error} If the logout process encounters an error.
 */

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
