import { onDeletePost } from "../../ui/post/delete";
import { onReadSinglePost } from "../../ui/post/read";

/*const editButton = document.getElementById("edit-button-container");

if (!editButton) {
  console.error("Edit button not found");
} else {
  editButton.addEventListener("click", () => {
    const postID = JSON.parse(localStorage.getItem("postID"));

    if (postID) {
      console.log("Post ID:", postID);
      localStorage.setItem("postID", JSON.stringify(postID));
      window.location.href = "/post/edit/";
    } else {
      console.error("No post ID found in local storage");
    }
  });
}

onReadSinglePost();
onDeletePost();*/

async function initializePost() {
  try {
    // Fetch the single post data
    await onReadSinglePost();

    // Get the post ID from local storage
    const postID = JSON.parse(localStorage.getItem("postID"));

    // Check if the post ID exists
    if (postID) {
      console.log("Post ID:", postID);
      // Store the post ID in local storage for editing later if needed
      localStorage.setItem("postID", JSON.stringify(postID));
    } else {
      console.error("No post ID found in local storage");
    }
  } catch (error) {
    console.error("Error initializing post:", error);
  }
}

// Call the initializePost function to set everything up
initializePost();

// Call delete functionality
const postID = JSON.parse(localStorage.getItem("postID"));
if (postID) {
  onDeletePost(postID);
}
