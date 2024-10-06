import { API_SOCIAL_POSTS } from "../constants";
import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function readPost(id) {
  try {
    const endpoint = `${API_SOCIAL_POSTS}/{${id}`;
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch post: " + errorText);
    }

    const postData = await response.json();
    return postData.data;
  } catch (error) {
    console.error("Fetching post failed: ", error);
    throw error;
  }
}

export async function readPosts(limit = 12, page = 1, tag) {
  const endpoint = new URL(API_SOCIAL_POSTS);
  endpoint.searchParams.append("_author", "true");
  endpoint.searchParams.append("limit", limit);
  endpoint.searchParams.append("page", page);

  if (tag) {
    endpoint.searchParams.append("tag", tag);
  }

  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const postsData = await response.json();
    return postsData;
  } catch (error) {
    console.error("Fetching posts failed: ", error);
    throw error;
  }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    const endpoint = `${API_SOCIAL_PROFILES}/{${username}/posts`; //Is this last bit written correct? check
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch users posts: " + errorText);
    }

    const userPostData = await response.json();
    return userPostData.data;
  } catch (error) {
    console.error("Fetching users posts failed: ", error);
    throw error;
  }
}
