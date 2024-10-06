import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * API call function to update an existing post with the specified ID and new data.
 *
 * @param {number} id - The ID of the post to be updated.
 * @param {Object} params - The updated post data.
 * @param {string} [params.title] - The new title of the post (optional).
 * @param {string} [params.body] - The new content of the post (optional).
 * @param {Array<string>} [params.tags] - An array of new tags for the post (optional).
 * @param {string} [params.media] - The new media URL for the post (optional).
 * @returns {Promise<Object>} The result of the update request.
 * @throws {Error} If the ID is not a number or if the update fails.
 */

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
