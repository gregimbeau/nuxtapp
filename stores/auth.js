// stores/auth.js
import { defineStore } from "pinia";
import { useFlashMessage } from "@/composables/useFlashMessage";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    setLoggedIn(value) {
      this.isLoggedIn = value;
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", String(value));
      }
      window.dispatchEvent(
        new CustomEvent("auth-change", { detail: { isLoggedIn: value } })
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
          throw new Error("Login error");
        }

        this.setLoggedIn(true);
        showMessage("Login successful!", "success");
        router.push("/");
      } catch (error) {
        showMessage(
          "Login failed. Please check your credentials and try again.",
          "error"
        );
        this.setLoggedIn(false);
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
        this.setLoggedIn(loggedIn);
      }
    },
  },
});
