import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";

export async function register({ name, email, password }) {
  const body = JSON.stringify({
    name,
    email,
    password,
  });

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      headers: headers(),
      method: "POST",
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to register: " + errorText);
    }

    const result = await response.json();
    alert("You are now registered");
    return result;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Registration failed: ${error.message}`);
    }
    console.error("Registration failed", error);
    throw error;
  }
}
