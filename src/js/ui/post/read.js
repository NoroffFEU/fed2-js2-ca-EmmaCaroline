import { readPosts, readPost, readPostsByUser } from "../../api/post/read";
import { load } from "../../api/auth/key";
import { onDeletePost } from "./delete";
import { onEditButton } from "./update";

/**
 * Renders a list of posts in the specified containers based on the current page.
 *
 * This function checks if the provided posts are in the expected array format.
 * For each post, it creates HTML elements displaying the post's title, author,
 * body, media, and tags. It also includes a button to view the full post,
 * which stores the post ID in local storage and redirects the user to the post page.
 *
 * The function renders posts in the "posts-container" if the user is on the homepage
 * or in the "own-posts-container" if the user is viewing their profile.
 *
 * @param {Array} posts - An array of post objects to be rendered.
 * @throws {Error} Will log an error if posts is not an array.
 */

let allPosts = [];

async function getPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  const postByUserContainer = document.getElementById("own-posts-container");

  // Check if posts is an array before proceeding
  if (!Array.isArray(posts)) {
    console.error("Expected posts to be an array, but got: ", posts);
    return; // Exit if posts is not an array
  }

  posts.forEach((post) => {
    // Clone a post template and update its contents
    const postTemplate = document.querySelector(".post-data").cloneNode(true);

    // Fill in the post data
    postTemplate.querySelector(".author-name").textContent = post.author.name;
    postTemplate.querySelector(".post-title").textContent = post.title;
    postTemplate.querySelector(".post-body").innerText = post.body;

    // Select the image element and its container
    const image = postTemplate.querySelector(".post-image");
    const imageContainer = image.parentElement; // This is the container holding the image

    // If there's media, display the image
    if (post.media && post.media.url) {
      image.src = post.media.url;
      image.alt = post.media.alt || "No description provided";
      image.style.display = "block"; // Ensure image is displayed if present
      imageContainer.style.cursor = "pointer"; // Set cursor pointer for clickable container
    } else {
      image.style.display = "none"; // Hide the image if no media
      imageContainer.style.cursor = "default"; // Remove cursor pointer when no image
    }

    const tagsContainer = postTemplate.querySelector(".post-tags");
    tagsContainer.innerHTML = ""; // Clear any existing content

    if (post.tags.length > 0) {
      post.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = `#${tag}`;
        tagElement.className =
          "inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs font-semibold truncate";
        tagsContainer.appendChild(tagElement);
      });
    } else {
      tagsContainer.textContent = "";
    }

    // Function to handle the click event
    const handleClick = () => {
      localStorage.setItem("postID", JSON.stringify(post.id));
      window.location.href = "/post/";
    };

    // Make the title clickable
    const title = postTemplate.querySelector(".post-title");
    title.addEventListener("click", handleClick);

    // Make the image clickable if it exists
    if (image.style.display !== "none") {
      image.addEventListener("click", handleClick);
    }

    // Append the populated post to the appropriate container
    if (window.location.pathname === "/") {
      postsContainer.appendChild(postTemplate);
    } else if (window.location.pathname === "/profile/") {
      postByUserContainer.appendChild(postTemplate);
    }

    // Make the cloned post visible
    postTemplate.style.display = "block"; // Show the post after cloning
  });
}

/**
 * Renders a single post's details in the specified container.
 *
 * This function creates HTML elements to display the post's title, author,
 * body, media (if available), and tags. If the post does not have any content
 * for these fields, default messages are shown. The function also calls
 * `onDeletePost` to manage the delete button functionality based on the
 * author's identity.
 *
 * @param {Object} post - The post object containing its details.
 * @param {string} post.title - The title of the post.
 * @param {Object} post.author - The author of the post.
 * @param {string} post.author.name - The name of the author.
 * @param {string} post.body - The content of the post.
 * @param {Object} post.media - The media object for the post, if any.
 * @param {string} post.media.url - The URL of the media.
 * @param {string} post.media.alt - The alt text for the media.
 * @param {Array<string>} post.tags - An array of tags associated with the post.
 */

export async function getSinglePost(post) {
  const singlePostContainer = document.getElementById("single-post-container");
  if (!singlePostContainer) {
    console.error("Single post container not found!");
    return;
  }

  // Get the container where the post data will be displayed
  const postTitleElement = document.getElementById("post-title");
  const postBodyElement = document.getElementById("post-body");
  const postTagsElement = document.getElementById("post-tags");
  const postAuthorElement = document.getElementById("post-author");
  const postImageContainerElement = document.getElementById(
    "post-image-container"
  );

  if (
    !postTitleElement ||
    !postBodyElement ||
    !postTagsElement ||
    !postAuthorElement ||
    !postImageContainerElement
  ) {
    console.error("One or more post elements are not found!");
    return;
  }

  // Populate the elements with data from the post
  postTitleElement.textContent = post.title;
  postBodyElement.innerHTML = post.body || "No content available";

  // Clear any existing tags
  postTagsElement.innerHTML = "";

  // Populate the tags with the same styling as in `getPosts`
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    post.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = `#${tag}`;
      tagElement.className =
        "inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs font-semibold truncate";
      postTagsElement.appendChild(tagElement);
    });
  } else {
    postTagsElement.textContent = "";
  }

  if (post.author) {
    postAuthorElement.innerText = `Posted by: ${post.author.name}`;
  }

  // Add image if present
  if (post.media && post.media.url) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt || "No description provided";
    postImageContainerElement.innerHTML = ""; // Clear existing content
    postImageContainerElement.appendChild(image);
  } else {
    postImageContainerElement.innerHTML = ""; // Clear if no image
  }

  // Append the "Edit Post" button if the user is the author
  const editButton = onEditButton(post, post.author.name);
  if (editButton && editButton instanceof Node) {
    singlePostContainer.appendChild(editButton);
  }

  // Set the post ID in localStorage
  localStorage.setItem("postID", JSON.stringify(post.id));

  // Call the delete function (existing delete logic remains unchanged)
  onDeletePost(post, post.author.name);
}

/**
 * Fetches and displays all posts.
 *
 * This function retrieves all posts using the `readPosts` function and then
 * calls the `getPosts` function to render the posts in the appropriate
 * container. In case of an error during the fetching process, it logs the
 * error to the console.
 */

export async function onReadAllPosts() {
  try {
    allPosts = await readPosts();

    await getPosts(allPosts.data);
  } catch (error) {
    console.error("Error reading all posts: ", error);
  }
}

/**
 * Fetches and displays posts created by the logged-in user.
 *
 * This function retrieves the username of the currently logged-in user from
 * local storage, then calls the `readPostsByUser` function to fetch posts
 * authored by that user. The retrieved posts are passed to the `getPosts`
 * function for rendering. If an error occurs during the fetching process,
 * it logs the error to the console.
 */

export async function onReadPostsByUser() {
  const user = load("user");
  const userName = user.name;
  try {
    const postsByUser = await readPostsByUser(userName);
    await getPosts(postsByUser);
  } catch (error) {
    console.error("Error reading posts by user: ", error);
  }
}

/**
 * Fetches and displays a single post based on the post ID stored in local storage.
 *
 * This function retrieves the post ID from local storage and checks its validity.
 * If the post ID is invalid or not a number, it logs an error message and exits.
 * Otherwise, it calls the `readPost` function with the valid post ID to fetch the
 * post data. The retrieved post data is then passed to the `getSinglePost` function
 * for rendering. If an error occurs during the fetching process, it logs the error
 * to the console.
 */

export async function onReadSinglePost() {
  const postID = JSON.parse(localStorage.getItem("postID"));

  if (!postID || isNaN(postID)) {
    console.error("Invalid post ID:", postID);
    return;
  }

  try {
    const singlePost = await readPost(postID);
    await getSinglePost(singlePost);
  } catch (error) {
    console.error("Error reading single post: ", error);
  }
}
