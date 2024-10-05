import { readPosts, readPost, readPostsByUser } from "../../api/post/read";

export async function onReadAllPosts(event) {
  const postsContainer = document.getElementById("posts-container");

  postsContainer.innerHTML = "";
}

export async function onReadSinglePost(event) {}

export async function onReadPostsByUser(event) {}
