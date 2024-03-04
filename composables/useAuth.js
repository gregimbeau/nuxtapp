import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#imports";
import { useFlashMessage } from "@/composables/useFlashMessage";

export function useAuth() {
  const router = useRouter();
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;
  const isLoggedIn = ref(false);
  const { showMessage } = useFlashMessage();

  const login = async (credentials) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login error");
      }

      const data = await response.json();
      localStorage.setItem("isLoggedIn", "true");
      isLoggedIn.value = true;

      // Use showMessage to display a success message
      showMessage("Login successful!", "success");
      window.dispatchEvent(
        new CustomEvent("auth-change", { detail: { isLoggedIn: true } })
      );
      // Redirect after login
      await router.push("/");
    } catch (error) {
      // Display an error message using showMessage
      showMessage(
        "Login failed. Please check your credentials and try again.",
        "error"
      );
    }
  };

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  isLoggedIn.value = false;

  // Corrected: Use showMessage to display a logout message
  showMessage("You've been logged out successfully.", "info");

  // Dispatch an event if needed, to inform other parts of your app about the logout
  window.dispatchEvent(
    new CustomEvent("auth-change", { detail: { isLoggedIn: false } })
  );

  router.push("/");
};


  const checkAuthStatus = () => {
    isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  };

  return { isLoggedIn, login, logout, checkAuthStatus };
}
