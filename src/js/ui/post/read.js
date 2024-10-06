import { readPosts, readPost, readPostsByUser } from "../../api/post/read";

async function getPosts(posts) {
  const postsContainer = document.getElementById("posts-container");

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

    postData.append(username, title, imageContainer, body, tags);
    postsContainer.append(postData);
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

export async function onReadSinglePost() {}

export async function onReadPostsByUser() {}
