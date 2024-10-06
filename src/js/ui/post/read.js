import { readPosts, readPost, readPostsByUser } from "../../api/post/read";
import { load } from "../../api/auth/key";

async function getPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  const singlePostContainer = document.getElementById("single-post-container");
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

    postData.append(title, imageContainer, username, body, tags);

    if (window.location.pathname === "/") {
      postsContainer.append(postData);
    } else if (window.location.pathname === "/post/") {
      singlePostContainer.append(postData);
    } else if (window.location.pathname === "/profile/") {
      postByUserContainer.append(postData);
    }
  });
}

export async function onReadAllPosts() {
  try {
    const allPosts = await readPosts();

    await getPosts(allPosts.data);
  } catch (error) {
    console.error("Error reading all posts: ", error);
  }
}

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

export async function onReadSinglePost() {} //will add later
