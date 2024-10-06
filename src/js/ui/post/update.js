import { updatePost } from "../../api/post/update";
import { readPost } from "../../api/post/read";
import { load } from "../../api/auth/key";

/**
 * Handles the submission of the post update form and updates the existing post.
 *
 * This function prevents the default form submission behavior and retrieves
 * the post ID from local storage. It collects the form data and checks if
 * the post exists. It constructs an object with updated data for the post,
 * prioritizing user input over existing post values. If a media URL is
 * provided, it checks for its validity before proceeding. Upon successfully
 * updating the post, it displays a success message and redirects to the
 * post page. If an error occurs during the update process, it logs the
 * error and alerts the user.
 *
 * @param {Event} event - The event object representing the form submission.
 */

export async function onUpdatePost(event) {
  event.preventDefault();

  const form = document.forms.editPost;
  const id = JSON.parse(localStorage.getItem("postID"));
  const formData = new FormData(event.target);

  const existingPost = await readPost(id);

  const updatedData = {
    title: formData.get("title") || existingPost.title,
    body: formData.get("body") || existingPost.body,
    tags: formData.get("tags")
      ? formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim()) // Splits and trims tags into an array
      : existingPost.tags,
  };

  const mediaUrl = formData.get("media-url")?.trim();
  const mediaAlt = formData.get("media-alt")?.trim();

  if (mediaUrl || existingPost.media?.url) {
    updatedData.media = {
      url: mediaUrl || existingPost.media?.url || null,
      alt: mediaAlt || existingPost.media?.alt || "",
    };
  }

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

/**
 * Creates an "Edit post" button for the given post if the current user is the author.
 *
 * This function checks if the logged-in user is the author of the post. If they are,
 * it creates an anchor element styled as a button that links to the post edit page.
 * The post ID is stored in local storage when the button is clicked to ensure the
 * correct post is edited. If the current user is not the author, it returns an empty string.
 *
 * @param {Object} post - The post object containing the post details.
 * @param {string} author - The name of the author of the post.
 * @returns {HTMLAnchorElement|string} The edit button as an anchor element, or an empty string if the user is not the author.
 */

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
