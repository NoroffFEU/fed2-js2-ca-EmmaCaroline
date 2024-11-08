import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";
import { load } from "../auth/key";

/**
 * API call function to fetch the profile data of a user by their username.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} The user profile data fetched from the API.
 * @throws {Error} If fetching the profile fails.
 */

export async function readProfile(username) {
  const endpoint = `${API_SOCIAL_PROFILES}/${username}`;
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch profile: " + errorText);
    }

    const userdata = await response.json();
    return userdata.data;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Fetching profile failed: ${error.message}`);
    }
    console.error("Fetching profile failed: ", error);
    throw error;
  }
}

/**
 * Loads and displays the logged-in user's profile data.
 *
 * This function retrieves the user's profile using the username from
 * local storage, then dynamically creates and appends the profile
 * elements to the profile container in the DOM.
 *
 * @returns {Promise<void>} A promise that resolves when the profile data is loaded and displayed.
 * @throws {Error} If the user is not logged in or the profile data cannot be fetched.
 */

export const readProfileData = async () => {
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }
  const username = user.name;
  const profile = await readProfile(username);

  // Select existing elements in the DOM
  const bannerImage = document.getElementById("banner-image");
  const userName = document.getElementById("user-name");
  const avatarImage = document.getElementById("avatar-image");
  const bio = document.getElementById("bio");

  // Update their properties and content
  bannerImage.src = profile.banner?.url || "default-banner.jpg";
  bannerImage.alt = profile.banner?.alt || "Banner Image";

  userName.textContent = username;

  avatarImage.src = profile.avatar?.url || "default-avatar.jpg";
  avatarImage.alt = profile.avatar?.alt || "Avatar Image";

  bio.textContent = profile.bio || "No bio available";
};

//export async function readProfiles(limit, page) {} Unused function for now, will add later
