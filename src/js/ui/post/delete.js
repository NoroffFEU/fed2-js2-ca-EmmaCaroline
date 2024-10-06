import { deletePost } from "../../api/post/delete";
import { load } from "../../api/auth/key";

export async function onDeletePost(post, author) {
  const user = load("user");
  const userName = user.name;

  const deleteButton = document.getElementById("delete-button-container");

  // Check if the current user is the author of the post
  if (author === userName) {
    deleteButton.innerText = "Delete Post";
    deleteButton.setAttribute("id", post.id); // Use post.id directly
    deleteButton.style.display = "block"; // Ensure the button is visible

    deleteButton.addEventListener("click", async () => {
      const postId = deleteButton.getAttribute("id"); // Get the post ID when the button is clicked
      try {
        await deletePost(postId); // Call deletePost with the correct ID
        alert("The post was deleted");
        window.location.href = "/"; // Redirect after deletion
      } catch (error) {
        console.error("The post could not be deleted:", error); // Include the error in the console
        alert("Failed to delete the post."); // Inform the user
      }
    });
  } else {
    deleteButton.style.display = "none"; // Hide the button if the user is not the author
  }
}
