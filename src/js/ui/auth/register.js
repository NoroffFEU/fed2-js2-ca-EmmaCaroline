import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const form = document.forms.register;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await register(user);
    console.log("Registration ok", response);
    alert("Registration successful");
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
