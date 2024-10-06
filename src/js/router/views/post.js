import { onDeletePost } from "../../ui/post/delete";
import { onReadSinglePost } from "../../ui/post/read";

/**
 * Initializes the post by reading the single post data and checking for a post ID in local storage.
 *
 * This function attempts to read a single post and retrieves its ID from local storage. If the post ID
 * exists, it logs the ID to the console and updates the local storage. If no post ID is found, it logs an error.
 *
 * @returns {Promise<void>} A promise that resolves when the post initialization is complete.
 * @throws {Error} If reading the single post fails or if an error occurs during initialization.
 */

async function initializePost() {
  try {
    await onReadSinglePost();

    const postID = JSON.parse(localStorage.getItem("postID"));

    if (postID) {
      console.log("Post ID:", postID);
      localStorage.setItem("postID", JSON.stringify(postID));
    } else {
      console.error("No post ID found in local storage");
    }
  } catch (error) {
    console.error("Error initializing post:", error);
  }
}

initializePost();

const postID = JSON.parse(localStorage.getItem("postID"));
if (postID) {
  onDeletePost(postID);
}
