import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";
import { load } from "../auth/key";

export async function readProfile() {
  const user = load("user");

  if (!user || !user.name) {
    alert("No user is logged in.");
    return;
  }

  const username = user.name;

  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch profile: " + errorText);
    }

    const result = await response.json();
    const profile = result.data || {};
    displayProfile(profile);
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

export async function displayProfile(profile) {
  const profileContainer = document.getElementById("profile-container");

  const bannerImage = document.createElement("img");
  bannerImage.src = profile.banner.url;
  bannerImage.alt = profile.banner.alt;
  bannerImage.className = "banner-image";

  const userName = document.createElement("h2");
  userName.textContent = `${profile.name}`;

  const avatarImage = document.createElement("img");
  avatarImage.src = profile.avatar.url;
  avatarImage.alt = profile.avatar.alt;
  avatarImage.className = "avatar-image";

  const bio = document.createElement("p");
  bio.textContent = profile.bio || "No bio available";

  profileContainer.append(bannerImage, userName, avatarImage, bio);
}

export async function readProfiles(limit, page) {}
