import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function updatePost(id, { title, body, tags, media }) {
  const bodyData = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      headers: headers(),
      method: "PUT",
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to update post: " + errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Updating post failed: ${error.message}`);
    }
    console.error("Updating post failed", error);
    throw error;
  }
}
