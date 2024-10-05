import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function updateProfile(username, updatedData) {
  const endpoint = `${API_SOCIAL_PROFILES}/${username}`;

  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "PUT",
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to update profile: " + errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Updating profile failed: ", error);
    throw error;
  }
}
