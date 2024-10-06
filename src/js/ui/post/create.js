import { createPost } from "../../api/post/create";

/**
 * Handles the post creation form submission and processes the creation of a new post.
 *
 * This function prevents the default form submission, retrieves the form data,
 * processes the tags and media URL, and validates the post title. If the creation
 * is successful, it displays a success message and resets the form. If it fails,
 * it logs the error and alerts the user.
 *
 * @param {Event} event - The event object from the form submission.
 * @returns {Promise<void>} A promise that resolves when the post creation process is complete.
 * @throws {Error} If the post creation process encounters an error.
 */

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const post = Object.fromEntries(formData.entries());

  // SetS tags to an empty array if not provided
  post.tags = post.tags ? post.tags.split(",").map((tag) => tag.trim()) : [];

  if (post["media-url"]) {
    post.media = {
      url: post["media-url"],
      alt: post["media-alt"] || "No description provided",
    };
  } else {
    post.media = null;
  }

  if (!post.title) {
    alert("Title is required for creating a post");
    return;
  }

  try {
    const response = await createPost(post);
    alert("Post created!");
    form.reset();
  } catch (error) {
    console.error("Error creating post: ", error);
    alert("Failed to create post. Please try again.");
  }
}
