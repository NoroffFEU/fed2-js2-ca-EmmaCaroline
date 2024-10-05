import { authGuard } from "../../utilities/authGuard";
import { readProfileData } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

document.getElementById("toggle-button").addEventListener("click", function () {
  const isFormVisible = form.style.display === "block";

  if (isFormVisible) {
    form.style.display = "none";
    this.textContent = "Update Profile";
  } else {
    form.style.display = "block";
    this.textContent = "Cancel Update";
  }
});

authGuard();
readProfileData();
