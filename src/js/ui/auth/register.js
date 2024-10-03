import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const form = document.forms.register;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await register(user);
    console.log("Registration ok", response);
    alert("Registration successful"); // The use of alert here is a placeholder until a less intruding, non-blocking notification is made with styling, for a better user experience
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
