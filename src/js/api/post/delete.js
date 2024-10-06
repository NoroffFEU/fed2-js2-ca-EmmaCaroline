import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * API call function to delete a post by its ID.
 *
 * @param {number} id - The ID of the post to be deleted.
 * @throws {Error} If the ID is not a number or if the deletion fails.
 */

export async function deletePost(id) {
  if (isNaN(id)) {
    throw new Error("Invalid post ID: must be a number");
  }

  try {
    const endpoint = `${API_SOCIAL_POSTS}/${id}`;
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to delete post: " + errorText);
    }
  } catch (error) {
    console.error("Deleting post failed: ", error);
    throw error;
  }
}
