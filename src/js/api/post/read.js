import { API_SOCIAL_POSTS } from "../constants";
import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

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

export async function readPost(id, includeAuthor = true) {
  const queryParams = new URLSearchParams({
    _author: includeAuthor ? "true" : "false",
  });
  if (isNaN(id)) {
    throw new Error("Invalid post ID: must be a number");
  }

  try {
    const endpoint = `${API_SOCIAL_POSTS}/${id}?${queryParams.toString()}`;
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

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const endpoint = new URL(`${API_SOCIAL_PROFILES}/${username}/posts`);
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
    return postsData.data;
  } catch (error) {
    console.error("Fetching posts failed: ", error);
    throw error;
  }
}
