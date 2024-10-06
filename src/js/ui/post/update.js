import { updatePost } from "../../api/post/update";
import { readPost } from "../../api/post/read";
import { load } from "../../api/auth/key";

export async function onUpdatePost(event) {
  event.preventDefault();

  const form = document.forms.editPost;
  const id = JSON.parse(localStorage.getItem("postID"));
  const formData = new FormData(event.target);

  // Fetch the existing post data to compare
  const existingPost = await readPost(id);

  // Prepare updated data for the post
  const updatedData = {
    title: formData.get("title") || existingPost.title, // Use existing title if not updated
    body: formData.get("body") || existingPost.body, // Use existing body if not updated
    tags: formData.get("tags")
      ? formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim()) // Split and trim tags into an array
      : existingPost.tags,
  };

  // Handle media
  const mediaUrl = formData.get("media-url")?.trim();
  const mediaAlt = formData.get("media-alt")?.trim();

  // Only add media to updatedData if the URL is provided or if the existing post has a media URL
  if (mediaUrl || existingPost.media?.url) {
    updatedData.media = {
      url: mediaUrl || existingPost.media?.url || null, // Use existing URL if no new URL
      alt: mediaAlt || existingPost.media?.alt || "", // Use existing alt text if not updated
    };
  }

  // Debugging: Log the updatedData
  console.log("Updated Data:", updatedData);

  // Check if media URL is provided and valid
  if (updatedData.media?.url && !isValidURL(updatedData.media.url)) {
    alert("Please provide a valid URL for the media.");
    return; // Exit the function if the URL is invalid
  }

  // Proceed with updating the form
  try {
    await updatePost(id, updatedData);
    alert("Post updated successfully!");
    window.location.href = `/post/`;
  } catch (error) {
    console.error("Failed to update the post:", error);
    alert("Failed to update the post.");
  }
}

// Utility function to check if a string is a valid URL
function isValidURL(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

export const onEditButton = (post, author) => {
  const user = load("user");
  const userName = user.name;

  if (author === userName) {
    const editButton = document.createElement("a");
    editButton.innerText = "Edit post";
    editButton.setAttribute("href", `/post/edit/?id=${post.id}`);
    editButton.setAttribute("id", "edit-link");
    editButton.classList.add("button");

    editButton.addEventListener("click", () => {
      localStorage.setItem("postID", JSON.stringify(post.id));
      window.location.href = editButton.getAttribute("href");
    });

    return editButton;
  } else {
    return "";
  }
};
