import { deletePost } from "../../api/post/delete";
import { load } from "../../api/auth/key";

/**
 * Sets up the delete functionality for a post if the current user is the author.
 *
 * This function checks if the logged-in user is the author of the specified post.
 * If they are, it displays the delete button and adds an event listener to handle
 * the deletion of the post. If the delete action is successful, it alerts the user
 * and redirects to the homepage. If the user is not the author, the delete button is hidden.
 *
 * @param {Object} post - The post object containing the post details.
 * @param {string} author - The username of the post's author.
 * @returns {Promise<void>} A promise that resolves when the delete action is complete.
 * @throws {Error} If the deletion process encounters an error.
 */

export async function onDeletePost(post, author) {
  const user = load("user");
  const userName = user.name;

  const deleteButton = document.getElementById("delete-button-container");

  // CheckS if the current user is the author of the post
  if (author === userName) {
    deleteButton.innerText = "Delete Post";
    deleteButton.setAttribute("id", post.id);
    deleteButton.style.display = "block";

    deleteButton.addEventListener("click", async () => {
      const postId = deleteButton.getAttribute("id");
      try {
        await deletePost(postId);
        alert("The post was deleted");
        window.location.href = "/";
      } catch (error) {
        console.error("The post could not be deleted:", error);
        alert("Failed to delete the post.");
      }
    });
  } else {
    deleteButton.style.display = "none";
  }
}
