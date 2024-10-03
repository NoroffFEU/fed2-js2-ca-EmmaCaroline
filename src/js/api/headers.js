import { API_KEY } from "./constants";
import * as storage from "./auth/key";

//const token = storage.load("token");

export function headers() {
  const token = storage.load("token");
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(API_KEY && { "X-API-Key": API_KEY }),
    ...(token && { Authorization: `Bearer ${token}` }),
  });
  return headers;
}
