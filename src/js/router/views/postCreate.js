import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);

setLogoutListener();
