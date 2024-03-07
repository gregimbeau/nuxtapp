// stores/auth.js
import { defineStore } from "pinia";
import { useFlashMessage } from "@/composables/useFlashMessage";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    userId: null,
  }),
  actions: {
    setLoggedIn(value, userId = null) {
      this.isLoggedIn = value;
      this.userId = userId;

      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", String(value));
        // Update for handling null values effectively
        if (userId) {
          localStorage.setItem("userId", userId);
        } else {
          localStorage.removeItem("userId");
        }
      }
      window.dispatchEvent(
        new CustomEvent("auth-change", {
          detail: { isLoggedIn: value, userId },
        })
      );
    },
    async login(credentials) {
      const router = useRouter();
      const config = useRuntimeConfig();
      const apiUrl = config.public.apiUrl;
      const { showMessage } = useFlashMessage();

      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error("Login failed. Server responded with an error.");
        }

        const data = await response.json();

        this.setLoggedIn(true, data.userId);
        showMessage("Login successful!", "success");
        router.push("/");
      } catch (error) {
        showMessage(
          "Login failed. Please check your credentials and try again.",
          "error"
        );
        this.setLoggedIn(false);
        // Propagez l'erreur pour la gestion des erreurs externe
        throw error;
      }
    },

    logout() {
      const router = useRouter();
      const { showMessage } = useFlashMessage();

      this.setLoggedIn(false);
      showMessage("You've been logged out successfully.", "info");
      router.push("/");
    },
    checkAuthStatus() {
      if (typeof window !== "undefined") {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userId = localStorage.getItem("userId") || null;
        this.setLoggedIn(loggedIn, userId);
      }
    },
  },
});
