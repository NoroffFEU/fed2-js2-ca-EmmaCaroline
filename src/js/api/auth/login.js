import { API_AUTH_LOGIN } from "../constants";
import * as storage from "./key";
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
    storage.save("token", result.data.accessToken);
    storage.save("user", result.data);

    return result;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}
