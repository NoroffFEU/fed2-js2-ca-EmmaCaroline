import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";
import { load } from "../auth/key";

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

export const readProfileData = async () => {
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }
  const username = user.name;
  const profile = await readProfile(username);

  const profileContainer = document.getElementById("profile-container");

  const bannerImage = document.createElement("img");
  bannerImage.src = profile.banner?.url || "default-banner.jpg";
  bannerImage.alt = profile.banner?.alt || "Banner Image";
  bannerImage.className = "banner-image";

  const userName = document.createElement("h2");
  userName.textContent = username;

  const avatarImage = document.createElement("img");
  avatarImage.src = profile.avatar?.url || "default-avatar.jpg";
  avatarImage.alt = profile.avatar?.alt || "Avatar Image";
  avatarImage.className = "avatar-image";

  const bio = document.createElement("p");
  bio.textContent = profile.bio || "No bio available";

  profileContainer.append(bannerImage, userName, avatarImage, bio);
};

export async function readProfiles(limit, page) {}
