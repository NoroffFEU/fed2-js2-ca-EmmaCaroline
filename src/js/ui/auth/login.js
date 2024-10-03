import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();

  const form = document.forms.login;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await login(user);
    console.log("Login ok", response);
    alert(`Login successful. Hello ${response.data.name}`); // The use of alert here is a placeholder until a less intruding, non-blocking notification is made with styling, for a better user experience
    window.location.href = "/";
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Login failed: ${error.message}`);
    }
    console.error("Login failed", error);
    throw error;
  }
}
