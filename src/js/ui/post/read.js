import { readPosts, readPost, readPostsByUser } from "../../api/post/read";
import { load } from "../../api/auth/key";

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

async function getSinglePost(post) {
  const singlePostContainer = document.getElementById("single-post-container");

  const postData = document.createElement("div");
  postData.classList.add("post-data");

  const title = document.createElement("h2");
  title.textContent = post.title;

  const imageContainer = document.createElement("div");
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

  postData.append(title, imageContainer, body, tags);
  singlePostContainer.append(postData);
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
