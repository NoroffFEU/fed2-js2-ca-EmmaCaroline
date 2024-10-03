import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();

  const form = document.forms.login;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await login(user);
    console.log("Login ok", response);
    alert(`Login successful. Hello ${user.name}`);
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Login failed:", error);
  }
}
