import { deletePost } from "../../api/post/delete";
import { load } from "../../api/auth/key";

/*export async function onDeletePost(event) {
  document.addEventListener("DOMContentLoaded", async () => {
    // Fetch and display the single post
    await onReadSinglePost(); // Ensure you have this function defined to fetch and display the post

    // Get the delete button
    const deleteButton = document.getElementById("delete-button-container");

    // Attach event listener to the delete button
    deleteButton.addEventListener("click", async () => {
      const postID = JSON.parse(localStorage.getItem("postID")); // Retrieve the post ID from localStorage
      if (postID) {
        try {
          await deletePost(postID); // Call the deletePost function
          alert("Post deleted successfully!"); // Optional: Inform the user
          window.location.href = "/"; // Redirect to the homepage or another page after deletion
        } catch (error) {
          console.error("Error deleting post: ", error);
          alert("Failed to delete post."); // Optional: Inform the user about the failure
        }
      } else {
        console.error("No post ID found in localStorage.");
      }
    });
  });
}*/

export async function onDeletePost(post, author) {
  const user = load("user");
  const userName = user.name;

  const deleteButton = document.getElementById("delete-button-container");

  // Check if the current user is the author of the post
  if (author === userName) {
    deleteButton.innerText = "Delete";
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
