import { API_AUTH_LOGIN } from "../constants";
import { save } from "./key";
import { headers } from "../headers";

export async function login({ email, password }) {
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: headers(),
      method: "POST",
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${errorText}`);
    }

    const result = await response.json();
    save("token", result.data.accessToken);
    save("user", result.data);

    alert("You are now logged in"); //Remove later when working as it should

    window.location.href = "/";

    return result; //Do I need this? check later
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Login failed: ${error.message}`);
    }
    console.error("Login failed", error);
    throw error;
  }
}
