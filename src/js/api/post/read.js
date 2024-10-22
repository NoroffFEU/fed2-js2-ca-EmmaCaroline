import { API_SOCIAL_POSTS } from "../constants";
import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * API call function to fetch a list of posts with optional pagination and tagging.
 *
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @returns {Promise<Object>} The posts data fetched from the API.
 * @throws {Error} If fetching posts fails.
 */

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

/**
 * API call function to fetch a single post by its ID, with an option to include the author's data.
 *
 * @param {number} id - The ID of the post to fetch.
 * @param {boolean} [includeAuthor=true] - Whether to include the author's data in the response.
 * @returns {Promise<Object>} The post data fetched from the API.
 * @throws {Error} If the ID is not a number or if fetching the post fails.
 */

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

/**
 * API call function to fetch a list of posts created by a specific user, with optional pagination and tagging.
 *
 * @param {string} username - The username of the user whose posts to fetch.
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @returns {Promise<Object>} The posts data fetched from the API.
 * @throws {Error} If fetching posts fails.
 */

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
