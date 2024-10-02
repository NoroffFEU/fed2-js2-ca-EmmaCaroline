import { API_KEY } from "./constants";
import { load } from "./auth/key";

const token = load("token");

export function headers() {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(API_KEY && { "X-API-Key": API_KEY }),
    ...(token && { Authorization: `Bearer ${token}` }),
  });
  return headers;
}

/* Keep in case I want to switch back to this again

export function headers() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
  
}*/
