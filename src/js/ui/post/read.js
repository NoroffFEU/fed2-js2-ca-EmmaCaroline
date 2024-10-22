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

async function getPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  const postByUserContainer = document.getElementById("own-posts-container");

  // Checks if posts is an array before proceeding
  if (!Array.isArray(posts)) {
    console.error("Expected posts to be an array, but got: ", posts);
    return; // Exit if posts is not an array
  }

  posts.forEach((post) => {
    const postData = document.createElement("div");
    postData.classList.add("post-data");

    const username = document.createElement("p");
    username.textContent = `Posted by: ${post.author.name}`;

    const title = document.createElement("h2");
    title.textContent = post.title;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    if (post.media) {
      const image = document.createElement("img");
      image.src = post.media.url;
      image.alt = post.media.alt;
      imageContainer.appendChild(image);
    }

    const body = document.createElement("p");
    body.innerText = post.body;

    const tags = document.createElement("p");
    tags.innerText = post.tags;

    const seePostBtn = document.createElement("button");
    seePostBtn.innerText = "See Post";

    seePostBtn.addEventListener("click", () => {
      localStorage.setItem("postID", JSON.stringify(post.id));
      window.location.href = "/post/";
    });

    postData.append(title, imageContainer, username, body, tags, seePostBtn);

    if (window.location.pathname === "/") {
      postsContainer.append(postData);
    } else if (window.location.pathname === "/profile/") {
      postByUserContainer.append(postData);
    }
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

  const postData = document.createElement("div");
  postData.classList.add("post-data");

  const username = document.createElement("p");
  if (post.author) {
    username.innerText = `Posted by: ${post.author.name}`;
  }

  const title = document.createElement("h2");
  title.textContent = post.title;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  if (post.media && post.media.url) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt || "No description provided";
    imageContainer.appendChild(image);
  }

  const body = document.createElement("p");
  body.innerText = post.body || "No content available";

  const tags = document.createElement("p");
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    tags.innerText = post.tags.join(", ");
  } else {
    tags.innerText = "No tags";
  }

  postData.append(
    title,
    imageContainer,
    body,
    tags,
    username,
    onEditButton(post, post.author.name)
  );

  singlePostContainer.append(postData);

  localStorage.setItem("postID", JSON.stringify(post.id));
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
    const allPosts = await readPosts();

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
