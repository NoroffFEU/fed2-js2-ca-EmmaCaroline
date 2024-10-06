import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";

const editForm = document.forms.editPost;
if (editForm) {
  editForm.addEventListener("submit", onUpdatePost);
} else {
  console.error("Edit form not found on the page.");
}

authGuard();
