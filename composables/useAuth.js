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

  // Helper function to determine if we're running on the client
  const isClient = () => typeof window !== "undefined";

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
      if (isClient()) {
        localStorage.setItem("isLoggedIn", "true");
      }
      isLoggedIn.value = true;

      showMessage("Login successful!", "success");
      window.dispatchEvent(
        new CustomEvent("auth-change", { detail: { isLoggedIn: true } })
      );

      await router.push("/");
    } catch (error) {
      showMessage(
        "Login failed. Please check your credentials and try again.",
        "error"
      );
    }
  };

  const logout = () => {
    if (isClient()) {
      localStorage.removeItem("isLoggedIn");
    }
    isLoggedIn.value = false;

    showMessage("You've been logged out successfully.", "info");
    window.dispatchEvent(
      new CustomEvent("auth-change", { detail: { isLoggedIn: false } })
    );

    router.push("/");
  };

const checkAuthStatus = () => {
  return new Promise((resolve) => {
    if (isClient()) {
      isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
      resolve(isLoggedIn.value);
    } else {
      resolve(false);
    }
  });
};
;

  return { isLoggedIn, login, logout, checkAuthStatus };
}
