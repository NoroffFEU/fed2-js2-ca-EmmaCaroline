import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";
import { readPost } from "../../api/post/read";

const form = document.forms.editPost;

if (form) {
  form.addEventListener("submit", onUpdatePost);
} else {
  console.error("Edit form not found on the page.");
}

const postID = JSON.parse(localStorage.getItem("postID"));

if (postID) {
  readPost(postID)
    .then((post) => {
      if (post) {
        form.title.value = post.title || "";
        form.body.value = post.body || "";
        form["media-url"].value = post.media?.url || "";
        form["media-alt"].value = post.media?.alt || "";
        form.tags.value = post.tags ? post.tags.join(", ") : "";
      }
    })
    .catch((error) => {
      console.error("Error fetching post for editing:", error);
    });
}

authGuard();
