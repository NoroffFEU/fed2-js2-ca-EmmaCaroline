import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/read";
import { updateProfile } from "../../api/profile/update";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }

  const username = user.name;

  const formData = new FormData(event.target);

  const updated = {};

  const avatarURL = formData.get("avatar-url");
  const bannerURL = formData.get("banner-url");
  const bioText = formData.get("bio");

  if (avatarURL) {
    updated.avatar = {
      url: avatarURL,
      alt: formData.get("avatar-alt"),
    };
  }

  if (bannerURL) {
    updated.banner = {
      url: bannerURL,
      alt: formData.get("banner-alt"),
    };
  }

  if (bioText) {
    updated.bio = bioText;
  }

  // Check if the 'updated' object has any keys / something was updated
  if (Object.keys(updated).length > 0) {
    await updateProfile(username, updated);
    alert("Profile is updated");
    window.location.reload();
  } else {
    alert("No changes were made to the profile.");
  }
}

export async function prefillProfileForm() {
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }

  const username = user.name;

  // Fetch the current profile to pre-fill the form
  const profile = await readProfile(username);

  // Pre-fill the bio field if it exists
  const bioInput = document.forms["updateProfile"].elements["bio"];
  if (bioInput && profile.bio) {
    bioInput.value = profile.bio; // Prefill the bio field with current bio
  }
}
