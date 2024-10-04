import { authGuard } from "../../utilities/authGuard";
import { readProfile } from "../../api/profile/read";

authGuard();
readProfile();
