import { onReadSinglePost } from "../../ui/post/read";
import { onDeletePost } from "../../ui/post/delete";

const editButton = document.getElementById("edit-button-container");

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
onDeletePost();
