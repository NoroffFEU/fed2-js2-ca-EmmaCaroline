import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost({ title, body, tags, media }) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify({ title, body, tags, media }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to create post: " + errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Creating post failed: ${error.message}`);
    }
    console.error("Creating post failed", error);
    throw error;
  }
}
