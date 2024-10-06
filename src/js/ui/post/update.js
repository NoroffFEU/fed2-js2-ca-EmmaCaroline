import { updatePost } from "../../api/post/update";
import { readPost } from "../../api/post/read";

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
    media: {
      url: formData.get("media-url") || existingPost.media?.url || "", // Use existing URL if not updated
      alt: formData.get("media-alt") || existingPost.media?.alt || "", // Use existing alt text if not updated
    },
  };

  // Check if there are actual changes
  const hasChanges =
    updatedData.title !== existingPost.title ||
    updatedData.body !== existingPost.body ||
    JSON.stringify(updatedData.tags) !== JSON.stringify(existingPost.tags) ||
    updatedData.media.url !== existingPost.media?.url ||
    updatedData.media.alt !== existingPost.media?.alt;

  // If no fields are updated, alert the user and exit
  if (!hasChanges) {
    alert(
      "No changes were made. Please fill out at least one field to update the post."
    );
    return; // Exit the function without making an API call
  }

  // Proceed with updating the form if there are changes
  try {
    await updatePost(id, updatedData);
    alert("Post updated successfully!");
    window.location.href = `/post/`;
  } catch (error) {
    console.error("Failed to update the post:", error);
    alert("Failed to update the post.");
  }
}
